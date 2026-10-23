import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FoldText from './FoldText/FoldText';

const TOTAL_FRAMES = 240;

export default function HeroCanvas({ onScrollProgress }) {
  const { navigate } = useApp();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Helper to format frame path
  const getFrameUrl = (index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/hero-frames/ezgif-frame-${frameNum}.jpg`;
  };

  // Draw frame on canvas with high DPI and object-fit: cover logic
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Aspect ratio math for cover
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Set up high-res canvas sizing
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    let loaded = 0;

    // Load Frame 0 (first frame) immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      loaded++;
      setLoadedCount(loaded);
      updateCanvasSize();
      renderFrame(0);

      // Preload subsequent frames in background
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          images[i] = img;
          loaded++;
          if (loaded % 12 === 0 || loaded === TOTAL_FRAMES) {
            setLoadedCount(loaded);
          }
          if (loaded >= 30) {
            setIsPreloading(false);
          }
        };
        img.onerror = () => {
          // Fallback gracefully
          loaded++;
        };
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [renderFrame, updateCanvasSize]);

  // Handle window resize
  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  // Smooth scroll scrub with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(() => {
          const container = containerRef.current;
          if (!container) {
            ticking = false;
            return;
          }

          const rect = container.getBoundingClientRect();
          const maxScroll = rect.height - window.innerHeight;
          const currentScroll = -rect.top;

          const rawProgress = maxScroll > 0 ? currentScroll / maxScroll : 0;
          const clampedProgress = Math.max(0, Math.min(1, rawProgress));

          setScrollProgress(clampedProgress);
          if (onScrollProgress) {
            onScrollProgress(clampedProgress);
          }

          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(clampedProgress * (TOTAL_FRAMES - 1)))
          );

          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
            renderFrame(targetFrame);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame, onScrollProgress]);

  // Completion Card only appears when the 240-frame scrub completes (88% - 100%)
  const completionCardOpacity =
    scrollProgress >= 0.88
      ? Math.min(1, (scrollProgress - 0.88) / 0.1)
      : 0;

  return (
    <div
      ref={containerRef}
      className="hero-scroll-container"
      style={{
        position: 'relative',
        height: '420vh', // Smooth scroll length for 240 frames
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        {/* Subtle Ambient Light Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at 50% 50%, transparent 60%, rgba(255,255,255,0.4) 100%)',
          }}
        />

        {/* Sleek Apple-style Frame Preload Badge */}
        {isPreloading && (
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#737780',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 30,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#3478F6',
                animation: 'pulseSubtle 1.5s infinite',
              }}
            />
            <span>Loading 4K Frames {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
          </div>
        )}

        {/* Scroll Progress Indicator Pill (Apple Minimal) */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            opacity: scrollProgress > 0.95 ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 120,
              height: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${scrollProgress * 100}%`,
                backgroundColor: '#3478F6',
                borderRadius: 2,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#86868B',
            }}
          >
            Scroll to Scrub Film ({Math.round(scrollProgress * 100)}%)
          </span>
        </div>

        {/* Completion Card: Revealed ONLY when the full scrub completes (scrollProgress >= 0.88) */}
        {scrollProgress >= 0.88 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "24px",
              opacity: completionCardOpacity,
              transform: `translateY(${(1 - completionCardOpacity) * 32}px) scale(${0.96 + completionCardOpacity * 0.04})`,
              transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
              zIndex: 20,
              pointerEvents: completionCardOpacity > 0.4 ? "auto" : "none",
            }}
          >
            
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 5000,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 380,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 12px 36px -4px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              animation: 'slideDownFade 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              style={{
                color: isSuccess ? '#24865A' : isError ? '#EF4444' : '#3478F6',
                marginTop: 2,
                flexShrink: 0,
              }}
            >
              {isSuccess ? (
                <CheckCircle2 size={18} />
              ) : isError ? (
                <AlertCircle size={18} />
              ) : (
                <Info size={18} />
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#17243A', marginBottom: 2 }}>
                {toast.title}
              </div>
              {toast.message && (
                <div style={{ fontSize: '0.8rem', color: '#737780', lineHeight: 1.4 }}>
                  {toast.message}
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: '#86868B',
                padding: 2,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
import HeroCanvas from '../components/HeroCanvas';
import QuickActionCards from '../components/QuickActionCards';
import VehicleTypeSelector from '../components/VehicleTypeSelector';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedParts from '../components/FeaturedParts';
import HowItWorks from '../components/HowItWorks';
import ScrapPickupBanner from '../components/ScrapPickupBanner';
import TrustSustainability from '../components/TrustSustainability';

export default function Home({ onHeroScrollProgress }) {
  return (
    <main>
      {/* Signature 240-Frame Scrub Hero */}
      <HeroCanvas onScrollProgress={onHeroScrollProgress} />

      {/* Section B — Quick Action Pillars */}
      <QuickActionCards />

      {/* Section C — Shop by Vehicle Type */}
      <VehicleTypeSelector />

      {/* Section D — Browse by Parts Category */}
      <CategoryGrid />

      {/* Section E — Curated Featured Parts */}
      <FeaturedParts />

      {/* Section F — How It Works (3 Interactive Journeys) */}
      <HowItWorks />

      {/* Section G — Signature Scrap Pickup Spotlight */}
      <ScrapPickupBanner />

      {/* Section H — Trust, Diagnostics & Sustainability */}
      <TrustSustainability />
    </main>
  );
}

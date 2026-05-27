import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactsSection } from "@/components/sections/contacts-section";
import { FormatsSection } from "@/components/sections/formats-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PromotionsSection } from "@/components/sections/promotions-section";
import { RestaurantSection } from "@/components/sections/restaurant-section";
import { RoomsSection } from "@/components/sections/rooms-section";

export default function HomePage() {
  return (
    <>
      {/* Preload LCP assets directly (no /_next/image) for faster hard refresh */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-bg.webp"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-title-composite-v4.webp"
        fetchPriority="high"
      />
      <SiteHeader variant="hero" />
      <FloatingActions />
      <main>
        <HeroSection />
        <FormatsSection />
        <RoomsSection />
        <RestaurantSection />
        <PromotionsSection />
        <ContactsSection />
      </main>
    </>
  );
}

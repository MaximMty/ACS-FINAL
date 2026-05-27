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

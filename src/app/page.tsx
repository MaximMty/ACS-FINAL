import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteHeader } from "@/components/layout/site-header";
import { BookingSection } from "@/components/sections/booking-section";
import { ContactsSection } from "@/components/sections/contacts-section";
import { FormatsSection } from "@/components/sections/formats-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PromotionsSection } from "@/components/sections/promotions-section";
import { RestaurantSection } from "@/components/sections/restaurant-section";
import { RoomsSection } from "@/components/sections/rooms-section";
import { ROOM_CARDS } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="hero" />
      <FloatingActions />
      <main>
        <HeroSection />
        <FormatsSection />
        <RoomsSection />
        <BookingSection
          rooms={ROOM_CARDS.map((room) => ({ id: room.id, name: room.name }))}
        />
        <RestaurantSection />
        <PromotionsSection />
        <ContactsSection />
      </main>
    </>
  );
}

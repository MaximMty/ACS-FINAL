import { Container } from "@/components/avulus/container";
import { FigmaImage } from "@/components/ui/figma-image";
import { FeatureBar } from "@/components/sections/feature-bar";
import { HeroHeadline } from "@/components/sections/hero-headline";
import { assets } from "@/lib/assets";

export function HeroSection() {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden"
      style={
        {
          "--feature-height": "clamp(72px, 6.74vw, 97px)",
          minHeight: "max(520px, min(100svh, calc(100vw * 756 / 1440)))",
        } as React.CSSProperties
      }
    >
      <FigmaImage
        src={assets.heroBg}
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />

      <Container className="relative z-10 flex flex-1 flex-col pt-[clamp(72px,7.15vw,103px)] pb-[var(--feature-height)]">
        <h1 className="sr-only">AVULUS 24/7 CYBER ОТЕЛЬ и ресторан</h1>

        <div className="flex flex-1 items-center justify-center">
          <HeroHeadline />
        </div>
      </Container>

      <FeatureBar className="absolute inset-x-0 bottom-0 z-20" />
    </section>
  );
}

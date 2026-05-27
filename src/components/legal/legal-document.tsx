import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Container } from "@/components/avulus/container";
import { cn } from "@/lib/utils";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocumentProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
  updatedAt?: string;
  className?: string;
};

export function LegalDocument({
  title,
  intro,
  sections,
  updatedAt,
  className,
}: LegalDocumentProps) {
  return (
    <Container className={cn("py-10 sm:py-14", className)}>
      <Link
        href="/#contacts"
        className="mb-8 inline-flex items-center gap-2 text-sm uppercase text-white/70 transition-colors hover:text-white"
      >
        <ChevronLeft className="size-4" />
        На главную
      </Link>

      <header className="max-w-3xl">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {updatedAt && (
          <p className="mt-3 text-sm text-white/50">Обновлено: {updatedAt}</p>
        )}
        <p className="mt-6 text-sm leading-relaxed text-white/80 sm:text-base">
          {intro}
        </p>
      </header>

      <div className="mt-12 max-w-3xl space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/75 sm:text-base">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}

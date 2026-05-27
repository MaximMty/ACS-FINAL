import Image, { type ImageProps } from "next/image";

/**
 * Assets exported from Figma are already WebP at target dimensions.
 * Skipping the Next optimizer avoids slow hard refreshes (no /_next/image round-trip).
 */
export function FigmaImage(props: ImageProps) {
  return <Image {...props} unoptimized />;
}

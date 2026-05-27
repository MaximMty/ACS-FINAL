import Image, { type ImageProps } from "next/image";

type FigmaImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/** Static images from /public with cache-busting query params */
export function FigmaImage({ src, alt = "", unoptimized = false, ...props }: FigmaImageProps) {
  return <Image src={src} alt={alt} unoptimized={unoptimized} {...props} />;
}

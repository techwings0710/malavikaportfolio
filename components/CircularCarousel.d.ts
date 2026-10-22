import type { CSSProperties, ComponentType } from 'react';
export type CarouselItem = { src: string; alt?: string; title?: string; subtitle?: string; fit?: "cover" | "contain"; background?: string };
export interface CircularCarouselProps {
  items: CarouselItem[];
  preset?: 'cylinder' | 'orbit' | 'wheel' | 'panorama';
  intro?: 'assemble' | 'rise' | 'spin' | 'none';
  cardWidth?: number;
  aspectRatio?: number;
  gap?: number;
  speed?: number;
  autoplay?: 'drift' | 'step' | 'off';
  captions?: boolean;
  fadeColor?: string;
  depthFade?: number;
  cornerRadius?: number;
  navigationRequest?: { index: number };
  onChange?: (index: number) => void;
  onItemClick?: (item: CarouselItem, index: number) => void;
  className?: string;
  style?: CSSProperties;
}
declare const CircularCarousel: ComponentType<CircularCarouselProps>;
export default CircularCarousel;

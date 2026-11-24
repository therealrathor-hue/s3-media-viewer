import type { MediaCategory, BrowserRisk, MediaMeta, DetectionResult } from './registry';
import type { ImageResolveResult } from './decoders/image-decoder';
import type {
  MediaLoadedEventDetail,
  MediaFallbackEventDetail,
  ModalChangeEventDetail
} from './component';

export type {
  MediaCategory,
  BrowserRisk,
  MediaMeta,
  DetectionResult,
  ImageResolveResult,
  MediaLoadedEventDetail,
  MediaFallbackEventDetail,
  ModalChangeEventDetail
};

export interface S3MediaViewerAttributes {
  src?: string;
  type?: MediaCategory;
  poster?: string;
  autoplay?: boolean | string;
  controls?: boolean | string;
  muted?: boolean | string;
  loop?: boolean | string;
  fit?: 'contain' | 'cover' | 'scale-down';
  'max-height'?: string;
  maxHeight?: string;
  'aspect-ratio'?: string;
  aspectRatio?: string;
  fill?: boolean | string;
  filename?: string;
  modal?: boolean | string;
  'click-to-modal'?: boolean | string;
  clickToModal?: boolean | string;
  theme?: 'auto' | 'minimal' | 'light' | 'dark';
  downloadable?: boolean | string;
  copyable?: boolean | string;
  loading?: 'lazy' | 'eager';
  retries?: number | string;
  crossorigin?: 'anonymous' | 'use-credentials' | '';
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  'no-portal'?: boolean | string;
  class?: string;
  className?: string;
  style?: any;
  ref?: any;
  key?: any;
  id?: string;
  role?: string;
  slot?: string;
  tabIndex?: number;
  part?: string;
  [key: string]: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      's3-media-viewer': S3MediaViewerAttributes;
    }
  }
}

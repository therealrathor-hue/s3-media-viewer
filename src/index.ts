import { registerS3MediaViewer } from './component';

export * from './types';
export * from './registry';
export * from './decoders/image-decoder';
export * from './component';

// Auto-register default custom element in browser environment
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  registerS3MediaViewer('s3-media-viewer');
}

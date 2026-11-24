export type MediaCategory = 'image' | 'audio' | 'video' | 'document' | 'unknown';
export type BrowserRisk = 'safe' | 'heic' | 'tiff' | 'container-dependent' | 'legacy';

export interface MediaMeta {
  category: MediaCategory;
  mimeType: string;
  browserRisk: BrowserRisk;
}

export const MEDIA_REGISTRY: Record<string, MediaMeta> = {
  // Images - safe
  jpg: { category: 'image', mimeType: 'image/jpeg', browserRisk: 'safe' },
  jpeg: { category: 'image', mimeType: 'image/jpeg', browserRisk: 'safe' },
  jpe: { category: 'image', mimeType: 'image/jpeg', browserRisk: 'safe' },
  jfif: { category: 'image', mimeType: 'image/jpeg', browserRisk: 'safe' },
  png: { category: 'image', mimeType: 'image/png', browserRisk: 'safe' },
  webp: { category: 'image', mimeType: 'image/webp', browserRisk: 'safe' },
  gif: { category: 'image', mimeType: 'image/gif', browserRisk: 'safe' },
  avif: { category: 'image', mimeType: 'image/avif', browserRisk: 'safe' },
  svg: { category: 'image', mimeType: 'image/svg+xml', browserRisk: 'safe' },
  apng: { category: 'image', mimeType: 'image/apng', browserRisk: 'safe' },
  bmp: { category: 'image', mimeType: 'image/bmp', browserRisk: 'safe' },
  ico: { category: 'image', mimeType: 'image/x-icon', browserRisk: 'safe' },
  cur: { category: 'image', mimeType: 'image/x-icon', browserRisk: 'safe' },

  // Images - heic
  heic: { category: 'image', mimeType: 'image/heic', browserRisk: 'heic' },
  heif: { category: 'image', mimeType: 'image/heif', browserRisk: 'heic' },

  // Images - tiff
  tif: { category: 'image', mimeType: 'image/tiff', browserRisk: 'tiff' },
  tiff: { category: 'image', mimeType: 'image/tiff', browserRisk: 'tiff' },

  // Audio - safe
  mp3: { category: 'audio', mimeType: 'audio/mpeg', browserRisk: 'safe' },
  wav: { category: 'audio', mimeType: 'audio/wav', browserRisk: 'safe' },
  m4a: { category: 'audio', mimeType: 'audio/mp4', browserRisk: 'safe' },
  flac: { category: 'audio', mimeType: 'audio/flac', browserRisk: 'safe' },

  // Audio - container-dependent
  aac: { category: 'audio', mimeType: 'audio/aac', browserRisk: 'container-dependent' },
  ogg: { category: 'audio', mimeType: 'audio/ogg', browserRisk: 'container-dependent' },
  oga: { category: 'audio', mimeType: 'audio/ogg', browserRisk: 'container-dependent' },
  opus: { category: 'audio', mimeType: 'audio/opus', browserRisk: 'container-dependent' },
  weba: { category: 'audio', mimeType: 'audio/webm', browserRisk: 'container-dependent' },
  aiff: { category: 'audio', mimeType: 'audio/aiff', browserRisk: 'container-dependent' },
  aif: { category: 'audio', mimeType: 'audio/aiff', browserRisk: 'container-dependent' },

  // Audio - legacy
  wma: { category: 'audio', mimeType: 'audio/x-ms-wma', browserRisk: 'legacy' },
  amr: { category: 'audio', mimeType: 'audio/amr', browserRisk: 'legacy' },
  mid: { category: 'audio', mimeType: 'audio/midi', browserRisk: 'legacy' },
  midi: { category: 'audio', mimeType: 'audio/midi', browserRisk: 'legacy' },

  // Video - safe
  mp4: { category: 'video', mimeType: 'video/mp4', browserRisk: 'safe' },
  m4v: { category: 'video', mimeType: 'video/x-m4v', browserRisk: 'safe' },
  webm: { category: 'video', mimeType: 'video/webm', browserRisk: 'safe' },

  // Video - container-dependent
  mov: { category: 'video', mimeType: 'video/quicktime', browserRisk: 'container-dependent' },
  ogv: { category: 'video', mimeType: 'video/ogg', browserRisk: 'container-dependent' },
  '3gp': { category: 'video', mimeType: 'video/3gpp', browserRisk: 'container-dependent' },
  '3g2': { category: 'video', mimeType: 'video/3gpp2', browserRisk: 'container-dependent' },
  mkv: { category: 'video', mimeType: 'video/x-matroska', browserRisk: 'container-dependent' },

  // Video - legacy
  avi: { category: 'video', mimeType: 'video/x-msvideo', browserRisk: 'legacy' },
  mpeg: { category: 'video', mimeType: 'video/mpeg', browserRisk: 'legacy' },
  mpg: { category: 'video', mimeType: 'video/mpeg', browserRisk: 'legacy' },
  wmv: { category: 'video', mimeType: 'video/x-ms-wmv', browserRisk: 'legacy' },
  flv: { category: 'video', mimeType: 'video/x-flv', browserRisk: 'legacy' },
  ts: { category: 'video', mimeType: 'video/mp2t', browserRisk: 'legacy' },
  m2ts: { category: 'video', mimeType: 'video/mp2t', browserRisk: 'legacy' },
  vob: { category: 'video', mimeType: 'video/dvd', browserRisk: 'legacy' },
  asf: { category: 'video', mimeType: 'video/x-ms-asf', browserRisk: 'legacy' },

  // Documents
  pdf: { category: 'document', mimeType: 'application/pdf', browserRisk: 'safe' }
};

export const IMAGE_EXTENSIONS: string[] = Object.keys(MEDIA_REGISTRY).filter(
  (ext) => MEDIA_REGISTRY[ext].category === 'image'
);

export const AUDIO_EXTENSIONS: string[] = Object.keys(MEDIA_REGISTRY).filter(
  (ext) => MEDIA_REGISTRY[ext].category === 'audio'
);

export const VIDEO_EXTENSIONS: string[] = Object.keys(MEDIA_REGISTRY).filter(
  (ext) => MEDIA_REGISTRY[ext].category === 'video'
);

export const DOCUMENT_EXTENSIONS: string[] = Object.keys(MEDIA_REGISTRY).filter(
  (ext) => MEDIA_REGISTRY[ext].category === 'document'
);

export const ALL_SUPPORTED_EXTENSIONS: string[] = Object.keys(MEDIA_REGISTRY);

export function isSupportedMediaUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const ext = extractExtension(url);
  return Boolean(ext && ALL_SUPPORTED_EXTENSIONS.includes(ext));
}

export function getMediaCategory(url: string): MediaCategory {
  if (!url || typeof url !== 'string') return 'unknown';
  const ext = extractExtension(url);
  if (!ext) return 'unknown';
  return MEDIA_REGISTRY[ext]?.category || 'unknown';
}

export function extractExtension(signedUrl: string): string {
  if (!signedUrl || typeof signedUrl !== 'string') {
    return '';
  }

  let pathname = '';
  try {
    const parsed = new URL(signedUrl);
    pathname = parsed.pathname;
  } catch {
    pathname = signedUrl.split('?')[0].split('#')[0];
  }

  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // Keep raw pathname
  }

  const lastSegment = pathname.split('/').pop() || '';
  const dotIndex = lastSegment.lastIndexOf('.');
  if (dotIndex === -1 || dotIndex === lastSegment.length - 1) {
    return '';
  }

  return lastSegment.slice(dotIndex + 1).toLowerCase().trim();
}

export interface DetectionResult {
  category: MediaCategory;
  extension: string;
  mimeType: string;
  browserRisk: BrowserRisk;
}

export async function detectMedia(
  signedUrl: string,
  explicitType?: MediaCategory
): Promise<DetectionResult> {
  const extension = extractExtension(signedUrl);

  // 1. Explicit override
  if (explicitType && explicitType !== 'unknown') {
    const knownMeta = extension ? MEDIA_REGISTRY[extension] : undefined;
    return {
      category: explicitType,
      extension,
      mimeType: knownMeta?.mimeType || `${explicitType}/*`,
      browserRisk: knownMeta?.browserRisk || 'safe'
    };
  }

  // 2. Direct registry lookup
  if (extension && MEDIA_REGISTRY[extension]) {
    const meta = MEDIA_REGISTRY[extension];
    return {
      category: meta.category,
      extension,
      mimeType: meta.mimeType,
      browserRisk: meta.browserRisk
    };
  }

  // 3. Fallback to HEAD request if extension missing or unknown
  if (signedUrl && typeof fetch === 'function') {
    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;

      const response = await fetch(signedUrl, {
        method: 'HEAD',
        signal: controller ? controller.signal : undefined
      }).catch(() => null);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (response && response.ok) {
        const contentTypeHeader = (response.headers.get('content-type') || '').toLowerCase();
        const [cleanMime] = contentTypeHeader.split(';').map((s) => s.trim());

        if (cleanMime.startsWith('image/')) {
          return {
            category: 'image',
            extension,
            mimeType: cleanMime,
            browserRisk: cleanMime.includes('heic') || cleanMime.includes('heif') ? 'heic' : 'safe'
          };
        }
        if (cleanMime.startsWith('audio/')) {
          return {
            category: 'audio',
            extension,
            mimeType: cleanMime,
            browserRisk: 'safe'
          };
        }
        if (cleanMime.startsWith('video/')) {
          return {
            category: 'video',
            extension,
            mimeType: cleanMime,
            browserRisk: 'safe'
          };
        }
        if (cleanMime === 'application/pdf') {
          return {
            category: 'document',
            extension: extension || 'pdf',
            mimeType: cleanMime,
            browserRisk: 'safe'
          };
        }
      }
    } catch {
      // CORS or network failure: never throw
    }
  }

  // 4. Default fallback when unresolved
  return {
    category: 'unknown',
    extension,
    mimeType: '',
    browserRisk: 'legacy'
  };
}

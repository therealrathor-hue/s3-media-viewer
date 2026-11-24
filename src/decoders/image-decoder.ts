export function supportsNativeHeic(): boolean {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent;
  // Safari / WebKit on macOS or iOS (excluding Chrome/Edge/Firefox on iOS/macOS where possible)
  const isApple = /Macintosh|Mac OS X|iPhone|iPad|iPod/.test(ua);
  const isSafari =
    /Safari/.test(ua) &&
    !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/.test(ua);

  return isApple && isSafari;
}

export interface ImageResolveResult {
  resolvedUrl: string;
  isBlob: boolean;
  fallbackOriginal: boolean;
}

export async function resolveImageUrl(
  url: string,
  extension: string
): Promise<ImageResolveResult> {
  const ext = (extension || '').toLowerCase().trim();
  const isHeic = ext === 'heic' || ext === 'heif';

  if (!isHeic) {
    return {
      resolvedUrl: url,
      isBlob: false,
      fallbackOriginal: false
    };
  }

  if (supportsNativeHeic()) {
    return {
      resolvedUrl: url,
      isBlob: false,
      fallbackOriginal: false
    };
  }

  // Attempt dynamic conversion via heic2any
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 15000) : null;

    const res = await fetch(url, {
      signal: controller ? controller.signal : undefined
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!res.ok) {
      return {
        resolvedUrl: url,
        isBlob: false,
        fallbackOriginal: true
      };
    }

    const inputBlob = await res.blob();
    // Dynamically import heic2any so the base bundle stays tiny
    const module = await import('heic2any');
    const heic2anyFn = (module.default || module) as (options: {
      blob: Blob;
      toType?: string;
      quality?: number;
    }) => Promise<Blob | Blob[]>;

    const conversionResult = await heic2anyFn({
      blob: inputBlob,
      toType: 'image/jpeg',
      quality: 0.9
    });

    const convertedBlob = Array.isArray(conversionResult)
      ? conversionResult[0]
      : conversionResult;

    if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
      const objectUrl = URL.createObjectURL(convertedBlob);
      return {
        resolvedUrl: objectUrl,
        isBlob: true,
        fallbackOriginal: false
      };
    }

    return {
      resolvedUrl: url,
      isBlob: false,
      fallbackOriginal: true
    };
  } catch {
    // If CORS fails on S3 or heic2any fails, never throw!
    return {
      resolvedUrl: url,
      isBlob: false,
      fallbackOriginal: true
    };
  }
}

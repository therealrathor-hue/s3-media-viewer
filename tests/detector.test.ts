import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  extractExtension,
  detectMedia,
  MEDIA_REGISTRY,
  IMAGE_EXTENSIONS,
  AUDIO_EXTENSIONS,
  VIDEO_EXTENSIONS,
  ALL_SUPPORTED_EXTENSIONS
} from '../src/registry';
import { supportsNativeHeic, resolveImageUrl } from '../src/decoders/image-decoder';

describe('Media Registry & Extension Extraction', () => {
  it('contains expected categories in registry and flat arrays', () => {
    expect(IMAGE_EXTENSIONS).toContain('jpg');
    expect(IMAGE_EXTENSIONS).toContain('heic');
    expect(AUDIO_EXTENSIONS).toContain('mp3');
    expect(AUDIO_EXTENSIONS).toContain('amr');
    expect(VIDEO_EXTENSIONS).toContain('mp4');
    expect(VIDEO_EXTENSIONS).toContain('avi');
    expect(ALL_SUPPORTED_EXTENSIONS).toContain('pdf');
    expect(ALL_SUPPORTED_EXTENSIONS.length).toBeGreaterThan(30);
  });

  describe('extractExtension', () => {
    it('extracts lowercase extension from standard S3 URL', () => {
      const url = 'https://my-bucket.s3.amazonaws.com/uploads/sample.png';
      expect(extractExtension(url)).toBe('png');
    });

    it('extracts and lowercases uppercase extensions from S3 pre-signed URLs', () => {
      const s3Url =
        'https://my-bucket.s3.us-east-1.amazonaws.com/raw/CLIP001.MOV?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAEXAMPLE%2F20261124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261124T120000Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d4e5f6';
      expect(extractExtension(s3Url)).toBe('mov');
    });

    it('handles uppercase HEIC extension correctly', () => {
      const url = 'https://bucket.s3.amazonaws.com/IMG_9999.HEIC?token=123';
      expect(extractExtension(url)).toBe('heic');
    });

    it('handles URL-encoded spaces and special characters in filename', () => {
      const url =
        'https://bucket.s3.amazonaws.com/vacation/My%20Family%20Photo%20(2026).JPEG?X-Amz-Signature=xyz';
      expect(extractExtension(url)).toBe('jpeg');
    });

    it('handles non-standard or malformed URLs without throwing uncaught errors', () => {
      expect(extractExtension('')).toBe('');
      expect(extractExtension(null as any)).toBe('');
      expect(extractExtension(undefined as any)).toBe('');
      expect(extractExtension('just-a-plain-string-no-url.mp3')).toBe('mp3');
      expect(extractExtension('broken://url::invalid')).toBe('');
      expect(extractExtension('https://bucket.s3.amazonaws.com/no-extension-object?query=1')).toBe('');
    });
  });

  describe('detectMedia', () => {
    const originalFetch = globalThis.fetch;

    afterEach(() => {
      globalThis.fetch = originalFetch;
      vi.restoreAllMocks();
    });

    it('detects images from known extensions', async () => {
      const res = await detectMedia('https://s3.amazonaws.com/b/test.jpg');
      expect(res.category).toBe('image');
      expect(res.extension).toBe('jpg');
      expect(res.mimeType).toBe('image/jpeg');
      expect(res.browserRisk).toBe('safe');
    });

    it('identifies browser risk for HEIC and legacy formats', async () => {
      const heicRes = await detectMedia('https://s3.amazonaws.com/b/photo.heic');
      expect(heicRes.category).toBe('image');
      expect(heicRes.browserRisk).toBe('heic');

      const aviRes = await detectMedia('https://s3.amazonaws.com/b/movie.avi');
      expect(aviRes.category).toBe('video');
      expect(aviRes.browserRisk).toBe('legacy');

      const amrRes = await detectMedia('https://s3.amazonaws.com/b/voice.amr');
      expect(amrRes.category).toBe('audio');
      expect(amrRes.browserRisk).toBe('legacy');
    });

    it('respects explicitType override', async () => {
      const res = await detectMedia('https://s3.amazonaws.com/b/unknown-blob', 'video');
      expect(res.category).toBe('video');
      expect(res.browserRisk).toBe('safe');
    });

    it('detects MIME type via HEAD request when extension is missing', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ 'content-type': 'video/mp4; charset=binary' })
      });

      const res = await detectMedia('https://s3.amazonaws.com/b/uuid-without-ext');
      expect(res.category).toBe('video');
      expect(res.mimeType).toBe('video/mp4');
    });

    it('gracefully returns unknown when HEAD request fails due to CORS or network error', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error (CORS failed)'));

      const res = await detectMedia('https://s3.amazonaws.com/b/cors-blocked-uuid');
      expect(res.category).toBe('unknown');
      expect(res.mimeType).toBe('');
      expect(res.browserRisk).toBe('legacy');
    });
  });

  describe('HEIC & Image Decoder', () => {
    it('returns original url for non-heic formats', async () => {
      const res = await resolveImageUrl('https://example.com/pic.png', 'png');
      expect(res.isBlob).toBe(false);
      expect(res.resolvedUrl).toBe('https://example.com/pic.png');
    });

    it('gracefully falls back to original url if HEIC fetch/conversion fails', async () => {
      // Mock fetch failure
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('CORS blocked'));
      const res = await resolveImageUrl('https://example.com/photo.heic', 'heic');
      expect(res.fallbackOriginal).toBe(true);
      expect(res.resolvedUrl).toBe('https://example.com/photo.heic');
    });

    it('supportsNativeHeic safely evaluates without throwing in any environment', () => {
      expect(typeof supportsNativeHeic()).toBe('boolean');
    });
  });
});

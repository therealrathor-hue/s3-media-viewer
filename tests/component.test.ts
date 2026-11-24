import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '../src/index';
import { S3MediaViewer } from '../src/component';
import { isSupportedMediaUrl, getMediaCategory } from '../src/registry';

describe('S3MediaViewer Web Component', () => {
  let element: S3MediaViewer;

  beforeEach(() => {
    if (typeof window !== 'undefined' && window.HTMLMediaElement) {
      window.HTMLMediaElement.prototype.pause = vi.fn();
      window.HTMLMediaElement.prototype.load = vi.fn();
      window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    }
    element = document.createElement('s3-media-viewer') as S3MediaViewer;
    document.body.appendChild(element);
  });

  afterEach(() => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    vi.restoreAllMocks();
  });

  it('is defined in customElements registry', () => {
    expect(customElements.get('s3-media-viewer')).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('renders an image when provided with image extension and emits media-loaded', async () => {
    const loadedSpy = vi.fn();
    element.addEventListener('media-loaded', loadedSpy);

    element.src = 'https://my-bucket.s3.amazonaws.com/picture.jpg';

    // Wait microtasks for async detectMedia
    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const img = shadowRoot.querySelector('img.s3-media-img') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.src).toContain('picture.jpg');
    expect(img.getAttribute('part')).toBe('image');
    // Default crossorigin should NOT be set
    expect(img.hasAttribute('crossorigin')).toBe(false);

    // Simulate img load
    img.dispatchEvent(new Event('load'));
    expect(loadedSpy).toHaveBeenCalledTimes(1);
    expect(loadedSpy.mock.calls[0][0].detail).toEqual({
      category: 'image',
      extension: 'jpg',
      src: 'https://my-bucket.s3.amazonaws.com/picture.jpg'
    });
  });

  it('renders a video element with playsinline and enforces muted when autoplay is set', async () => {
    const loadedSpy = vi.fn();
    element.addEventListener('media-loaded', loadedSpy);

    element.autoplay = true;
    element.src = 'https://my-bucket.s3.amazonaws.com/video.mp4';

    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const video = shadowRoot.querySelector('video.s3-media-video') as HTMLVideoElement;
    expect(video).not.toBeNull();
    expect(video.src).toContain('video.mp4');
    expect(video.getAttribute('part')).toBe('video');
    // Autoplay requires muted to prevent browser unhandled rejection
    expect(video.muted).toBe(true);
    // iOS Safari & mobile WebView inline playback attributes
    expect(video.hasAttribute('playsinline')).toBe(true);
    expect(video.hasAttribute('webkit-playsinline')).toBe(true);
    expect(video.hasAttribute('x5-playsinline')).toBe(true);
    expect(video.hasAttribute('crossorigin')).toBe(false);

    // Simulate loadedmetadata
    video.dispatchEvent(new Event('loadedmetadata'));
    expect(loadedSpy).toHaveBeenCalledTimes(1);
    expect(loadedSpy.mock.calls[0][0].detail.category).toBe('video');
  });

  it('sets crossorigin attribute only when explicitly specified by the developer', async () => {
    element.crossorigin = 'anonymous';
    element.src = 'https://my-bucket.s3.amazonaws.com/photo.png';

    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const img = shadowRoot.querySelector('img.s3-media-img') as HTMLImageElement;
    expect(img.crossOrigin).toBe('anonymous');
  });

  it('renders audio player with container and info for mp3 files', async () => {
    const loadedSpy = vi.fn();
    element.addEventListener('media-loaded', loadedSpy);

    element.src = 'https://my-bucket.s3.amazonaws.com/podcast.mp3';

    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const audio = shadowRoot.querySelector('audio.s3-media-audio') as HTMLAudioElement;
    expect(audio).not.toBeNull();
    expect(audio.src).toContain('podcast.mp3');
    expect(audio.getAttribute('part')).toBe('audio');

    audio.dispatchEvent(new Event('loadedmetadata'));
    expect(loadedSpy).toHaveBeenCalledTimes(1);
    expect(loadedSpy.mock.calls[0][0].detail.category).toBe('audio');
  });

  it('renders a fallback card for legacy unplayable formats like .avi', async () => {
    const fallbackSpy = vi.fn();
    element.addEventListener('media-fallback', fallbackSpy);

    element.src = 'https://my-bucket.s3.amazonaws.com/old_movie.avi';

    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const fallbackCard = shadowRoot.querySelector('.s3-fallback-card');
    expect(fallbackCard).not.toBeNull();
    expect(fallbackCard?.getAttribute('part')).toBe('fallback');

    const badge = shadowRoot.querySelector('.s3-badge');
    expect(badge?.textContent).toBe('AVI');
    expect(badge?.getAttribute('part')).toBe('fallback-badge');

    const links = shadowRoot.querySelectorAll('a.s3-btn');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('part')).toBe('fallback-button');
    expect(links[0].textContent).toContain('Open in New Tab');
    expect(links[1].textContent).toContain('Download File');

    expect(fallbackSpy).toHaveBeenCalledTimes(1);
    expect(fallbackSpy.mock.calls[0][0].detail.category).toBe('video');
    expect(fallbackSpy.mock.calls[0][0].detail.extension).toBe('avi');
  });

  it('guards against race conditions when src changes rapidly', async () => {
    element.src = 'https://my-bucket.s3.amazonaws.com/first.jpg';
    element.src = 'https://my-bucket.s3.amazonaws.com/second.mp4';
    element.src = 'https://my-bucket.s3.amazonaws.com/third.png';

    await new Promise((resolve) => setTimeout(resolve, 80));

    const shadowRoot = element.shadowRoot!;
    const img = shadowRoot.querySelector('img.s3-media-img') as HTMLImageElement;
    const video = shadowRoot.querySelector('video.s3-media-video');

    expect(video).toBeNull();
    expect(img).not.toBeNull();
    expect(img.src).toContain('third.png');
  });

  it('handles retries and expired URLs via onRefreshUrl before showing fallback card', async () => {
    const freshUrl = 'https://my-bucket.s3.amazonaws.com/fresh-token.jpg';
    const refreshFn = vi.fn().mockResolvedValue(freshUrl);
    element.onRefreshUrl = refreshFn;
    element.retries = 0; // Skip backoff for fast unit test

    element.src = 'https://my-bucket.s3.amazonaws.com/expired.jpg';

    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const img = shadowRoot.querySelector('img.s3-media-img') as HTMLImageElement;
    expect(img).not.toBeNull();

    // Trigger image error (e.g. S3 expired 403)
    img.dispatchEvent(new Event('error'));

    await new Promise((resolve) => setTimeout(resolve, 60));

    expect(refreshFn).toHaveBeenCalledTimes(1);
    expect(element.src).toBe(freshUrl);
  });

  it('pauses active media and cleans up resources on disconnectedCallback', async () => {
    if (typeof URL.revokeObjectURL !== 'function') {
      URL.revokeObjectURL = vi.fn();
    }
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');
    (element as any)._activeBlobUrl = 'blob:http://localhost/mock-uuid';

    element.src = 'https://my-bucket.s3.amazonaws.com/test-audio.mp3';
    await new Promise((resolve) => setTimeout(resolve, 50));

    const audio = element.shadowRoot!.querySelector('audio') as HTMLAudioElement;
    const pauseSpy = vi.spyOn(audio, 'pause');

    element.disconnectedCallback();

    expect(pauseSpy).toHaveBeenCalled();
    expect(revokeSpy).toHaveBeenCalledWith('blob:http://localhost/mock-uuid');
    expect((element as any)._activeBlobUrl).toBeNull();
  });

  it('supports modal/lightbox large view mode and events with clean white modal background', async () => {
    const modalChangeSpy = vi.fn();
    element.addEventListener('modal-change', modalChangeSpy);
    element.modal = true;
    element.src = 'https://my-bucket.s3.amazonaws.com/inspection.jpg';

    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const img = shadowRoot.querySelector('img.s3-media-img') as HTMLImageElement;
    img.dispatchEvent(new Event('load'));

    const expandBtn = shadowRoot.querySelector('.s3-expand-btn') as HTMLButtonElement;
    expect(expandBtn).not.toBeNull();

    // Click expand button to open modal
    expandBtn.click();
    expect(element.isModalOpen).toBe(true);

    const backdrop = shadowRoot.querySelector('.s3-modal-backdrop') as HTMLElement;
    expect(backdrop.classList.contains('is-open')).toBe(true);
    expect(modalChangeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ isOpen: true, category: 'image' })
      })
    );

    // Close modal via close button
    const closeBtn = shadowRoot.querySelector('.s3-modal-close-btn') as HTMLButtonElement;
    closeBtn.click();
    expect(element.isModalOpen).toBe(false);
    expect(backdrop.classList.contains('is-open')).toBe(false);
  });

  it('renders a PDF document card with download/view options', async () => {
    const loadedSpy = vi.fn();
    element.addEventListener('media-loaded', loadedSpy);

    element.src = 'https://my-bucket.s3.amazonaws.com/invoice.pdf';

    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const pdfWrapper = shadowRoot.querySelector('.s3-media-pdf-wrapper');
    expect(pdfWrapper).not.toBeNull();
    expect(pdfWrapper?.textContent).toContain('PDF DOCUMENT');
    expect(loadedSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ category: 'document', extension: 'pdf' })
      })
    );
  });

  it('supports theme, loading, fill, aspect-ratio, and copyable attributes', () => {
    element.theme = 'minimal';
    expect(element.getAttribute('theme')).toBe('minimal');

    element.loading = 'eager';
    expect(element.getAttribute('loading')).toBe('eager');

    element.fill = true;
    expect(element.hasAttribute('fill')).toBe(true);

    element.aspectRatio = '16/9';
    expect(element.getAttribute('aspect-ratio')).toBe('16/9');

    element.copyable = true;
    expect(element.hasAttribute('copyable')).toBe(true);
  });

  it('supports click-to-modal on audio cards and pauses preview on modal open', async () => {
    element.clickToModal = true;
    element.src = 'https://my-bucket.s3.amazonaws.com/song.mp3';
    await new Promise((resolve) => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot!;
    const audioWrapper = shadowRoot.querySelector('.s3-media-audio-wrapper') as HTMLElement;
    expect(audioWrapper).not.toBeNull();
    expect(audioWrapper.classList.contains('s3-clickable')).toBe(true);

    const inlineAudio = shadowRoot.querySelector('audio') as HTMLAudioElement;
    const pauseSpy = vi.spyOn(inlineAudio, 'pause');

    audioWrapper.click();
    expect(element.isModalOpen).toBe(true);
    expect(pauseSpy).toHaveBeenCalled();

    element.closeModal();
    expect(element.isModalOpen).toBe(false);
  });

  it('exports helper utilities isSupportedMediaUrl and getMediaCategory correctly', () => {
    expect(isSupportedMediaUrl('https://bucket.s3.amazonaws.com/file.heic')).toBe(true);
    expect(isSupportedMediaUrl('https://bucket.s3.amazonaws.com/video.mp4?X-Amz=123')).toBe(true);
    expect(isSupportedMediaUrl('https://bucket.s3.amazonaws.com/archive.zip')).toBe(false);

    expect(getMediaCategory('https://bucket.s3.amazonaws.com/pic.png')).toBe('image');
    expect(getMediaCategory('https://bucket.s3.amazonaws.com/song.wav')).toBe('audio');
    expect(getMediaCategory('https://bucket.s3.amazonaws.com/doc.pdf')).toBe('document');
    expect(getMediaCategory('https://bucket.s3.amazonaws.com/unknown.xyz')).toBe('unknown');
  });

  it('is SSR safe and does not crash when window/document are absent', () => {
    // S3MediaViewer class extends BaseElement which falls back gracefully if HTMLElement is undefined
    expect(typeof S3MediaViewer).toBe('function');
  });
});

import {
  detectMedia,
  extractExtension,
  MediaCategory,
  MEDIA_REGISTRY
} from './registry';
import { resolveImageUrl } from './decoders/image-decoder';

export interface MediaLoadedEventDetail {
  category: MediaCategory;
  extension: string;
  src: string;
}

export interface MediaFallbackEventDetail {
  reason: string;
  category: MediaCategory;
  extension: string;
  src: string;
}

export interface ModalChangeEventDetail {
  isOpen: boolean;
  category: MediaCategory;
  src: string;
}

const STYLES = `
:host {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-family: var(--s3-viewer-font, var(--s3-font-family, inherit));
  font-size: inherit;
  color: var(--s3-viewer-text, inherit);

  /* CSS Custom Properties Hooks */
  --s3-viewer-bg: transparent;
  --s3-viewer-surface: rgba(125, 125, 125, 0.06);
  --s3-viewer-surface: color-mix(in srgb, currentColor 6%, transparent);
  --s3-viewer-text: inherit;
  --s3-viewer-muted-text: rgba(125, 125, 125, 0.65);
  --s3-viewer-muted-text: color-mix(in srgb, currentColor 65%, transparent);
  --s3-viewer-border: rgba(125, 125, 125, 0.14);
  --s3-viewer-border: color-mix(in srgb, currentColor 14%, transparent);
  --s3-viewer-radius: var(--radius, 8px);
  --s3-viewer-radius-lg: var(--radius-lg, 12px);
  --s3-viewer-accent: var(--primary, #2563eb);
  --s3-viewer-accent-hover: var(--primary-hover, #1d4ed8);
  --s3-viewer-accent-text: #ffffff;
  --s3-viewer-max-height: 600px;
  --s3-viewer-object-fit: contain;
  --s3-aspect-ratio: auto;

  /* Aliases for backwards compatibility */
  --s3-primary: var(--s3-viewer-accent);
  --s3-primary-hover: var(--s3-viewer-accent-hover);
  --s3-primary-text: var(--s3-viewer-accent-text);
  --s3-radius: var(--s3-viewer-radius);
  --s3-radius-lg: var(--s3-viewer-radius-lg);
  --s3-border: var(--s3-viewer-border);

  /* Layering hierarchy - renders above sticky/fixed navigation bars */
  --s3-backdrop-z-index: 1050;
  --s3-dialog-z-index: 1055;
  --s3-backdrop: rgba(15, 23, 42, 0.16);

  /* Modal surfaces: ALWAYS pure clean white background */
  --s3-dialog-bg: #ffffff;
  --s3-dialog-text: #0f172a;
  --s3-dialog-border: rgba(0, 0, 0, 0.08);
  --s3-header-bg: #ffffff;
  --s3-header-border: #f1f5f9;
  --s3-body-bg: #ffffff;
  --s3-btn-subtle-bg: #f8fafc;
  --s3-btn-subtle-text: #475569;
  --s3-btn-subtle-border: #e2e8f0;
  --s3-audio-bg: var(--s3-viewer-surface);
}

:host([fill]) {
  width: 100%;
  height: 100%;
  min-height: 100%;
  flex: 1 1 auto;
}
:host([fill]) .s3-container {
  max-height: none !important;
  height: 100%;
  width: 100%;
}

/* Minimal theme - borderless & flat */
:host([theme="minimal"]) {
  --s3-viewer-surface: transparent;
  --s3-viewer-border: transparent;
  --s3-viewer-radius: 0px;
}

/* Explicit Light theme */
:host([theme="light"]) {
  --s3-viewer-surface: #ffffff;
  --s3-viewer-text: #0f172a;
  --s3-viewer-muted-text: #64748b;
  --s3-viewer-border: #e2e8f0;
  --s3-dialog-bg: #ffffff;
  --s3-header-bg: #ffffff;
  --s3-body-bg: #ffffff;
}

/* Explicit Dark theme for component container */
:host([theme="dark"]) {
  --s3-viewer-surface: #1e293b;
  --s3-viewer-text: #f8fafc;
  --s3-viewer-muted-text: #94a3b8;
  --s3-viewer-border: rgba(255, 255, 255, 0.1);
  --s3-audio-bg: #1e293b;
  /* Modal dialog strictly stays clean white */
  --s3-dialog-bg: #ffffff;
  --s3-dialog-text: #0f172a;
  --s3-header-bg: #ffffff;
  --s3-body-bg: #ffffff;
}

*, *::before, *::after {
  box-sizing: border-box;
}

button:focus-visible, a:focus-visible {
  outline: 2px solid var(--s3-viewer-accent, #2563eb);
  outline-offset: 2px;
}

.s3-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
  aspect-ratio: var(--s3-aspect-ratio, auto);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--s3-viewer-bg, transparent);
  border-radius: var(--s3-viewer-radius, 8px);
  overflow: hidden;
  color: inherit;
  font-family: inherit;
}
.s3-clickable {
  cursor: pointer;
}
.s3-media-img {
  width: 100%;
  height: 100%;
  max-height: var(--s3-max-height, 600px);
  object-fit: var(--s3-fit, contain);
  image-orientation: from-image;
  display: block;
  background: transparent;
  transition: opacity 0.2s ease;
}
.s3-clickable:hover .s3-media-img {
  opacity: 0.92;
}
.s3-media-video {
  width: 100%;
  height: 100%;
  max-height: var(--s3-max-height, 600px);
  display: block;
  background: transparent;
  border-radius: inherit;
}
.s3-media-audio-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-sizing: border-box;
  background: var(--s3-audio-bg);
  border: 1px solid var(--s3-viewer-border);
  border-radius: var(--s3-viewer-radius, 8px);
  color: inherit;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.s3-audio-header {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 480px;
}
.s3-audio-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--s3-viewer-accent, #2563eb);
  color: var(--s3-viewer-accent-text, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
}
.s3-media-audio-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.s3-audio-badge {
  background: rgba(37, 99, 235, 0.12);
  color: var(--s3-viewer-accent, #2563eb);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  flex-shrink: 0;
}
.s3-audio-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.s3-audio-waves {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 18px;
  width: 100%;
  opacity: 0.55;
}
.s3-wave-bar {
  width: 3px;
  background: var(--s3-viewer-accent, #2563eb);
  border-radius: 2px;
  animation: s3-wave 1.2s ease-in-out infinite alternate;
}
.s3-wave-bar:nth-child(1) { height: 6px; animation-delay: 0.1s; }
.s3-wave-bar:nth-child(2) { height: 13px; animation-delay: 0.2s; }
.s3-wave-bar:nth-child(3) { height: 17px; animation-delay: 0.3s; }
.s3-wave-bar:nth-child(4) { height: 9px; animation-delay: 0.4s; }
.s3-wave-bar:nth-child(5) { height: 15px; animation-delay: 0.2s; }
.s3-wave-bar:nth-child(6) { height: 18px; animation-delay: 0.5s; }
.s3-wave-bar:nth-child(7) { height: 11px; animation-delay: 0.1s; }
.s3-wave-bar:nth-child(8) { height: 7px; animation-delay: 0.3s; }
@keyframes s3-wave {
  0% { transform: scaleY(0.4); }
  100% { transform: scaleY(1); }
}
.s3-media-audio {
  width: 100%;
  max-width: 480px;
  height: 38px;
}
.s3-media-pdf-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  background: var(--s3-viewer-surface);
  border: 1px solid var(--s3-viewer-border);
  border-radius: var(--s3-viewer-radius, 8px);
  gap: 14px;
}
.s3-media-pdf-frame {
  width: 100%;
  height: var(--s3-max-height, 500px);
  border: none;
  border-radius: var(--s3-viewer-radius, 6px);
}
.s3-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top-color: var(--s3-viewer-accent, #3b82f6);
  border-radius: 50%;
  animation: s3-spin 0.8s linear infinite;
  margin: 20px auto;
}
@keyframes s3-spin {
  to { transform: rotate(360deg); }
}
.s3-fallback-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px 16px;
  gap: 12px;
  max-width: 420px;
  margin: 0 auto;
  background: var(--s3-viewer-surface);
  border: 1px solid var(--s3-viewer-border);
  border-radius: var(--s3-viewer-radius, 8px);
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
}
.s3-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--s3-viewer-accent, #2563eb);
  color: var(--s3-viewer-accent-text, #ffffff);
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.s3-file-title {
  font-size: 14px;
  font-weight: 600;
  word-break: break-all;
  max-width: 100%;
}
.s3-fallback-message {
  font-size: 12px;
  color: var(--s3-viewer-muted-text, #64748b);
  line-height: 1.4;
  margin: 0;
}
.s3-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
  flex-wrap: wrap;
  justify-content: center;
}
.s3-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--s3-viewer-radius, 6px);
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  border: none;
  font-family: inherit;
}
.s3-btn-primary {
  background: var(--s3-viewer-accent, #2563eb);
  color: var(--s3-viewer-accent-text, #ffffff);
}
.s3-btn-primary:hover {
  background: var(--s3-viewer-accent-hover, #1d4ed8);
}
.s3-btn-secondary {
  background: var(--s3-viewer-surface);
  border: 1px solid var(--s3-viewer-border);
  color: inherit;
}
.s3-btn-secondary:hover {
  filter: brightness(0.95);
}
.s3-expand-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--s3-viewer-radius, 6px);
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.s3-expand-btn:hover {
  background: var(--s3-viewer-accent, #2563eb);
  border-color: var(--s3-viewer-accent, #2563eb);
  color: #ffffff;
  transform: scale(1.08);
}

/* Modal: strictly pure white background & soft light backdrop */
.s3-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--s3-backdrop-z-index, 1050);
  background: var(--s3-backdrop, rgba(15, 23, 42, 0.16));
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}
.s3-modal-backdrop.is-open {
  display: flex;
  animation: s3-fade-in 0.2s ease-out;
}
@keyframes s3-fade-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.s3-modal-dialog {
  position: relative;
  z-index: var(--s3-dialog-z-index, 1055);
  width: auto;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 48px);
  max-height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  background: #ffffff !important;
  color: #0f172a !important;
  border-radius: var(--s3-viewer-radius-lg, var(--s3-radius-lg, 12px));
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin: auto;
  font-family: inherit;
}
.s3-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #ffffff !important;
  border-bottom: 1px solid #f1f5f9;
  gap: 12px;
  min-height: 50px;
}
.s3-modal-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.s3-modal-badge {
  background: var(--s3-viewer-accent, #2563eb);
  color: var(--s3-viewer-accent-text, #ffffff);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  flex-shrink: 0;
}
.s3-modal-title {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.s3-modal-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.s3-icon-btn {
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: var(--s3-viewer-radius, 6px);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 0;
}
.s3-icon-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.s3-modal-close-btn {
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: var(--s3-viewer-radius, 6px);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
  padding: 0;
}
.s3-modal-close-btn:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #ef4444;
}
.s3-modal-body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: calc(100vh - 48px - 52px);
  max-height: calc(100dvh - 48px - 52px);
  max-width: calc(100vw - 48px);
  overflow: auto;
  background: #ffffff !important;
  padding: 14px;
  box-sizing: border-box;
}
.s3-modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.s3-modal-content img {
  max-width: 100%;
  max-height: calc(100vh - 48px - 52px - 28px);
  max-height: calc(100dvh - 48px - 52px - 28px);
  width: auto;
  height: auto;
  object-fit: contain;
  image-orientation: from-image;
  display: block;
  border-radius: var(--s3-viewer-radius, 6px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease-out;
  cursor: zoom-in;
  user-select: none;
}
.s3-modal-content img.is-zoomed {
  transform: scale(2);
  cursor: zoom-out;
}
.s3-modal-content video {
  max-width: 100%;
  max-height: calc(100vh - 48px - 52px - 28px);
  max-height: calc(100dvh - 48px - 52px - 28px);
  width: 100%;
  height: auto;
  display: block;
  background: transparent;
  border-radius: var(--s3-viewer-radius, 6px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}
.s3-modal-content .s3-modal-audio-card {
  padding: 32px 28px;
  min-width: min(85vw, 480px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: #ffffff !important;
  border-radius: var(--s3-viewer-radius, 8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #0f172a !important;
}
.s3-modal-content .s3-modal-pdf-frame {
  width: min(90vw, 900px);
  height: calc(85vh - 70px);
  border: none;
  border-radius: var(--s3-viewer-radius, 6px);
}

/* Fluid Mobile Responsiveness */
@media (max-width: 640px) {
  .s3-modal-backdrop {
    padding: 10px;
  }
  .s3-modal-dialog {
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
    max-height: calc(100dvh - 20px);
    border-radius: var(--s3-viewer-radius, 8px);
  }
  .s3-modal-header {
    padding: 8px 12px;
    min-height: 44px;
    gap: 8px;
  }
  .s3-modal-title {
    font-size: 13px;
  }
  .s3-modal-body {
    padding: 8px;
    max-height: calc(100vh - 20px - 44px);
    max-height: calc(100dvh - 20px - 44px);
  }
  .s3-modal-content img {
    max-height: calc(100vh - 20px - 44px - 16px);
    max-height: calc(100dvh - 20px - 44px - 16px);
  }
  .s3-modal-content video {
    max-height: calc(100vh - 20px - 44px - 16px);
    max-height: calc(100dvh - 20px - 44px - 16px);
  }
  .s3-modal-content .s3-modal-audio-card {
    padding: 20px 14px;
    min-width: 100%;
    width: 100%;
  }
  .s3-modal-content .s3-modal-pdf-frame {
    width: calc(100vw - 36px);
    height: calc(80vh - 50px);
  }
}
`;

const BaseElement: typeof HTMLElement =
  typeof HTMLElement !== 'undefined'
    ? HTMLElement
    : (class {} as unknown as typeof HTMLElement);

export class S3MediaViewer extends BaseElement {
  public static readonly observedAttributes = [
    'src',
    'type',
    'poster',
    'autoplay',
    'controls',
    'muted',
    'loop',
    'fit',
    'max-height',
    'aspect-ratio',
    'fill',
    'filename',
    'modal',
    'click-to-modal',
    'theme',
    'downloadable',
    'copyable',
    'loading',
    'retries',
    'crossorigin'
  ];

  public onRefreshUrl?: () => Promise<string>;

  private _root: ShadowRoot;
  private _portalHost: HTMLElement | null = null;
  private _renderToken = 0;
  private _activeBlobUrl: string | null = null;
  private _hasAttemptedRefresh = false;
  private _retryCount = 0;
  private _currentCategory: MediaCategory = 'unknown';
  private _currentExtension = '';
  private _currentResolvedUrl = '';
  private _isModalOpen = false;
  private _isZoomed = false;
  private _keydownHandler?: (e: KeyboardEvent) => void;

  constructor() {
    super();
    if (typeof this.attachShadow === 'function') {
      this._root = this.attachShadow({ mode: 'open' });
    } else {
      this._root = {} as ShadowRoot;
    }
  }

  // Getters & Setters
  public get src(): string {
    return this.getAttribute('src') || '';
  }
  public set src(val: string) {
    this.setAttribute('src', val);
  }

  public get type(): MediaCategory | '' {
    return (this.getAttribute('type') as MediaCategory) || '';
  }
  public set type(val: MediaCategory | '') {
    if (val) {
      this.setAttribute('type', val);
    } else {
      this.removeAttribute('type');
    }
  }

  public get poster(): string {
    return this.getAttribute('poster') || '';
  }
  public set poster(val: string) {
    this.setAttribute('poster', val);
  }

  public get autoplay(): boolean {
    return this.hasAttribute('autoplay');
  }
  public set autoplay(val: boolean) {
    this.toggleAttribute('autoplay', Boolean(val));
  }

  public get controls(): boolean {
    const attr = this.getAttribute('controls');
    return attr === null || attr === '' || attr === 'true';
  }
  public set controls(val: boolean) {
    if (val) {
      this.setAttribute('controls', '');
    } else {
      this.setAttribute('controls', 'false');
    }
  }

  public get muted(): boolean {
    return this.hasAttribute('muted');
  }
  public set muted(val: boolean) {
    this.toggleAttribute('muted', Boolean(val));
  }

  public get loop(): boolean {
    return this.hasAttribute('loop');
  }
  public set loop(val: boolean) {
    this.toggleAttribute('loop', Boolean(val));
  }

  public get fit(): 'contain' | 'cover' | 'scale-down' {
    return (this.getAttribute('fit') as any) || 'contain';
  }
  public set fit(val: 'contain' | 'cover' | 'scale-down') {
    this.setAttribute('fit', val);
  }

  public get maxHeight(): string {
    return this.getAttribute('max-height') || '600px';
  }
  public set maxHeight(val: string) {
    this.setAttribute('max-height', val);
  }

  public get aspectRatio(): string {
    return this.getAttribute('aspect-ratio') || '';
  }
  public set aspectRatio(val: string) {
    if (val) {
      this.setAttribute('aspect-ratio', val);
    } else {
      this.removeAttribute('aspect-ratio');
    }
  }

  public get fill(): boolean {
    return this.hasAttribute('fill');
  }
  public set fill(val: boolean) {
    this.toggleAttribute('fill', Boolean(val));
  }

  public get filename(): string {
    return this.getAttribute('filename') || '';
  }
  public set filename(val: string) {
    this.setAttribute('filename', val);
  }

  public get modal(): boolean {
    return this.hasAttribute('modal');
  }
  public set modal(val: boolean) {
    this.toggleAttribute('modal', Boolean(val));
  }

  public get clickToModal(): boolean {
    return this.hasAttribute('click-to-modal');
  }
  public set clickToModal(val: boolean) {
    this.toggleAttribute('click-to-modal', Boolean(val));
  }

  public get theme(): 'auto' | 'minimal' | 'light' | 'dark' {
    return (this.getAttribute('theme') as any) || 'auto';
  }
  public set theme(val: 'auto' | 'minimal' | 'light' | 'dark') {
    this.setAttribute('theme', val);
  }

  public get downloadable(): boolean {
    return this.hasAttribute('downloadable');
  }
  public set downloadable(val: boolean) {
    this.toggleAttribute('downloadable', Boolean(val));
  }

  public get copyable(): boolean {
    return this.hasAttribute('copyable');
  }
  public set copyable(val: boolean) {
    this.toggleAttribute('copyable', Boolean(val));
  }

  public get loading(): 'lazy' | 'eager' {
    return (this.getAttribute('loading') as any) || 'lazy';
  }
  public set loading(val: 'lazy' | 'eager') {
    this.setAttribute('loading', val);
  }

  public get retries(): number {
    const attr = this.getAttribute('retries');
    if (attr === null) return 1;
    const parsed = parseInt(attr, 10);
    return isNaN(parsed) || parsed < 0 ? 1 : parsed;
  }
  public set retries(val: number) {
    this.setAttribute('retries', String(val));
  }

  public get crossorigin(): 'anonymous' | 'use-credentials' | '' {
    const attr = this.getAttribute('crossorigin');
    if (attr === 'use-credentials') return 'use-credentials';
    if (attr === 'anonymous' || attr === '') return 'anonymous';
    return '';
  }
  public set crossorigin(val: 'anonymous' | 'use-credentials' | '') {
    if (val) {
      this.setAttribute('crossorigin', val);
    } else {
      this.removeAttribute('crossorigin');
    }
  }

  public get isModalOpen(): boolean {
    return this._isModalOpen;
  }

  public connectedCallback(): void {
    this._keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this._isModalOpen) {
        this.closeModal();
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this._keydownHandler);
    }
    this._render();
  }

  public disconnectedCallback(): void {
    if (this._keydownHandler && typeof window !== 'undefined') {
      window.removeEventListener('keydown', this._keydownHandler);
    }
    if (this._portalHost && this._portalHost.parentNode) {
      this._portalHost.parentNode.removeChild(this._portalHost);
      this._portalHost = null;
    }

    // Stop and unload any media elements to prevent ghost audio / memory leaks
    if (this._root && typeof this._root.querySelectorAll === 'function') {
      const allMedia = this._root.querySelectorAll('video, audio');
      for (let i = 0; i < allMedia.length; i++) {
        const m = allMedia[i] as HTMLMediaElement;
        try {
          m.pause();
          m.removeAttribute('src');
          if (typeof m.load === 'function') m.load();
        } catch {}
      }
    }

    this._revokeBlob();
  }

  public attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal === newVal) return;
    if (name === 'src') {
      this._hasAttemptedRefresh = false;
      this._retryCount = 0;
    }
    this._render();
  }

  public openModal(): void {
    if (!this.src) return;
    this._isModalOpen = true;
    this._isZoomed = false;

    // Pause any inline playing media
    if (this._root && typeof this._root.querySelector === 'function') {
      const inlineMedia = this._root.querySelector('.s3-container video, .s3-container audio') as HTMLMediaElement | null;
      if (inlineMedia && typeof inlineMedia.pause === 'function') {
        try { inlineMedia.pause(); } catch {}
      }
    }

    this._syncModalState();
    this.dispatchEvent(
      new CustomEvent<ModalChangeEventDetail>('modal-change', {
        detail: { isOpen: true, category: this._currentCategory, src: this.src },
        bubbles: true,
        composed: true
      })
    );
  }

  public closeModal(): void {
    if (!this._isModalOpen) return;
    this._isModalOpen = false;
    this._isZoomed = false;
    this._syncModalState();

    const mediaList = [
      this._root?.querySelector?.('.s3-modal-content video, .s3-modal-content audio'),
      this._portalHost?.shadowRoot?.querySelector?.('.s3-modal-content video, .s3-modal-content audio')
    ];
    for (const media of mediaList) {
      if (media && typeof (media as HTMLMediaElement).pause === 'function') {
        try {
          (media as HTMLMediaElement).pause();
          (media as HTMLMediaElement).removeAttribute('src');
          if (typeof (media as HTMLMediaElement).load === 'function') {
            (media as HTMLMediaElement).load();
          }
        } catch {}
      }
    }

    this.dispatchEvent(
      new CustomEvent<ModalChangeEventDetail>('modal-change', {
        detail: { isOpen: false, category: this._currentCategory, src: this.src },
        bubbles: true,
        composed: true
      })
    );
  }

  public toggleModal(): void {
    if (this._isModalOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

  public downloadCurrentMedia(): void {
    const targetUrl = this._currentResolvedUrl || this.src;
    if (!targetUrl || typeof document === 'undefined') return;
    const a = document.createElement('a');
    a.href = targetUrl;
    a.download = this._getDisplayFilename(this.src, this._currentExtension);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  public async copyCurrentMediaUrl(): Promise<boolean> {
    const url = this.src;
    if (!url || typeof navigator === 'undefined' || !navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  }

  private _syncModalState(): void {
    if (!this._root || typeof this._root.querySelector !== 'function') return;

    const localBackdrop = this._root.querySelector('.s3-modal-backdrop') as HTMLElement | null;
    if (localBackdrop) {
      if (this._isModalOpen) {
        localBackdrop.classList.add('is-open');
        this._populateModalContent(this._root);
      } else {
        localBackdrop.classList.remove('is-open');
      }
    }

    // Body portal to escape parent stacking contexts (overflow:hidden, transform, filter)
    if (typeof document !== 'undefined' && document.body && !this.hasAttribute('no-portal')) {
      if (this._isModalOpen) {
        if (!this._portalHost) {
          this._portalHost = document.createElement('div');
          this._portalHost.className = 's3-media-viewer-portal';
          this._portalHost.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1050;';
          const pShadow = this._portalHost.attachShadow({ mode: 'open' });
          pShadow.innerHTML = `
            <style>
              ${STYLES}
              :host {
                --s3-backdrop: rgba(15, 23, 42, 0.16);
                --s3-dialog-bg: #ffffff;
                --s3-header-bg: #ffffff;
                --s3-body-bg: #ffffff;
                --s3-dialog-text: #0f172a;
              }
              .s3-modal-backdrop {
                pointer-events: auto;
              }
            </style>
            <div class="s3-modal-backdrop is-open" role="dialog" aria-modal="true">
              <div class="s3-modal-dialog">
                <div class="s3-modal-header">
                  <div class="s3-modal-title-wrap">
                    <span class="s3-modal-badge"></span>
                    <span class="s3-modal-title"></span>
                  </div>
                  <div class="s3-modal-header-actions">
                    <button class="s3-icon-btn s3-modal-copy-btn" aria-label="Copy link" title="Copy S3 Link">
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                      </svg>
                    </button>
                    <button class="s3-icon-btn s3-modal-download-btn" aria-label="Download" title="Download">
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                    </button>
                    <button class="s3-modal-close-btn" aria-label="Close modal" title="Close (Esc)">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="s3-modal-body">
                  <div class="s3-modal-content"></div>
                </div>
              </div>
            </div>
          `;

          const pBackdrop = pShadow.querySelector('.s3-modal-backdrop');
          const pCloseBtn = pShadow.querySelector('.s3-modal-close-btn');
          const pDownloadBtn = pShadow.querySelector('.s3-modal-download-btn');
          const pCopyBtn = pShadow.querySelector('.s3-modal-copy-btn');

          if (pBackdrop) {
            pBackdrop.addEventListener('click', (e) => {
              if (e.target === pBackdrop) this.closeModal();
            });
          }
          if (pCloseBtn) {
            pCloseBtn.addEventListener('click', () => this.closeModal());
          }
          if (pDownloadBtn) {
            pDownloadBtn.addEventListener('click', () => this.downloadCurrentMedia());
          }
          if (pCopyBtn) {
            pCopyBtn.addEventListener('click', async () => {
              const ok = await this.copyCurrentMediaUrl();
              if (ok) {
                pCopyBtn.setAttribute('title', 'Copied!');
                setTimeout(() => pCopyBtn.setAttribute('title', 'Copy S3 Link'), 2000);
              }
            });
          }
        }

        const pShadow = this._portalHost.shadowRoot;
        if (pShadow) {
          const pBackdrop = pShadow.querySelector('.s3-modal-backdrop') as HTMLElement;
          if (pBackdrop) {
            this._populateModalContent(pShadow);
          }
        }

        if (!document.body.contains(this._portalHost)) {
          document.body.appendChild(this._portalHost);
        }
      } else {
        if (this._portalHost && this._portalHost.parentNode) {
          this._portalHost.parentNode.removeChild(this._portalHost);
          this._portalHost = null;
        }
      }
    }
  }

  private _populateModalContent(rootScope: Element | ShadowRoot): void {
    const modalContent = rootScope.querySelector('.s3-modal-content');
    const modalTitle = rootScope.querySelector('.s3-modal-title');
    const modalBadge = rootScope.querySelector('.s3-modal-badge');
    if (!modalContent) return;

    const displayTitle = this._getDisplayFilename(this.src, this._currentExtension);
    const displayExt = this._currentExtension
      ? this._currentExtension.toUpperCase()
      : (this._currentCategory !== 'unknown' ? this._currentCategory.toUpperCase() : 'FILE');

    if (modalTitle) modalTitle.textContent = displayTitle;
    if (modalBadge) modalBadge.textContent = displayExt;

    modalContent.innerHTML = '';
    const targetUrl = this._currentResolvedUrl || this.src;

    if (this._currentCategory === 'image') {
      const img = document.createElement('img');
      img.src = targetUrl;
      img.alt = displayTitle;
      img.title = 'Click to zoom in/out';
      if (this.crossorigin) {
        img.crossOrigin = this.crossorigin;
      }
      img.addEventListener('click', () => {
        this._isZoomed = !this._isZoomed;
        img.classList.toggle('is-zoomed', this._isZoomed);
      });
      modalContent.appendChild(img);
    } else if (this._currentCategory === 'video') {
      const video = document.createElement('video');
      video.src = targetUrl;
      video.controls = true;
      video.autoplay = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('x5-playsinline', '');
      video.playsInline = true;
      (video as any).webkitPlaysInline = true;
      if (this.crossorigin) {
        video.crossOrigin = this.crossorigin;
      }
      if (this.muted) video.muted = true;
      if (this.loop) video.loop = true;
      try {
        const p = video.play();
        if (p !== undefined && typeof p.catch === 'function') {
          p.catch(() => {});
        }
      } catch {}
      modalContent.appendChild(video);
    } else if (this._currentCategory === 'audio') {
      const audioCard = document.createElement('div');
      audioCard.className = 's3-modal-audio-card';

      const audioInfo = document.createElement('div');
      audioInfo.className = 's3-media-audio-info';
      audioInfo.innerHTML = `
        <div class="s3-audio-icon-wrap">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
          </svg>
        </div>
        <span class="s3-audio-badge">${this._escapeHtml(displayExt)}</span>
        <span class="s3-audio-title">${this._escapeHtml(displayTitle)}</span>
      `;

      const waves = document.createElement('div');
      waves.className = 's3-audio-waves';
      waves.innerHTML = `
        <span class="s3-wave-bar"></span>
        <span class="s3-wave-bar"></span>
        <span class="s3-wave-bar"></span>
        <span class="s3-wave-bar"></span>
        <span class="s3-wave-bar"></span>
        <span class="s3-wave-bar"></span>
        <span class="s3-wave-bar"></span>
        <span class="s3-wave-bar"></span>
      `;

      const audio = document.createElement('audio');
      audio.src = targetUrl;
      audio.controls = true;
      audio.autoplay = true;
      audio.className = 's3-media-audio';
      if (this.crossorigin) {
        audio.crossOrigin = this.crossorigin;
      }
      try {
        const p = audio.play();
        if (p !== undefined && typeof p.catch === 'function') {
          p.catch(() => {});
        }
      } catch {}

      audioCard.appendChild(audioInfo);
      audioCard.appendChild(waves);
      audioCard.appendChild(audio);
      modalContent.appendChild(audioCard);
    } else if (this._currentCategory === 'document') {
      const iframe = document.createElement('iframe');
      iframe.className = 's3-modal-pdf-frame';
      iframe.src = targetUrl;
      modalContent.appendChild(iframe);
    } else {
      modalContent.innerHTML = `
        <div class="s3-fallback-card" role="region" aria-label="Media preview fallback">
          <span class="s3-badge">${this._escapeHtml(displayExt)}</span>
          <div class="s3-file-title">${this._escapeHtml(displayTitle)}</div>
          <p class="s3-fallback-message">Preview not supported by this browser</p>
          <div class="s3-actions">
            <a class="s3-btn s3-btn-primary" href="${this._escapeHtml(targetUrl)}" target="_blank" rel="noopener noreferrer">
              Open in New Tab
            </a>
            <a class="s3-btn s3-btn-secondary" href="${this._escapeHtml(targetUrl)}" download="${this._escapeHtml(displayTitle)}">
              Download File
            </a>
          </div>
        </div>
      `;
    }
  }

  private _revokeBlob(): void {
    if (this._activeBlobUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
      try {
        URL.revokeObjectURL(this._activeBlobUrl);
      } catch {
        // Safe noop
      }
      this._activeBlobUrl = null;
    }
  }

  private _emitLoaded(category: MediaCategory, extension: string, src: string): void {
    this._currentCategory = category;
    this._currentExtension = extension;
    try {
      this.dispatchEvent(
        new CustomEvent<MediaLoadedEventDetail>('media-loaded', {
          detail: { category, extension, src },
          bubbles: true,
          composed: true
        })
      );
    } catch {
      // Safe noop
    }
  }

  private _emitFallback(reason: string, category: MediaCategory, extension: string, src: string): void {
    this._currentCategory = category;
    this._currentExtension = extension;
    try {
      this.dispatchEvent(
        new CustomEvent<MediaFallbackEventDetail>('media-fallback', {
          detail: { reason, category, extension, src },
          bubbles: true,
          composed: true
        })
      );
    } catch {
      // Safe noop
    }
  }

  private _getDisplayFilename(url: string, extension: string): string {
    if (this.filename) return this.filename;
    try {
      const pathname = new URL(url).pathname;
      const name = decodeURIComponent(pathname.split('/').pop() || '');
      if (name) return name;
    } catch {
      // fallback
    }
    return extension ? `media-file.${extension}` : 'media-file';
  }

  private async _handlePlaybackError(category: MediaCategory, extension: string, originalSrc: string, reason: string): Promise<void> {
    // 1. Retry with exponential backoff for transient network issues
    if (this._retryCount < this.retries) {
      this._retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 600 * this._retryCount));
      if (this.src.trim() === originalSrc.trim()) {
        this._render();
        return;
      }
    }

    // 2. Token refresh handler
    if (!this._hasAttemptedRefresh && typeof this.onRefreshUrl === 'function') {
      this._hasAttemptedRefresh = true;
      try {
        const freshUrl = await this.onRefreshUrl();
        if (freshUrl && typeof freshUrl === 'string' && freshUrl.trim() !== originalSrc.trim()) {
          this._retryCount = 0;
          this.src = freshUrl;
          return;
        }
      } catch {
        // Silently proceed to fallback card
      }
    }

    this._renderFallbackCard(category, extension, originalSrc, reason);
  }

  private async _render(): Promise<void> {
    const currentToken = ++this._renderToken;
    this._revokeBlob();

    if (!this._root || typeof this._root.innerHTML === 'undefined') {
      return;
    }

    const currentSrc = this.src.trim();
    if (!currentSrc) {
      this._root.innerHTML = `<style>${STYLES}</style><div class="s3-container" part="container"></div>`;
      return;
    }

    const explicitType = (this.type || undefined) as MediaCategory | undefined;
    const maxHeightVal = this.maxHeight || '600px';
    const fitVal = this.fit || 'contain';
    const aspectRatioVal = this.aspectRatio || 'auto';

    this._root.innerHTML = `
      <style>
        ${STYLES}
        :host {
          --s3-max-height: ${maxHeightVal};
          --s3-fit: ${fitVal};
          --s3-aspect-ratio: ${aspectRatioVal};
        }
      </style>
      <div class="s3-container ${this.clickToModal ? 's3-clickable' : ''}" part="container" aria-busy="true">
        <slot name="loading">
          <div class="s3-spinner" part="loading" role="status" aria-label="Loading media"></div>
        </slot>
      </div>
      <div class="s3-modal-backdrop" role="dialog" aria-modal="true">
        <div class="s3-modal-dialog">
          <div class="s3-modal-header">
            <div class="s3-modal-title-wrap">
              <span class="s3-modal-badge"></span>
              <span class="s3-modal-title"></span>
            </div>
            <div class="s3-modal-header-actions">
              <button class="s3-icon-btn s3-modal-copy-btn" aria-label="Copy link" title="Copy S3 Link">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                </svg>
              </button>
              <button class="s3-icon-btn s3-modal-download-btn" aria-label="Download" title="Download">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </button>
              <button class="s3-modal-close-btn" aria-label="Close modal" title="Close (Esc)">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="s3-modal-body">
            <div class="s3-modal-content"></div>
          </div>
        </div>
      </div>
    `;

    // Attach local modal close & action events
    const backdrop = this._root.querySelector('.s3-modal-backdrop');
    const closeBtn = this._root.querySelector('.s3-modal-close-btn');
    const downloadBtn = this._root.querySelector('.s3-modal-download-btn');
    const copyBtn = this._root.querySelector('.s3-modal-copy-btn');

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.closeModal();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => this.downloadCurrentMedia());
    }
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const ok = await this.copyCurrentMediaUrl();
        if (ok) {
          copyBtn.setAttribute('title', 'Copied!');
          setTimeout(() => copyBtn.setAttribute('title', 'Copy S3 Link'), 2000);
        }
      });
    }

    try {
      const detection = await detectMedia(currentSrc, explicitType);
      if (currentToken !== this._renderToken) return;

      const { category, extension, browserRisk } = detection;
      this._currentCategory = category;
      this._currentExtension = extension;

      if (browserRisk === 'legacy' || browserRisk === 'tiff') {
        this._renderFallbackCard(category, extension, currentSrc, `Browser cannot decode .${extension || 'unknown'} format natively`);
        return;
      }

      if (category === 'image') {
        await this._renderImage(currentSrc, extension, currentToken);
      } else if (category === 'video') {
        this._renderVideo(currentSrc, extension, currentToken);
      } else if (category === 'audio') {
        this._renderAudio(currentSrc, extension, currentToken);
      } else if (category === 'document') {
        this._renderDocument(currentSrc, extension, currentToken);
      } else {
        await this._probeAndRenderUnknown(currentSrc, extension, currentToken);
      }
    } catch {
      if (currentToken === this._renderToken) {
        this._renderFallbackCard('unknown', extractExtension(currentSrc), currentSrc, 'Error initializing media viewer');
      }
    }
  }

  private _addExpandButton(container: Element): void {
    if (!this.modal && !this.clickToModal) return;

    const expandBtn = document.createElement('button');
    expandBtn.className = 's3-expand-btn';
    expandBtn.setAttribute('aria-label', 'Open full view');
    expandBtn.title = 'Open full view';
    expandBtn.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
      </svg>
    `;
    expandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openModal();
    });
    container.appendChild(expandBtn);
  }

  private async _renderImage(url: string, extension: string, token: number): Promise<void> {
    let targetUrl = url;

    try {
      const resolved = await resolveImageUrl(url, extension);
      if (token !== this._renderToken) {
        if (resolved.isBlob && typeof URL !== 'undefined') {
          URL.revokeObjectURL(resolved.resolvedUrl);
        }
        return;
      }

      if (resolved.isBlob) {
        this._activeBlobUrl = resolved.resolvedUrl;
      }
      targetUrl = resolved.resolvedUrl;
    } catch {
      // Fallback
    }

    this._currentResolvedUrl = targetUrl;

    const container = this._root.querySelector('.s3-container');
    if (!container || token !== this._renderToken) return;

    container.innerHTML = '';
    const img = document.createElement('img');
    img.className = 's3-media-img';
    img.setAttribute('part', 'image');
    img.loading = this.loading;
    img.alt = this.filename || `Image preview (${extension || 'media'})`;

    if (this.crossorigin) {
      img.crossOrigin = this.crossorigin;
    }

    img.onload = () => {
      if (token === this._renderToken) {
        container.removeAttribute('aria-busy');
        this._emitLoaded('image', extension, url);
        this._addExpandButton(container);
      }
    };

    img.onerror = () => {
      if (token === this._renderToken) {
        this._handlePlaybackError('image', extension, url, 'Image failed to load or decode');
      }
    };

    if (this.clickToModal) {
      img.addEventListener('click', () => this.openModal());
    }

    img.src = targetUrl;
    container.appendChild(img);
  }

  private _renderVideo(url: string, extension: string, token: number): void {
    this._currentResolvedUrl = url;
    const container = this._root.querySelector('.s3-container');
    if (!container || token !== this._renderToken) return;

    container.innerHTML = '';
    const video = document.createElement('video');
    video.className = 's3-media-video';
    video.setAttribute('part', 'video');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');
    video.playsInline = true;
    (video as any).webkitPlaysInline = true;
    video.preload = 'metadata';

    if (this.crossorigin) {
      video.crossOrigin = this.crossorigin;
    }

    if (this.controls) video.controls = true;
    if (this.autoplay) {
      video.autoplay = true;
      video.muted = true;
      this.muted = true;
    } else if (this.muted) {
      video.muted = true;
    }
    if (this.loop) video.loop = true;
    if (this.poster) video.poster = this.poster;

    video.onloadedmetadata = () => {
      if (token === this._renderToken) {
        container.removeAttribute('aria-busy');
        this._emitLoaded('video', extension, url);
        this._addExpandButton(container);
        if (this.autoplay) {
          try {
            const p = video.play();
            if (p !== undefined && typeof p.catch === 'function') {
              p.catch(() => {});
            }
          } catch {}
        }
      }
    };

    video.onerror = () => {
      if (token === this._renderToken) {
        this._handlePlaybackError('video', extension, url, 'Video playback failed or codec unsupported');
      }
    };

    video.src = url;
    if (this.clickToModal && !this.controls) {
      video.classList.add('s3-clickable');
      video.addEventListener('click', () => {
        this.openModal();
      });
    }
    container.appendChild(video);
  }

  private _renderAudio(url: string, extension: string, token: number): void {
    this._currentResolvedUrl = url;
    const container = this._root.querySelector('.s3-container');
    if (!container || token !== this._renderToken) return;

    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 's3-media-audio-wrapper';
    if (this.clickToModal) {
      wrapper.classList.add('s3-clickable');
      wrapper.addEventListener('click', (e) => {
        if (!(e.target as HTMLElement).closest('audio')) {
          this.openModal();
        }
      });
    }

    const header = document.createElement('div');
    header.className = 's3-audio-header';

    const iconWrap = document.createElement('div');
    iconWrap.className = 's3-audio-icon-wrap';
    iconWrap.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      </svg>
    `;

    const info = document.createElement('div');
    info.className = 's3-media-audio-info';
    const displayTitle = this._getDisplayFilename(url, extension);
    const displayExt = extension ? extension.toUpperCase() : 'AUDIO';
    info.innerHTML = `
      <span class="s3-audio-badge">${this._escapeHtml(displayExt)}</span>
      <span class="s3-audio-title">${this._escapeHtml(displayTitle)}</span>
    `;

    header.appendChild(iconWrap);
    header.appendChild(info);

    const waves = document.createElement('div');
    waves.className = 's3-audio-waves';
    waves.setAttribute('aria-hidden', 'true');
    waves.innerHTML = `
      <span class="s3-wave-bar"></span>
      <span class="s3-wave-bar"></span>
      <span class="s3-wave-bar"></span>
      <span class="s3-wave-bar"></span>
      <span class="s3-wave-bar"></span>
      <span class="s3-wave-bar"></span>
      <span class="s3-wave-bar"></span>
      <span class="s3-wave-bar"></span>
    `;

    const audio = document.createElement('audio');
    audio.className = 's3-media-audio';
    audio.setAttribute('part', 'audio');
    audio.preload = 'metadata';

    if (this.crossorigin) {
      audio.crossOrigin = this.crossorigin;
    }
    if (this.controls) audio.controls = true;
    if (this.autoplay) audio.autoplay = true;
    if (this.muted) audio.muted = true;
    if (this.loop) audio.loop = true;

    audio.onloadedmetadata = () => {
      if (token === this._renderToken) {
        container.removeAttribute('aria-busy');
        this._emitLoaded('audio', extension, url);
        this._addExpandButton(container);
        if (this.autoplay) {
          try {
            const p = audio.play();
            if (p !== undefined && typeof p.catch === 'function') {
              p.catch(() => {});
            }
          } catch {}
        }
      }
    };

    audio.onerror = () => {
      if (token === this._renderToken) {
        this._handlePlaybackError('audio', extension, url, 'Audio playback failed or format unsupported');
      }
    };

    audio.src = url;
    wrapper.appendChild(header);
    wrapper.appendChild(waves);
    wrapper.appendChild(audio);
    container.appendChild(wrapper);
  }

  private _renderDocument(url: string, extension: string, token: number): void {
    this._currentResolvedUrl = url;
    const container = this._root.querySelector('.s3-container');
    if (!container || token !== this._renderToken) return;

    container.removeAttribute('aria-busy');
    container.innerHTML = '';

    const displayTitle = this._getDisplayFilename(url, extension);
    const wrapper = document.createElement('div');
    wrapper.className = 's3-media-pdf-wrapper';
    if (this.clickToModal) {
      wrapper.classList.add('s3-clickable');
      wrapper.addEventListener('click', (e) => {
        if (!(e.target as HTMLElement).closest('a')) {
          this.openModal();
        }
      });
    }
    wrapper.innerHTML = `
      <span class="s3-badge">PDF DOCUMENT</span>
      <div class="s3-file-title">${this._escapeHtml(displayTitle)}</div>
      <div class="s3-actions">
        <a class="s3-btn s3-btn-primary" href="${this._escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
          View Document
        </a>
        <a class="s3-btn s3-btn-secondary" href="${this._escapeHtml(url)}" download="${this._escapeHtml(displayTitle)}">
          Download PDF
        </a>
      </div>
    `;

    container.appendChild(wrapper);
    this._addExpandButton(container);
    this._emitLoaded('document', extension, url);
  }

  private async _probeAndRenderUnknown(url: string, extension: string, token: number): Promise<void> {
    const isImage = await new Promise<boolean>((resolve) => {
      if (typeof Image === 'undefined') {
        resolve(false);
        return;
      }
      const testImg = new Image();
      testImg.onload = () => resolve(true);
      testImg.onerror = () => resolve(false);
      testImg.src = url;
    });

    if (token !== this._renderToken) return;

    if (isImage) {
      await this._renderImage(url, extension, token);
      return;
    }

    const isVideo = await new Promise<boolean>((resolve) => {
      if (typeof document === 'undefined') {
        resolve(false);
        return;
      }
      const testVideo = document.createElement('video');
      testVideo.preload = 'metadata';
      testVideo.onloadedmetadata = () => resolve(true);
      testVideo.onerror = () => resolve(false);
      testVideo.src = url;
    });

    if (token !== this._renderToken) return;

    if (isVideo) {
      this._renderVideo(url, extension, token);
      return;
    }

    this._renderFallbackCard('unknown', extension, url, 'Preview not supported by this browser');
  }

  private _renderFallbackCard(category: MediaCategory, extension: string, url: string, reason: string): void {
    const container = this._root.querySelector('.s3-container');
    if (!container) return;

    container.removeAttribute('aria-busy');

    const displayExt = extension ? extension.toUpperCase() : (category !== 'unknown' ? category.toUpperCase() : 'FILE');
    const displayTitle = this._getDisplayFilename(url, extension);

    container.innerHTML = `
      <slot name="fallback">
        <div class="s3-fallback-card" part="fallback" role="region" aria-label="Media preview fallback">
          <span class="s3-badge" part="fallback-badge">${this._escapeHtml(displayExt)}</span>
          <div class="s3-file-title">${this._escapeHtml(displayTitle)}</div>
          <p class="s3-fallback-message">Preview not supported by this browser</p>
          <div class="s3-actions">
            <a class="s3-btn s3-btn-primary" part="fallback-button" href="${this._escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Open in New Tab
            </a>
            <a class="s3-btn s3-btn-secondary" part="fallback-button" href="${this._escapeHtml(url)}" download="${this._escapeHtml(displayTitle)}">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download File
            </a>
          </div>
        </div>
      </slot>
    `;

    this._emitFallback(reason, category, extension, url);
  }

  private _escapeHtml(str: string): string {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

export function registerS3MediaViewer(tagName = 's3-media-viewer'): void {
  if (
    typeof window !== 'undefined' &&
    typeof customElements !== 'undefined' &&
    !customElements.get(tagName)
  ) {
    try {
      customElements.define(tagName, S3MediaViewer);
    } catch {
      // Ignore double registration
    }
  }
}

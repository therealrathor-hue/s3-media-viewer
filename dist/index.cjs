"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ALL_SUPPORTED_EXTENSIONS: () => ALL_SUPPORTED_EXTENSIONS,
  AUDIO_EXTENSIONS: () => AUDIO_EXTENSIONS,
  DOCUMENT_EXTENSIONS: () => DOCUMENT_EXTENSIONS,
  IMAGE_EXTENSIONS: () => IMAGE_EXTENSIONS,
  MEDIA_REGISTRY: () => MEDIA_REGISTRY,
  S3MediaViewer: () => S3MediaViewer,
  VIDEO_EXTENSIONS: () => VIDEO_EXTENSIONS,
  detectMedia: () => detectMedia,
  extractExtension: () => extractExtension,
  getMediaCategory: () => getMediaCategory,
  isSupportedMediaUrl: () => isSupportedMediaUrl,
  registerS3MediaViewer: () => registerS3MediaViewer,
  resolveImageUrl: () => resolveImageUrl,
  supportsNativeHeic: () => supportsNativeHeic
});
module.exports = __toCommonJS(index_exports);

// src/registry.ts
var MEDIA_REGISTRY = {
  // Images - safe
  jpg: { category: "image", mimeType: "image/jpeg", browserRisk: "safe" },
  jpeg: { category: "image", mimeType: "image/jpeg", browserRisk: "safe" },
  jpe: { category: "image", mimeType: "image/jpeg", browserRisk: "safe" },
  jfif: { category: "image", mimeType: "image/jpeg", browserRisk: "safe" },
  png: { category: "image", mimeType: "image/png", browserRisk: "safe" },
  webp: { category: "image", mimeType: "image/webp", browserRisk: "safe" },
  gif: { category: "image", mimeType: "image/gif", browserRisk: "safe" },
  avif: { category: "image", mimeType: "image/avif", browserRisk: "safe" },
  svg: { category: "image", mimeType: "image/svg+xml", browserRisk: "safe" },
  apng: { category: "image", mimeType: "image/apng", browserRisk: "safe" },
  bmp: { category: "image", mimeType: "image/bmp", browserRisk: "safe" },
  ico: { category: "image", mimeType: "image/x-icon", browserRisk: "safe" },
  cur: { category: "image", mimeType: "image/x-icon", browserRisk: "safe" },
  // Images - heic
  heic: { category: "image", mimeType: "image/heic", browserRisk: "heic" },
  heif: { category: "image", mimeType: "image/heif", browserRisk: "heic" },
  // Images - tiff
  tif: { category: "image", mimeType: "image/tiff", browserRisk: "tiff" },
  tiff: { category: "image", mimeType: "image/tiff", browserRisk: "tiff" },
  // Audio - safe
  mp3: { category: "audio", mimeType: "audio/mpeg", browserRisk: "safe" },
  wav: { category: "audio", mimeType: "audio/wav", browserRisk: "safe" },
  m4a: { category: "audio", mimeType: "audio/mp4", browserRisk: "safe" },
  flac: { category: "audio", mimeType: "audio/flac", browserRisk: "safe" },
  // Audio - container-dependent
  aac: { category: "audio", mimeType: "audio/aac", browserRisk: "container-dependent" },
  ogg: { category: "audio", mimeType: "audio/ogg", browserRisk: "container-dependent" },
  oga: { category: "audio", mimeType: "audio/ogg", browserRisk: "container-dependent" },
  opus: { category: "audio", mimeType: "audio/opus", browserRisk: "container-dependent" },
  weba: { category: "audio", mimeType: "audio/webm", browserRisk: "container-dependent" },
  aiff: { category: "audio", mimeType: "audio/aiff", browserRisk: "container-dependent" },
  aif: { category: "audio", mimeType: "audio/aiff", browserRisk: "container-dependent" },
  // Audio - legacy
  wma: { category: "audio", mimeType: "audio/x-ms-wma", browserRisk: "legacy" },
  amr: { category: "audio", mimeType: "audio/amr", browserRisk: "legacy" },
  mid: { category: "audio", mimeType: "audio/midi", browserRisk: "legacy" },
  midi: { category: "audio", mimeType: "audio/midi", browserRisk: "legacy" },
  // Video - safe
  mp4: { category: "video", mimeType: "video/mp4", browserRisk: "safe" },
  m4v: { category: "video", mimeType: "video/x-m4v", browserRisk: "safe" },
  webm: { category: "video", mimeType: "video/webm", browserRisk: "safe" },
  // Video - container-dependent
  mov: { category: "video", mimeType: "video/quicktime", browserRisk: "container-dependent" },
  ogv: { category: "video", mimeType: "video/ogg", browserRisk: "container-dependent" },
  "3gp": { category: "video", mimeType: "video/3gpp", browserRisk: "container-dependent" },
  "3g2": { category: "video", mimeType: "video/3gpp2", browserRisk: "container-dependent" },
  mkv: { category: "video", mimeType: "video/x-matroska", browserRisk: "container-dependent" },
  // Video - legacy
  avi: { category: "video", mimeType: "video/x-msvideo", browserRisk: "legacy" },
  mpeg: { category: "video", mimeType: "video/mpeg", browserRisk: "legacy" },
  mpg: { category: "video", mimeType: "video/mpeg", browserRisk: "legacy" },
  wmv: { category: "video", mimeType: "video/x-ms-wmv", browserRisk: "legacy" },
  flv: { category: "video", mimeType: "video/x-flv", browserRisk: "legacy" },
  ts: { category: "video", mimeType: "video/mp2t", browserRisk: "legacy" },
  m2ts: { category: "video", mimeType: "video/mp2t", browserRisk: "legacy" },
  vob: { category: "video", mimeType: "video/dvd", browserRisk: "legacy" },
  asf: { category: "video", mimeType: "video/x-ms-asf", browserRisk: "legacy" },
  // Documents
  pdf: { category: "document", mimeType: "application/pdf", browserRisk: "safe" }
};
var IMAGE_EXTENSIONS = Object.keys(MEDIA_REGISTRY).filter(
  (ext) => MEDIA_REGISTRY[ext].category === "image"
);
var AUDIO_EXTENSIONS = Object.keys(MEDIA_REGISTRY).filter(
  (ext) => MEDIA_REGISTRY[ext].category === "audio"
);
var VIDEO_EXTENSIONS = Object.keys(MEDIA_REGISTRY).filter(
  (ext) => MEDIA_REGISTRY[ext].category === "video"
);
var DOCUMENT_EXTENSIONS = Object.keys(MEDIA_REGISTRY).filter(
  (ext) => MEDIA_REGISTRY[ext].category === "document"
);
var ALL_SUPPORTED_EXTENSIONS = Object.keys(MEDIA_REGISTRY);
function isSupportedMediaUrl(url) {
  if (!url || typeof url !== "string") return false;
  const ext = extractExtension(url);
  return Boolean(ext && ALL_SUPPORTED_EXTENSIONS.includes(ext));
}
function getMediaCategory(url) {
  if (!url || typeof url !== "string") return "unknown";
  const ext = extractExtension(url);
  if (!ext) return "unknown";
  return MEDIA_REGISTRY[ext]?.category || "unknown";
}
function extractExtension(signedUrl) {
  if (!signedUrl || typeof signedUrl !== "string") {
    return "";
  }
  let pathname = "";
  try {
    const parsed = new URL(signedUrl);
    pathname = parsed.pathname;
  } catch {
    pathname = signedUrl.split("?")[0].split("#")[0];
  }
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
  }
  const lastSegment = pathname.split("/").pop() || "";
  const dotIndex = lastSegment.lastIndexOf(".");
  if (dotIndex === -1 || dotIndex === lastSegment.length - 1) {
    return "";
  }
  return lastSegment.slice(dotIndex + 1).toLowerCase().trim();
}
async function detectMedia(signedUrl, explicitType) {
  const extension = extractExtension(signedUrl);
  if (explicitType && explicitType !== "unknown") {
    const knownMeta = extension ? MEDIA_REGISTRY[extension] : void 0;
    return {
      category: explicitType,
      extension,
      mimeType: knownMeta?.mimeType || `${explicitType}/*`,
      browserRisk: knownMeta?.browserRisk || "safe"
    };
  }
  if (extension && MEDIA_REGISTRY[extension]) {
    const meta = MEDIA_REGISTRY[extension];
    return {
      category: meta.category,
      extension,
      mimeType: meta.mimeType,
      browserRisk: meta.browserRisk
    };
  }
  if (signedUrl && typeof fetch === "function") {
    try {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 4e3) : null;
      const response = await fetch(signedUrl, {
        method: "HEAD",
        signal: controller ? controller.signal : void 0
      }).catch(() => null);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (response && response.ok) {
        const contentTypeHeader = (response.headers.get("content-type") || "").toLowerCase();
        const [cleanMime] = contentTypeHeader.split(";").map((s) => s.trim());
        if (cleanMime.startsWith("image/")) {
          return {
            category: "image",
            extension,
            mimeType: cleanMime,
            browserRisk: cleanMime.includes("heic") || cleanMime.includes("heif") ? "heic" : "safe"
          };
        }
        if (cleanMime.startsWith("audio/")) {
          return {
            category: "audio",
            extension,
            mimeType: cleanMime,
            browserRisk: "safe"
          };
        }
        if (cleanMime.startsWith("video/")) {
          return {
            category: "video",
            extension,
            mimeType: cleanMime,
            browserRisk: "safe"
          };
        }
        if (cleanMime === "application/pdf") {
          return {
            category: "document",
            extension: extension || "pdf",
            mimeType: cleanMime,
            browserRisk: "safe"
          };
        }
      }
    } catch {
    }
  }
  return {
    category: "unknown",
    extension,
    mimeType: "",
    browserRisk: "legacy"
  };
}

// src/decoders/image-decoder.ts
function supportsNativeHeic() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  const ua = navigator.userAgent;
  const isApple = /Macintosh|Mac OS X|iPhone|iPad|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/.test(ua);
  return isApple && isSafari;
}
async function resolveImageUrl(url, extension) {
  const ext = (extension || "").toLowerCase().trim();
  const isHeic = ext === "heic" || ext === "heif";
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
  try {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 15e3) : null;
    const res = await fetch(url, {
      signal: controller ? controller.signal : void 0
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
    const module2 = await import("heic2any");
    const heic2anyFn = module2.default || module2;
    const conversionResult = await heic2anyFn({
      blob: inputBlob,
      toType: "image/jpeg",
      quality: 0.9
    });
    const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
    if (typeof URL !== "undefined" && typeof URL.createObjectURL === "function") {
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
    return {
      resolvedUrl: url,
      isBlob: false,
      fallbackOriginal: true
    };
  }
}

// src/component.ts
var STYLES = `
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
var BaseElement = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
var S3MediaViewer = class extends BaseElement {
  constructor() {
    super();
    this._portalHost = null;
    this._renderToken = 0;
    this._activeBlobUrl = null;
    this._hasAttemptedRefresh = false;
    this._retryCount = 0;
    this._currentCategory = "unknown";
    this._currentExtension = "";
    this._currentResolvedUrl = "";
    this._isModalOpen = false;
    this._isZoomed = false;
    if (typeof this.attachShadow === "function") {
      this._root = this.attachShadow({ mode: "open" });
    } else {
      this._root = {};
    }
  }
  // Getters & Setters
  get src() {
    return this.getAttribute("src") || "";
  }
  set src(val) {
    this.setAttribute("src", val);
  }
  get type() {
    return this.getAttribute("type") || "";
  }
  set type(val) {
    if (val) {
      this.setAttribute("type", val);
    } else {
      this.removeAttribute("type");
    }
  }
  get poster() {
    return this.getAttribute("poster") || "";
  }
  set poster(val) {
    this.setAttribute("poster", val);
  }
  get autoplay() {
    return this.hasAttribute("autoplay");
  }
  set autoplay(val) {
    this.toggleAttribute("autoplay", Boolean(val));
  }
  get controls() {
    const attr = this.getAttribute("controls");
    return attr === null || attr === "" || attr === "true";
  }
  set controls(val) {
    if (val) {
      this.setAttribute("controls", "");
    } else {
      this.setAttribute("controls", "false");
    }
  }
  get muted() {
    return this.hasAttribute("muted");
  }
  set muted(val) {
    this.toggleAttribute("muted", Boolean(val));
  }
  get loop() {
    return this.hasAttribute("loop");
  }
  set loop(val) {
    this.toggleAttribute("loop", Boolean(val));
  }
  get fit() {
    return this.getAttribute("fit") || "contain";
  }
  set fit(val) {
    this.setAttribute("fit", val);
  }
  get maxHeight() {
    return this.getAttribute("max-height") || "600px";
  }
  set maxHeight(val) {
    this.setAttribute("max-height", val);
  }
  get aspectRatio() {
    return this.getAttribute("aspect-ratio") || "";
  }
  set aspectRatio(val) {
    if (val) {
      this.setAttribute("aspect-ratio", val);
    } else {
      this.removeAttribute("aspect-ratio");
    }
  }
  get fill() {
    return this.hasAttribute("fill");
  }
  set fill(val) {
    this.toggleAttribute("fill", Boolean(val));
  }
  get filename() {
    return this.getAttribute("filename") || "";
  }
  set filename(val) {
    this.setAttribute("filename", val);
  }
  get modal() {
    return this.hasAttribute("modal");
  }
  set modal(val) {
    this.toggleAttribute("modal", Boolean(val));
  }
  get clickToModal() {
    return this.hasAttribute("click-to-modal");
  }
  set clickToModal(val) {
    this.toggleAttribute("click-to-modal", Boolean(val));
  }
  get theme() {
    return this.getAttribute("theme") || "auto";
  }
  set theme(val) {
    this.setAttribute("theme", val);
  }
  get downloadable() {
    return this.hasAttribute("downloadable");
  }
  set downloadable(val) {
    this.toggleAttribute("downloadable", Boolean(val));
  }
  get copyable() {
    return this.hasAttribute("copyable");
  }
  set copyable(val) {
    this.toggleAttribute("copyable", Boolean(val));
  }
  get loading() {
    return this.getAttribute("loading") || "lazy";
  }
  set loading(val) {
    this.setAttribute("loading", val);
  }
  get retries() {
    const attr = this.getAttribute("retries");
    if (attr === null) return 1;
    const parsed = parseInt(attr, 10);
    return isNaN(parsed) || parsed < 0 ? 1 : parsed;
  }
  set retries(val) {
    this.setAttribute("retries", String(val));
  }
  get crossorigin() {
    const attr = this.getAttribute("crossorigin");
    if (attr === "use-credentials") return "use-credentials";
    if (attr === "anonymous" || attr === "") return "anonymous";
    return "";
  }
  set crossorigin(val) {
    if (val) {
      this.setAttribute("crossorigin", val);
    } else {
      this.removeAttribute("crossorigin");
    }
  }
  get isModalOpen() {
    return this._isModalOpen;
  }
  connectedCallback() {
    this._keydownHandler = (e) => {
      if (e.key === "Escape" && this._isModalOpen) {
        this.closeModal();
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this._keydownHandler);
    }
    this._render();
  }
  disconnectedCallback() {
    if (this._keydownHandler && typeof window !== "undefined") {
      window.removeEventListener("keydown", this._keydownHandler);
    }
    if (this._portalHost && this._portalHost.parentNode) {
      this._portalHost.parentNode.removeChild(this._portalHost);
      this._portalHost = null;
    }
    if (this._root && typeof this._root.querySelectorAll === "function") {
      const allMedia = this._root.querySelectorAll("video, audio");
      for (let i = 0; i < allMedia.length; i++) {
        const m = allMedia[i];
        try {
          m.pause();
          m.removeAttribute("src");
          if (typeof m.load === "function") m.load();
        } catch {
        }
      }
    }
    this._revokeBlob();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === "src") {
      this._hasAttemptedRefresh = false;
      this._retryCount = 0;
    }
    this._render();
  }
  openModal() {
    if (!this.src) return;
    this._isModalOpen = true;
    this._isZoomed = false;
    if (this._root && typeof this._root.querySelector === "function") {
      const inlineMedia = this._root.querySelector(".s3-container video, .s3-container audio");
      if (inlineMedia && typeof inlineMedia.pause === "function") {
        try {
          inlineMedia.pause();
        } catch {
        }
      }
    }
    this._syncModalState();
    this.dispatchEvent(
      new CustomEvent("modal-change", {
        detail: { isOpen: true, category: this._currentCategory, src: this.src },
        bubbles: true,
        composed: true
      })
    );
  }
  closeModal() {
    if (!this._isModalOpen) return;
    this._isModalOpen = false;
    this._isZoomed = false;
    this._syncModalState();
    const mediaList = [
      this._root?.querySelector?.(".s3-modal-content video, .s3-modal-content audio"),
      this._portalHost?.shadowRoot?.querySelector?.(".s3-modal-content video, .s3-modal-content audio")
    ];
    for (const media of mediaList) {
      if (media && typeof media.pause === "function") {
        try {
          media.pause();
          media.removeAttribute("src");
          if (typeof media.load === "function") {
            media.load();
          }
        } catch {
        }
      }
    }
    this.dispatchEvent(
      new CustomEvent("modal-change", {
        detail: { isOpen: false, category: this._currentCategory, src: this.src },
        bubbles: true,
        composed: true
      })
    );
  }
  toggleModal() {
    if (this._isModalOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }
  downloadCurrentMedia() {
    const targetUrl = this._currentResolvedUrl || this.src;
    if (!targetUrl || typeof document === "undefined") return;
    const a = document.createElement("a");
    a.href = targetUrl;
    a.download = this._getDisplayFilename(this.src, this._currentExtension);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  async copyCurrentMediaUrl() {
    const url = this.src;
    if (!url || typeof navigator === "undefined" || !navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  }
  _syncModalState() {
    if (!this._root || typeof this._root.querySelector !== "function") return;
    const localBackdrop = this._root.querySelector(".s3-modal-backdrop");
    if (localBackdrop) {
      if (this._isModalOpen) {
        localBackdrop.classList.add("is-open");
        this._populateModalContent(this._root);
      } else {
        localBackdrop.classList.remove("is-open");
      }
    }
    if (typeof document !== "undefined" && document.body && !this.hasAttribute("no-portal")) {
      if (this._isModalOpen) {
        if (!this._portalHost) {
          this._portalHost = document.createElement("div");
          this._portalHost.className = "s3-media-viewer-portal";
          this._portalHost.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1050;";
          const pShadow2 = this._portalHost.attachShadow({ mode: "open" });
          pShadow2.innerHTML = `
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
          const pBackdrop = pShadow2.querySelector(".s3-modal-backdrop");
          const pCloseBtn = pShadow2.querySelector(".s3-modal-close-btn");
          const pDownloadBtn = pShadow2.querySelector(".s3-modal-download-btn");
          const pCopyBtn = pShadow2.querySelector(".s3-modal-copy-btn");
          if (pBackdrop) {
            pBackdrop.addEventListener("click", (e) => {
              if (e.target === pBackdrop) this.closeModal();
            });
          }
          if (pCloseBtn) {
            pCloseBtn.addEventListener("click", () => this.closeModal());
          }
          if (pDownloadBtn) {
            pDownloadBtn.addEventListener("click", () => this.downloadCurrentMedia());
          }
          if (pCopyBtn) {
            pCopyBtn.addEventListener("click", async () => {
              const ok = await this.copyCurrentMediaUrl();
              if (ok) {
                pCopyBtn.setAttribute("title", "Copied!");
                setTimeout(() => pCopyBtn.setAttribute("title", "Copy S3 Link"), 2e3);
              }
            });
          }
        }
        const pShadow = this._portalHost.shadowRoot;
        if (pShadow) {
          const pBackdrop = pShadow.querySelector(".s3-modal-backdrop");
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
  _populateModalContent(rootScope) {
    const modalContent = rootScope.querySelector(".s3-modal-content");
    const modalTitle = rootScope.querySelector(".s3-modal-title");
    const modalBadge = rootScope.querySelector(".s3-modal-badge");
    if (!modalContent) return;
    const displayTitle = this._getDisplayFilename(this.src, this._currentExtension);
    const displayExt = this._currentExtension ? this._currentExtension.toUpperCase() : this._currentCategory !== "unknown" ? this._currentCategory.toUpperCase() : "FILE";
    if (modalTitle) modalTitle.textContent = displayTitle;
    if (modalBadge) modalBadge.textContent = displayExt;
    modalContent.innerHTML = "";
    const targetUrl = this._currentResolvedUrl || this.src;
    if (this._currentCategory === "image") {
      const img = document.createElement("img");
      img.src = targetUrl;
      img.alt = displayTitle;
      img.title = "Click to zoom in/out";
      if (this.crossorigin) {
        img.crossOrigin = this.crossorigin;
      }
      img.addEventListener("click", () => {
        this._isZoomed = !this._isZoomed;
        img.classList.toggle("is-zoomed", this._isZoomed);
      });
      modalContent.appendChild(img);
    } else if (this._currentCategory === "video") {
      const video = document.createElement("video");
      video.src = targetUrl;
      video.controls = true;
      video.autoplay = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("x5-playsinline", "");
      video.playsInline = true;
      video.webkitPlaysInline = true;
      if (this.crossorigin) {
        video.crossOrigin = this.crossorigin;
      }
      if (this.muted) video.muted = true;
      if (this.loop) video.loop = true;
      try {
        const p = video.play();
        if (p !== void 0 && typeof p.catch === "function") {
          p.catch(() => {
          });
        }
      } catch {
      }
      modalContent.appendChild(video);
    } else if (this._currentCategory === "audio") {
      const audioCard = document.createElement("div");
      audioCard.className = "s3-modal-audio-card";
      const audioInfo = document.createElement("div");
      audioInfo.className = "s3-media-audio-info";
      audioInfo.innerHTML = `
        <div class="s3-audio-icon-wrap">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
          </svg>
        </div>
        <span class="s3-audio-badge">${this._escapeHtml(displayExt)}</span>
        <span class="s3-audio-title">${this._escapeHtml(displayTitle)}</span>
      `;
      const waves = document.createElement("div");
      waves.className = "s3-audio-waves";
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
      const audio = document.createElement("audio");
      audio.src = targetUrl;
      audio.controls = true;
      audio.autoplay = true;
      audio.className = "s3-media-audio";
      if (this.crossorigin) {
        audio.crossOrigin = this.crossorigin;
      }
      try {
        const p = audio.play();
        if (p !== void 0 && typeof p.catch === "function") {
          p.catch(() => {
          });
        }
      } catch {
      }
      audioCard.appendChild(audioInfo);
      audioCard.appendChild(waves);
      audioCard.appendChild(audio);
      modalContent.appendChild(audioCard);
    } else if (this._currentCategory === "document") {
      const iframe = document.createElement("iframe");
      iframe.className = "s3-modal-pdf-frame";
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
  _revokeBlob() {
    if (this._activeBlobUrl && typeof URL !== "undefined" && typeof URL.revokeObjectURL === "function") {
      try {
        URL.revokeObjectURL(this._activeBlobUrl);
      } catch {
      }
      this._activeBlobUrl = null;
    }
  }
  _emitLoaded(category, extension, src) {
    this._currentCategory = category;
    this._currentExtension = extension;
    try {
      this.dispatchEvent(
        new CustomEvent("media-loaded", {
          detail: { category, extension, src },
          bubbles: true,
          composed: true
        })
      );
    } catch {
    }
  }
  _emitFallback(reason, category, extension, src) {
    this._currentCategory = category;
    this._currentExtension = extension;
    try {
      this.dispatchEvent(
        new CustomEvent("media-fallback", {
          detail: { reason, category, extension, src },
          bubbles: true,
          composed: true
        })
      );
    } catch {
    }
  }
  _getDisplayFilename(url, extension) {
    if (this.filename) return this.filename;
    try {
      const pathname = new URL(url).pathname;
      const name = decodeURIComponent(pathname.split("/").pop() || "");
      if (name) return name;
    } catch {
    }
    return extension ? `media-file.${extension}` : "media-file";
  }
  async _handlePlaybackError(category, extension, originalSrc, reason) {
    if (this._retryCount < this.retries) {
      this._retryCount++;
      await new Promise((resolve) => setTimeout(resolve, 600 * this._retryCount));
      if (this.src.trim() === originalSrc.trim()) {
        this._render();
        return;
      }
    }
    if (!this._hasAttemptedRefresh && typeof this.onRefreshUrl === "function") {
      this._hasAttemptedRefresh = true;
      try {
        const freshUrl = await this.onRefreshUrl();
        if (freshUrl && typeof freshUrl === "string" && freshUrl.trim() !== originalSrc.trim()) {
          this._retryCount = 0;
          this.src = freshUrl;
          return;
        }
      } catch {
      }
    }
    this._renderFallbackCard(category, extension, originalSrc, reason);
  }
  async _render() {
    const currentToken = ++this._renderToken;
    this._revokeBlob();
    if (!this._root || typeof this._root.innerHTML === "undefined") {
      return;
    }
    const currentSrc = this.src.trim();
    if (!currentSrc) {
      this._root.innerHTML = `<style>${STYLES}</style><div class="s3-container" part="container"></div>`;
      return;
    }
    const explicitType = this.type || void 0;
    const maxHeightVal = this.maxHeight || "600px";
    const fitVal = this.fit || "contain";
    const aspectRatioVal = this.aspectRatio || "auto";
    this._root.innerHTML = `
      <style>
        ${STYLES}
        :host {
          --s3-max-height: ${maxHeightVal};
          --s3-fit: ${fitVal};
          --s3-aspect-ratio: ${aspectRatioVal};
        }
      </style>
      <div class="s3-container ${this.clickToModal ? "s3-clickable" : ""}" part="container" aria-busy="true">
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
    const backdrop = this._root.querySelector(".s3-modal-backdrop");
    const closeBtn = this._root.querySelector(".s3-modal-close-btn");
    const downloadBtn = this._root.querySelector(".s3-modal-download-btn");
    const copyBtn = this._root.querySelector(".s3-modal-copy-btn");
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.closeModal();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeModal());
    }
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => this.downloadCurrentMedia());
    }
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const ok = await this.copyCurrentMediaUrl();
        if (ok) {
          copyBtn.setAttribute("title", "Copied!");
          setTimeout(() => copyBtn.setAttribute("title", "Copy S3 Link"), 2e3);
        }
      });
    }
    try {
      const detection = await detectMedia(currentSrc, explicitType);
      if (currentToken !== this._renderToken) return;
      const { category, extension, browserRisk } = detection;
      this._currentCategory = category;
      this._currentExtension = extension;
      if (browserRisk === "legacy" || browserRisk === "tiff") {
        this._renderFallbackCard(category, extension, currentSrc, `Browser cannot decode .${extension || "unknown"} format natively`);
        return;
      }
      if (category === "image") {
        await this._renderImage(currentSrc, extension, currentToken);
      } else if (category === "video") {
        this._renderVideo(currentSrc, extension, currentToken);
      } else if (category === "audio") {
        this._renderAudio(currentSrc, extension, currentToken);
      } else if (category === "document") {
        this._renderDocument(currentSrc, extension, currentToken);
      } else {
        await this._probeAndRenderUnknown(currentSrc, extension, currentToken);
      }
    } catch {
      if (currentToken === this._renderToken) {
        this._renderFallbackCard("unknown", extractExtension(currentSrc), currentSrc, "Error initializing media viewer");
      }
    }
  }
  _addExpandButton(container) {
    if (!this.modal && !this.clickToModal) return;
    const expandBtn = document.createElement("button");
    expandBtn.className = "s3-expand-btn";
    expandBtn.setAttribute("aria-label", "Open full view");
    expandBtn.title = "Open full view";
    expandBtn.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
      </svg>
    `;
    expandBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openModal();
    });
    container.appendChild(expandBtn);
  }
  async _renderImage(url, extension, token) {
    let targetUrl = url;
    try {
      const resolved = await resolveImageUrl(url, extension);
      if (token !== this._renderToken) {
        if (resolved.isBlob && typeof URL !== "undefined") {
          URL.revokeObjectURL(resolved.resolvedUrl);
        }
        return;
      }
      if (resolved.isBlob) {
        this._activeBlobUrl = resolved.resolvedUrl;
      }
      targetUrl = resolved.resolvedUrl;
    } catch {
    }
    this._currentResolvedUrl = targetUrl;
    const container = this._root.querySelector(".s3-container");
    if (!container || token !== this._renderToken) return;
    container.innerHTML = "";
    const img = document.createElement("img");
    img.className = "s3-media-img";
    img.setAttribute("part", "image");
    img.loading = this.loading;
    img.alt = this.filename || `Image preview (${extension || "media"})`;
    if (this.crossorigin) {
      img.crossOrigin = this.crossorigin;
    }
    img.onload = () => {
      if (token === this._renderToken) {
        container.removeAttribute("aria-busy");
        this._emitLoaded("image", extension, url);
        this._addExpandButton(container);
      }
    };
    img.onerror = () => {
      if (token === this._renderToken) {
        this._handlePlaybackError("image", extension, url, "Image failed to load or decode");
      }
    };
    if (this.clickToModal) {
      img.addEventListener("click", () => this.openModal());
    }
    img.src = targetUrl;
    container.appendChild(img);
  }
  _renderVideo(url, extension, token) {
    this._currentResolvedUrl = url;
    const container = this._root.querySelector(".s3-container");
    if (!container || token !== this._renderToken) return;
    container.innerHTML = "";
    const video = document.createElement("video");
    video.className = "s3-media-video";
    video.setAttribute("part", "video");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x5-playsinline", "");
    video.playsInline = true;
    video.webkitPlaysInline = true;
    video.preload = "metadata";
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
        container.removeAttribute("aria-busy");
        this._emitLoaded("video", extension, url);
        this._addExpandButton(container);
        if (this.autoplay) {
          try {
            const p = video.play();
            if (p !== void 0 && typeof p.catch === "function") {
              p.catch(() => {
              });
            }
          } catch {
          }
        }
      }
    };
    video.onerror = () => {
      if (token === this._renderToken) {
        this._handlePlaybackError("video", extension, url, "Video playback failed or codec unsupported");
      }
    };
    video.src = url;
    if (this.clickToModal && !this.controls) {
      video.classList.add("s3-clickable");
      video.addEventListener("click", () => {
        this.openModal();
      });
    }
    container.appendChild(video);
  }
  _renderAudio(url, extension, token) {
    this._currentResolvedUrl = url;
    const container = this._root.querySelector(".s3-container");
    if (!container || token !== this._renderToken) return;
    container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "s3-media-audio-wrapper";
    if (this.clickToModal) {
      wrapper.classList.add("s3-clickable");
      wrapper.addEventListener("click", (e) => {
        if (!e.target.closest("audio")) {
          this.openModal();
        }
      });
    }
    const header = document.createElement("div");
    header.className = "s3-audio-header";
    const iconWrap = document.createElement("div");
    iconWrap.className = "s3-audio-icon-wrap";
    iconWrap.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      </svg>
    `;
    const info = document.createElement("div");
    info.className = "s3-media-audio-info";
    const displayTitle = this._getDisplayFilename(url, extension);
    const displayExt = extension ? extension.toUpperCase() : "AUDIO";
    info.innerHTML = `
      <span class="s3-audio-badge">${this._escapeHtml(displayExt)}</span>
      <span class="s3-audio-title">${this._escapeHtml(displayTitle)}</span>
    `;
    header.appendChild(iconWrap);
    header.appendChild(info);
    const waves = document.createElement("div");
    waves.className = "s3-audio-waves";
    waves.setAttribute("aria-hidden", "true");
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
    const audio = document.createElement("audio");
    audio.className = "s3-media-audio";
    audio.setAttribute("part", "audio");
    audio.preload = "metadata";
    if (this.crossorigin) {
      audio.crossOrigin = this.crossorigin;
    }
    if (this.controls) audio.controls = true;
    if (this.autoplay) audio.autoplay = true;
    if (this.muted) audio.muted = true;
    if (this.loop) audio.loop = true;
    audio.onloadedmetadata = () => {
      if (token === this._renderToken) {
        container.removeAttribute("aria-busy");
        this._emitLoaded("audio", extension, url);
        this._addExpandButton(container);
        if (this.autoplay) {
          try {
            const p = audio.play();
            if (p !== void 0 && typeof p.catch === "function") {
              p.catch(() => {
              });
            }
          } catch {
          }
        }
      }
    };
    audio.onerror = () => {
      if (token === this._renderToken) {
        this._handlePlaybackError("audio", extension, url, "Audio playback failed or format unsupported");
      }
    };
    audio.src = url;
    wrapper.appendChild(header);
    wrapper.appendChild(waves);
    wrapper.appendChild(audio);
    container.appendChild(wrapper);
  }
  _renderDocument(url, extension, token) {
    this._currentResolvedUrl = url;
    const container = this._root.querySelector(".s3-container");
    if (!container || token !== this._renderToken) return;
    container.removeAttribute("aria-busy");
    container.innerHTML = "";
    const displayTitle = this._getDisplayFilename(url, extension);
    const wrapper = document.createElement("div");
    wrapper.className = "s3-media-pdf-wrapper";
    if (this.clickToModal) {
      wrapper.classList.add("s3-clickable");
      wrapper.addEventListener("click", (e) => {
        if (!e.target.closest("a")) {
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
    this._emitLoaded("document", extension, url);
  }
  async _probeAndRenderUnknown(url, extension, token) {
    const isImage = await new Promise((resolve) => {
      if (typeof Image === "undefined") {
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
    const isVideo = await new Promise((resolve) => {
      if (typeof document === "undefined") {
        resolve(false);
        return;
      }
      const testVideo = document.createElement("video");
      testVideo.preload = "metadata";
      testVideo.onloadedmetadata = () => resolve(true);
      testVideo.onerror = () => resolve(false);
      testVideo.src = url;
    });
    if (token !== this._renderToken) return;
    if (isVideo) {
      this._renderVideo(url, extension, token);
      return;
    }
    this._renderFallbackCard("unknown", extension, url, "Preview not supported by this browser");
  }
  _renderFallbackCard(category, extension, url, reason) {
    const container = this._root.querySelector(".s3-container");
    if (!container) return;
    container.removeAttribute("aria-busy");
    const displayExt = extension ? extension.toUpperCase() : category !== "unknown" ? category.toUpperCase() : "FILE";
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
  _escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
};
S3MediaViewer.observedAttributes = [
  "src",
  "type",
  "poster",
  "autoplay",
  "controls",
  "muted",
  "loop",
  "fit",
  "max-height",
  "aspect-ratio",
  "fill",
  "filename",
  "modal",
  "click-to-modal",
  "theme",
  "downloadable",
  "copyable",
  "loading",
  "retries",
  "crossorigin"
];
function registerS3MediaViewer(tagName = "s3-media-viewer") {
  if (typeof window !== "undefined" && typeof customElements !== "undefined" && !customElements.get(tagName)) {
    try {
      customElements.define(tagName, S3MediaViewer);
    } catch {
    }
  }
}

// src/index.ts
if (typeof window !== "undefined" && typeof customElements !== "undefined") {
  registerS3MediaViewer("s3-media-viewer");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALL_SUPPORTED_EXTENSIONS,
  AUDIO_EXTENSIONS,
  DOCUMENT_EXTENSIONS,
  IMAGE_EXTENSIONS,
  MEDIA_REGISTRY,
  S3MediaViewer,
  VIDEO_EXTENSIONS,
  detectMedia,
  extractExtension,
  getMediaCategory,
  isSupportedMediaUrl,
  registerS3MediaViewer,
  resolveImageUrl,
  supportsNativeHeic
});

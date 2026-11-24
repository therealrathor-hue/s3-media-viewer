# s3-media-viewer

Universal, zero-config, production-grade Web Component (`<s3-media-viewer>`) to view and play any image, video, audio, or PDF document from AWS S3 pre-signed URLs.

Works seamlessly in **Angular**, **React**, **Vue 3**, **Next.js**, **Svelte**, and **Vanilla HTML/JS**.

[![npm version](https://img.shields.io/npm/v/s3-media-viewer.svg)](https://www.npmjs.com/package/s3-media-viewer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Why `s3-media-viewer`?

When building modern web apps that interact with AWS S3, developers constantly fight with:
- S3 pre-signed URLs with complex query strings breaking basic file-extension logic.
- Apple iPhone `.heic` photos failing silently on Chrome, Firefox, and Edge.
- H.264 `.mov` videos failing to play in Chromium when enclosed in `<source type="video/quicktime">`.
- Videos hijacking fullscreen on iOS Safari / mobile WebViews instead of playing inline.
- Legacy codecs (`.avi`, `.wmv`, `.flv`, `.amr`, `.wma`) showing broken icons or throwing runtime errors.
- Modals or players that force pitch-dark backgrounds onto light-themed applications.
- Cumulative Layout Shift (CLS) when containers collapse to 0 height before media loads.
- Expired pre-signed URLs breaking the app without automatic recovery.

`s3-media-viewer` solves all of this with a **single, zero-crash tag**:

```html
<s3-media-viewer src="https://my-bucket.s3.amazonaws.com/..."></s3-media-viewer>
```

---

## Key Features

- **Universal Single Tag**: Pass ANY S3 pre-signed URL to `<s3-media-viewer src="..."></s3-media-viewer>` without conditional checks or swapping between player components.
- **Zero Uncaught Exceptions**: Defensive error boundaries around every fetch, decoder, and playback step. Never crashes the host application or leaves broken media icons.
- **Automatic Format & MIME Detection**:
  - Handles AWS signed URLs with query params (`?X-Amz-Signature=...`), URL-encoded filenames (`%20`), and uppercase extensions (`.MOV`, `.HEIC`, `.PDF`).
  - HEAD probe fallback for extensionless S3 UUID keys with silent fallback under CORS restrictions.
- **Pure White Modal Background**: Lightbox modal dialog strictly renders with a clean, high-contrast **pure white surface (`#ffffff`)** over a soft, non-blurring tint backdrop without turning your application dark.
- **Mobile & iOS Safari Optimized**:
  - Automatically sets `playsinline`, `webkit-playsinline`, and `x5-playsinline` on video elements so videos play inline inside mobile modals instead of hijacking fullscreen.
  - Automatically enforces `muted` whenever `autoplay` is enabled, catching browser autoplay rejections silently.
  - Respects EXIF orientation (`image-orientation: from-image;`) so mobile portrait photos never render sideways.
- **Zero Layout Shift (CLS Protection)**: Supports `aspect-ratio="16/9"` or `"1/1"` to reserve space before images/videos finish loading.
- **Transient Network Resilience**: Includes built-in exponential backoff `retries` (default `1`) before triggering `onRefreshUrl` or showing fallback cards.
- **S3 CORS Friendly**: By default, `crossorigin` is omitted so S3 buckets without CORS policies won't reject images or videos.
- **Ghost-Audio & Memory Protection**: Pauses media and unloads resources on modal close and route changes (`disconnectedCallback`), and revokes blob URLs automatically.
- **On-the-fly HEIC Conversion**: Automatically converts iPhone `.heic` / `.heif` images to JPEG on non-Safari browsers using dynamic imports (keeping the base bundle under 6KB).
- **Graceful Multi-Tier Fallbacks**: For legacy formats (`.avi`, `.wmv`, `.flv`, `.amr`, `.wma`, `.tiff`), displays an interactive fallback card with "Open in New Tab" and "Download File" actions.
- **Custom Slots & CSS Parts**: Full customization via Shadow DOM `::part(container)`, `::part(image)`, `::part(video)`, `::part(audio)`, `::part(fallback)`, and `<slot name="loading">` / `<slot name="fallback">`.

---

## Installation

```bash
npm install s3-media-viewer
```

or with yarn / pnpm:

```bash
yarn add s3-media-viewer
# or
pnpm add s3-media-viewer
```

---

## Framework Integrations

### 1. Angular

#### Standalone Component (Angular 14+):
```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 's3-media-viewer';

@Component({
  selector: 'app-media-dialog',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <s3-media-viewer
      [attr.src]="s3PresignedUrl"
      [attr.filename]="fileName"
      controls
      modal
      click-to-modal
      aspect-ratio="16/9"
      (media-loaded)="onMediaLoaded($event)"
      (media-fallback)="onMediaFallback($event)"
    ></s3-media-viewer>
  `
})
export class MediaDialogComponent {
  s3PresignedUrl = 'https://bucket.s3.amazonaws.com/media/clip.mov?X-Amz-...';
  fileName = 'clip.mov';

  onMediaLoaded(event: any) {
    console.log('Loaded:', event.detail);
  }

  onMediaFallback(event: any) {
    console.warn('Fallback:', event.detail.reason);
  }
}
```

#### In NgModule:
Add `CUSTOM_ELEMENTS_SCHEMA` to your module's `schemas`:
```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 's3-media-viewer';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
```

---

### 2. React / Next.js

`s3-media-viewer` comes with built-in JSX type definitions for React, Next.js, and Preact:

```tsx
import React, { useEffect, useRef } from 'react';
import 's3-media-viewer';
import type { S3MediaViewer } from 's3-media-viewer';

interface Props {
  url: string;
  filename?: string;
  onRefresh?: () => Promise<string>;
}

export const MediaViewer: React.FC<Props> = ({ url, filename, onRefresh }) => {
  const ref = useRef<S3MediaViewer>(null);

  useEffect(() => {
    if (ref.current && onRefresh) {
      ref.current.onRefreshUrl = onRefresh;
    }
  }, [onRefresh]);

  return (
    <s3-media-viewer
      ref={ref}
      src={url}
      filename={filename}
      controls
      modal
      click-to-modal
      aspect-ratio="16/9"
      fit="contain"
      max-height="500px"
    />
  );
};
```

> **SSR in Next.js**: `s3-media-viewer` is SSR-safe. In Next.js client components (`'use client'`), you can import it directly.

---

### 3. Vue 3

In your component:
```vue
<template>
  <s3-media-viewer
    :src="presignedUrl"
    :filename="fileName"
    controls
    modal
    click-to-modal
    aspect-ratio="16/9"
    @media-loaded="handleLoaded"
  ></s3-media-viewer>
</template>

<script setup>
import 's3-media-viewer';

const presignedUrl = 'https://my-bucket.s3.amazonaws.com/inspection.heic?X-Amz-...';
const fileName = 'inspection.heic';

function handleLoaded(e) {
  console.log('Ready:', e.detail);
}
</script>
```

---

### 4. Vanilla JavaScript & HTML

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/s3-media-viewer/dist/index.js"></script>

<div style="max-width: 600px; height: 350px;">
  <s3-media-viewer
    src="https://my-bucket.s3.amazonaws.com/clip.mp4"
    controls
    modal
    click-to-modal
  ></s3-media-viewer>
</div>
```

---

## Attributes & Properties

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | `""` | AWS S3 pre-signed URL (or any media URL). |
| `type` | `'image' \| 'audio' \| 'video' \| 'document'` | `undefined` | Optional explicit type override. Auto-detected if omitted. |
| `filename` | `string` | `""` | Display name for the media in fallbacks, audio players, and modal header. |
| `aspect-ratio` | `string` | `""` | CSS aspect ratio (e.g. `'16/9'`, `'1/1'`) to prevent Cumulative Layout Shift (CLS). |
| `fill` | `boolean` | `false` | Stretches viewer to 100% height of parent container (ideal for modals and full-height layouts). |
| `controls` | `boolean` | `true` | Show playback controls on audio and video. |
| `autoplay` | `boolean` | `false` | Enable autoplay. Automatically enforces `muted` on videos to meet browser policies. |
| `muted` | `boolean` | `false` | Mutes audio/video. |
| `loop` | `boolean` | `false` | Loops audio/video playback. |
| `fit` | `'contain' \| 'cover' \| 'scale-down'` | `'contain'` | CSS object-fit for images. |
| `max-height` | `string` | `'600px'` | Maximum height of the viewer container (e.g. `'200px'`, `'600px'`). |
| `poster` | `string` | `""` | Video thumbnail poster image URL. |
| `modal` | `boolean` | `false` | Displays an expand button in the corner to view media in a pure white modal dialog. |
| `click-to-modal`| `boolean` | `false` | Clicking the preview opens the white modal dialog directly. |
| `theme` | `'auto' \| 'minimal' \| 'light' \| 'dark'` | `'auto'` | Adapts to host website colors. Modal dialog always stays pure white. |
| `retries` | `number` | `1` | Number of retry attempts with exponential backoff before falling back. |
| `crossorigin` | `'anonymous' \| 'use-credentials' \| ''` | `""` | Optional CORS mode. Omitted by default to prevent S3 CORS issues. |
| `downloadable` | `boolean` | `true` | Enables direct 1-click file download. |
| `copyable` | `boolean` | `true` | Enables direct 1-click copy of the S3 URL. |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | HTML native image loading behavior. |

---

## JavaScript Methods & Helper Utilities

```typescript
import { S3MediaViewer, isSupportedMediaUrl, getMediaCategory } from 's3-media-viewer';

// 1. Validate files before rendering:
if (isSupportedMediaUrl(url)) {
  const category = getMediaCategory(url); // 'image' | 'video' | 'audio' | 'document' | 'unknown'
}

// 2. Programmatic modal controls:
const viewer = document.querySelector('s3-media-viewer');
viewer.openModal();
viewer.closeModal();
viewer.toggleModal();
console.log('Is modal open:', viewer.isModalOpen);

// 3. 1-Click helpers:
viewer.downloadCurrentMedia();
await viewer.copyCurrentMediaUrl();

// 4. Silent 1-time token refresh on expired S3 links:
viewer.onRefreshUrl = async () => {
  const res = await fetch('/api/get-fresh-s3-signed-url');
  const data = await res.json();
  return data.url;
};
```

---

## Events

All custom events bubble and compose across Shadow DOM boundaries:

### `media-loaded`
Fired when image, video, audio, or document successfully loads and is ready.
```typescript
event.detail = {
  category: 'image' | 'audio' | 'video' | 'document',
  extension: 'jpg',
  src: 'https://...'
};
```

### `media-fallback`
Fired when a format is unsupported by the browser or unplayable, and the fallback card is shown.
```typescript
event.detail = {
  reason: 'Browser cannot decode .avi format natively',
  category: 'video',
  extension: 'avi',
  src: 'https://...'
};
```

### `modal-change`
Fired whenever the modal is opened or closed.
```typescript
event.detail = {
  isOpen: boolean,
  category: 'image' | 'audio' | 'video' | 'document',
  src: 'https://...'
};
```

---

## CSS Theming & Web App UI Integration

`s3-media-viewer` is engineered to look native inside **any** host website:

```css
s3-media-viewer {
  /* Brand colors */
  --s3-viewer-accent: #2563eb;       /* Primary accent color */
  --s3-viewer-accent-hover: #1d4ed8; /* Primary hover color */
  --s3-viewer-radius: 8px;           /* Border radius for cards & preview */
  --s3-viewer-radius-lg: 12px;       /* Border radius for modal dialog */
  
  /* Adaptive container styling */
  --s3-viewer-bg: transparent;       /* Transparent preview box */
  --s3-viewer-surface: #ffffff;      /* Surface for audio & fallback cards */
  --s3-viewer-border: #e2e8f0;       /* Border color */
}
```

### Shadow DOM `::part()` Selectors
You can target internal elements directly via CSS parts:
```css
s3-media-viewer::part(container) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

s3-media-viewer::part(image) {
  border-radius: 8px;
}

s3-media-viewer::part(fallback) {
  background: #f8fafc;
}
```

### Custom Loading and Fallback Slots
```html
<s3-media-viewer src="...">
  <!-- Custom Loading Indicator -->
  <div slot="loading" class="my-custom-skeleton">Loading file...</div>

  <!-- Custom Fallback UI -->
  <div slot="fallback" class="my-custom-error">
    Cannot preview file. <a href="...">Download</a>
  </div>
</s3-media-viewer>
```

---

## Supported Formats

| Category | Formats | Browser Handling |
| :--- | :--- | :--- |
| **Images** | `jpg`, `png`, `webp`, `gif`, `avif`, `svg`, `bmp`, `ico` | Native `<img>` with EXIF orientation |
| **HEIC** | `heic`, `heif` | Native on Safari; dynamic client-side conversion on Chrome/Firefox/Edge |
| **TIFF** | `tif`, `tiff` | Graceful fallback card with direct open & download |
| **Audio** | `mp3`, `wav`, `m4a`, `flac`, `aac`, `ogg`, `opus`, `weba` | Native `<audio>` player with waveform visualization |
| **Video** | `mp4`, `webm`, `mov`, `m4v`, `3gp`, `mkv` | Native `<video>` with mobile `playsinline` support |
| **Documents**| `pdf` | Integrated document viewer with direct open & download |
| **Legacy** | `avi`, `wmv`, `flv`, `ts`, `mpg`, `amr`, `wma` | Clean fallback download & open card |

---

## Recommended S3 CORS Configuration

If your bucket hosts HEIC files (for client-side decoding) or extensionless keys, configure CORS in AWS S3:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["Content-Type", "Content-Length", "ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

---

## License

MIT © Antigravity Engineering

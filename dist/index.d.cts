type MediaCategory = 'image' | 'audio' | 'video' | 'document' | 'unknown';
type BrowserRisk = 'safe' | 'heic' | 'tiff' | 'container-dependent' | 'legacy';
interface MediaMeta {
    category: MediaCategory;
    mimeType: string;
    browserRisk: BrowserRisk;
}
declare const MEDIA_REGISTRY: Record<string, MediaMeta>;
declare const IMAGE_EXTENSIONS: string[];
declare const AUDIO_EXTENSIONS: string[];
declare const VIDEO_EXTENSIONS: string[];
declare const DOCUMENT_EXTENSIONS: string[];
declare const ALL_SUPPORTED_EXTENSIONS: string[];
declare function isSupportedMediaUrl(url: string): boolean;
declare function getMediaCategory(url: string): MediaCategory;
declare function extractExtension(signedUrl: string): string;
interface DetectionResult {
    category: MediaCategory;
    extension: string;
    mimeType: string;
    browserRisk: BrowserRisk;
}
declare function detectMedia(signedUrl: string, explicitType?: MediaCategory): Promise<DetectionResult>;

declare function supportsNativeHeic(): boolean;
interface ImageResolveResult {
    resolvedUrl: string;
    isBlob: boolean;
    fallbackOriginal: boolean;
}
declare function resolveImageUrl(url: string, extension: string): Promise<ImageResolveResult>;

interface MediaLoadedEventDetail {
    category: MediaCategory;
    extension: string;
    src: string;
}
interface MediaFallbackEventDetail {
    reason: string;
    category: MediaCategory;
    extension: string;
    src: string;
}
interface ModalChangeEventDetail {
    isOpen: boolean;
    category: MediaCategory;
    src: string;
}
declare const BaseElement: typeof HTMLElement;
declare class S3MediaViewer extends BaseElement {
    static readonly observedAttributes: string[];
    onRefreshUrl?: () => Promise<string>;
    private _root;
    private _portalHost;
    private _renderToken;
    private _activeBlobUrl;
    private _hasAttemptedRefresh;
    private _retryCount;
    private _currentCategory;
    private _currentExtension;
    private _currentResolvedUrl;
    private _isModalOpen;
    private _isZoomed;
    private _keydownHandler?;
    constructor();
    get src(): string;
    set src(val: string);
    get type(): MediaCategory | '';
    set type(val: MediaCategory | '');
    get poster(): string;
    set poster(val: string);
    get autoplay(): boolean;
    set autoplay(val: boolean);
    get controls(): boolean;
    set controls(val: boolean);
    get muted(): boolean;
    set muted(val: boolean);
    get loop(): boolean;
    set loop(val: boolean);
    get fit(): 'contain' | 'cover' | 'scale-down';
    set fit(val: 'contain' | 'cover' | 'scale-down');
    get maxHeight(): string;
    set maxHeight(val: string);
    get aspectRatio(): string;
    set aspectRatio(val: string);
    get fill(): boolean;
    set fill(val: boolean);
    get filename(): string;
    set filename(val: string);
    get modal(): boolean;
    set modal(val: boolean);
    get clickToModal(): boolean;
    set clickToModal(val: boolean);
    get theme(): 'auto' | 'minimal' | 'light' | 'dark';
    set theme(val: 'auto' | 'minimal' | 'light' | 'dark');
    get downloadable(): boolean;
    set downloadable(val: boolean);
    get copyable(): boolean;
    set copyable(val: boolean);
    get loading(): 'lazy' | 'eager';
    set loading(val: 'lazy' | 'eager');
    get retries(): number;
    set retries(val: number);
    get crossorigin(): 'anonymous' | 'use-credentials' | '';
    set crossorigin(val: 'anonymous' | 'use-credentials' | '');
    get isModalOpen(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void;
    openModal(): void;
    closeModal(): void;
    toggleModal(): void;
    downloadCurrentMedia(): void;
    copyCurrentMediaUrl(): Promise<boolean>;
    private _syncModalState;
    private _populateModalContent;
    private _revokeBlob;
    private _emitLoaded;
    private _emitFallback;
    private _getDisplayFilename;
    private _handlePlaybackError;
    private _render;
    private _addExpandButton;
    private _renderImage;
    private _renderVideo;
    private _renderAudio;
    private _renderDocument;
    private _probeAndRenderUnknown;
    private _renderFallbackCard;
    private _escapeHtml;
}
declare function registerS3MediaViewer(tagName?: string): void;

interface S3MediaViewerAttributes {
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

export { ALL_SUPPORTED_EXTENSIONS, AUDIO_EXTENSIONS, type BrowserRisk, DOCUMENT_EXTENSIONS, type DetectionResult, IMAGE_EXTENSIONS, type ImageResolveResult, MEDIA_REGISTRY, type MediaCategory, type MediaFallbackEventDetail, type MediaLoadedEventDetail, type MediaMeta, type ModalChangeEventDetail, S3MediaViewer, type S3MediaViewerAttributes, VIDEO_EXTENSIONS, detectMedia, extractExtension, getMediaCategory, isSupportedMediaUrl, registerS3MediaViewer, resolveImageUrl, supportsNativeHeic };

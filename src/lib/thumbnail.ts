import { toPng } from 'html-to-image';

export const APP_THUMBNAIL_VERSION = 'v1.0.1'; // bumped to invalidate cache

export type ThumbnailOpts = {
  width?: number; // default 596
  height?: number; // default 842
  pixelRatio?: number; // default 2
  backgroundColor?: string; // default '#ffffff'
};

/**
 * Snapshot an HTML element to PNG with proper rendering wait
 * Optimized for template previews with proper font loading
 */
export async function snapshotNodeToPng(
  node: HTMLElement,
  width = 596,
  height = 842,
  pixelRatio = 2
): Promise<string> {
  // Wait for fonts to load
  if ((document as any).fonts?.ready) {
    await (document as any).fonts.ready;
  }
  
  // Wait for next two animation frames to ensure rendering is complete
  await new Promise(resolve => 
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  );

  try {
    return await toPng(node, {
      cacheBust: true,
      backgroundColor: '#ffffff',
      canvasWidth: width,
      canvasHeight: height,
      pixelRatio,
      quality: 0.95,
      style: { 
        boxShadow: 'none',
        transform: 'none',
      },
      // Filter out elements with no-thumb class if needed
      filter: (node: Element) => {
        if (node.classList?.contains('no-thumb')) {
          return false;
        }
        return true;
      },
    });
  } catch (error) {
    console.error('Failed to generate thumbnail:', error);
    throw error;
  }
}

/**
 * Generate cache key for a template thumbnail
 * Includes template-specific identifiers to prevent cache collisions
 */
export function getThumbnailCacheKey(
  templateId: string, 
  themeColor: string, 
  layout: string,
  font: string
): string {
  return `thumb:${APP_THUMBNAIL_VERSION}:${templateId}:${layout}:${font}:${themeColor}`;
}

/**
 * Get thumbnail from localStorage cache
 */
export function getCachedThumbnail(cacheKey: string): string | null {
  try {
    return localStorage.getItem(cacheKey);
  } catch {
    return null;
  }
}

/**
 * Save thumbnail to localStorage cache
 */
export function saveThumbnailToCache(cacheKey: string, dataUrl: string): void {
  try {
    localStorage.setItem(cacheKey, dataUrl);
  } catch (error) {
    console.warn('Failed to cache thumbnail:', error);
    // localStorage might be full, attempt to clear old thumbnails
    try {
      clearOldThumbnails();
      localStorage.setItem(cacheKey, dataUrl);
    } catch {
      // If still failing, just continue without caching
    }
  }
}

/**
 * Clear old thumbnail entries from localStorage
 */
export function clearOldThumbnails(): void {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('thumb:') && !key.includes(APP_THUMBNAIL_VERSION)) {
      localStorage.removeItem(key);
    }
  });
}

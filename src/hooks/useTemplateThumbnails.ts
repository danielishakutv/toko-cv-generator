import { useState, useCallback, useEffect, useRef, createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Template } from '@/stores/cv';
import { buildDummyCvForTemplate } from '@/data/dummyCv';
import { OffscreenTemplateRenderer } from '@/components/OffscreenTemplateRenderer';
import {
  snapshotNodeToPng,
  getThumbnailCacheKey,
  getCachedThumbnail,
  saveThumbnailToCache,
  clearOldThumbnails,
} from '@/lib/thumbnail';

interface ThumbnailState {
  [templateId: string]: {
    dataUrl?: string;
    loading: boolean;
    error?: Error;
  };
}

interface GenerationQueueItem {
  template: Template;
  resolve: (dataUrl: string) => void;
  reject: (error: Error) => void;
  retryCount: number;
}

let thumbRoot: Root | null = null;
let thumbHost: HTMLDivElement | null = null;

/**
 * Ensure the offscreen rendering host exists
 */
function ensureThumbHost(): HTMLDivElement {
  if (!thumbHost) {
    thumbHost = document.createElement('div');
    thumbHost.id = '__thumb_root';
    thumbHost.style.position = 'fixed';
    thumbHost.style.left = '-9999px';
    thumbHost.style.top = '-9999px';
    thumbHost.style.zIndex = '-1';
    document.body.appendChild(thumbHost);
  }
  return thumbHost;
}

/**
 * Get or create React root for thumbnail rendering
 */
function getThumbRoot(): Root {
  if (!thumbRoot) {
    const host = ensureThumbHost();
    thumbRoot = createRoot(host);
  }
  return thumbRoot;
}

/**
 * Render a template and capture its thumbnail
 */
async function renderAndCaptureTemplate(template: Template): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const root = getThumbRoot();
      const host = ensureThumbHost();
      const dummyData = buildDummyCvForTemplate(template);

      // Render the offscreen template using createElement to avoid JSX issues
      const element = createElement(OffscreenTemplateRenderer, {
        template,
        cvData: dummyData,
      });
      
      root.render(element);

      // Wait for render to complete (two animation frames)
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      // Find the A4 node and snapshot it
      const a4Node = host.querySelector('#thumb-a4') as HTMLElement;
      if (!a4Node) {
        throw new Error('Thumbnail A4 node not found');
      }

      const dataUrl = await snapshotNodeToPng(a4Node, 596, 842, 2);

      // Clear the render (unmount by rendering null)
      root.render(null);

      resolve(dataUrl);
    } catch (error) {
      // Clean up on error
      try {
        const root = getThumbRoot();
        root.render(null);
      } catch {
        // Ignore cleanup errors
      }
      reject(error);
    }
  });
}

/**
 * Hook for managing template thumbnail generation and caching
 * Generates thumbnails sequentially to avoid jank
 */
export function useTemplateThumbnails(templates: Template[]) {
  const [thumbnails, setThumbnails] = useState<ThumbnailState>({});
  const generationQueueRef = useRef<GenerationQueueItem[]>([]);
  const isGeneratingRef = useRef(false);
  const mountedRef = useRef(true);

  // Initialize cache on mount
  useEffect(() => {
    mountedRef.current = true;
    clearOldThumbnails(); // Remove outdated thumbnails

    const initialState: ThumbnailState = {};
    templates.forEach((template) => {
      const cacheKey = getThumbnailCacheKey(
        template.id,
        template.theme.primary,
        template.layout,
        template.theme.font
      );
      const cached = getCachedThumbnail(cacheKey);

      initialState[template.id] = {
        dataUrl: cached || undefined,
        loading: !cached,
        error: undefined,
      };
    });

    setThumbnails(initialState);

    return () => {
      mountedRef.current = false;
    };
  }, [templates]);

  /**
   * Process the generation queue sequentially
   */
  const processQueue = useCallback(async () => {
    if (isGeneratingRef.current || generationQueueRef.current.length === 0) {
      return;
    }

    isGeneratingRef.current = true;

    while (generationQueueRef.current.length > 0) {
      const item = generationQueueRef.current.shift();
      if (!item || !mountedRef.current) continue;

      const { template, resolve, reject, retryCount } = item;

      try {
        // Check cache again in case it was generated elsewhere
        const cacheKey = getThumbnailCacheKey(
          template.id,
          template.theme.primary,
          template.layout,
          template.theme.font
        );
        const cached = getCachedThumbnail(cacheKey);

        if (cached) {
          if (mountedRef.current) {
            setThumbnails((prev) => ({
              ...prev,
              [template.id]: { dataUrl: cached, loading: false },
            }));
          }
          resolve(cached);
          continue;
        }

        // Use React-based rendering
        const dataUrl = await renderAndCaptureTemplate(template);

        // Cache the result
        saveThumbnailToCache(cacheKey, dataUrl);

        // Update state
        if (mountedRef.current) {
          setThumbnails((prev) => ({
            ...prev,
            [template.id]: { dataUrl, loading: false },
          }));
        }

        resolve(dataUrl);
      } catch (error) {
        console.error(`Failed to generate thumbnail for ${template.id}:`, error);

        // Retry once on failure
        if (retryCount < 1) {
          generationQueueRef.current.push({ ...item, retryCount: retryCount + 1 });
        } else {
          if (mountedRef.current) {
            setThumbnails((prev) => ({
              ...prev,
              [template.id]: {
                loading: false,
                error: error as Error,
              },
            }));
          }
          reject(error as Error);
        }
      }

      // Small delay between generations to avoid overwhelming the browser
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    isGeneratingRef.current = false;
  }, []);

  /**
   * Ensure a thumbnail exists for a template
   */
  const ensureThumbnail = useCallback(
    (template: Template): Promise<string> => {
      const existing = thumbnails[template.id];
      if (existing?.dataUrl) {
        return Promise.resolve(existing.dataUrl);
      }

      return new Promise((resolve, reject) => {
        generationQueueRef.current.push({
          template,
          resolve,
          reject,
          retryCount: 0,
        });
        processQueue();
      });
    },
    [thumbnails, processQueue]
  );

  /**
   * Prewarm all thumbnails (generate sequentially)
   */
  const prewarmAll = useCallback(
    (templatesToWarm: Template[]) => {
      const toGenerate = templatesToWarm.filter((t) => !thumbnails[t.id]?.dataUrl);
      
      toGenerate.forEach((template) => {
        if (!generationQueueRef.current.find((item) => item.template.id === template.id)) {
          generationQueueRef.current.push({
            template,
            resolve: () => {},
            reject: () => {},
            retryCount: 0,
          });
        }
      });

      processQueue();
    },
    [thumbnails, processQueue]
  );

  /**
   * Get thumbnail for a template
   */
  const getThumbnail = useCallback(
    (template: Template): string | undefined => {
      return thumbnails[template.id]?.dataUrl;
    },
    [thumbnails]
  );

  /**
   * Check if a thumbnail is loading
   */
  const isLoading = useCallback(
    (template: Template): boolean => {
      return thumbnails[template.id]?.loading || false;
    },
    [thumbnails]
  );

  return {
    getThumbnail,
    ensureThumbnail,
    prewarmAll,
    isLoading,
    thumbnails,
  };
}

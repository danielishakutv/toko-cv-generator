/**
 * Pagination utilities for multi-page A4 layout
 */

// A4 dimensions at 96 DPI
export const PAGE_INNER = { w: 794, h: 1123 }; // logical px
export const PAGE_PADDING = { x: 40, y: 40 }; // inner padding
export const AVAILABLE_HEIGHT = PAGE_INNER.h - (PAGE_PADDING.y * 2); // ~1043px

/**
 * Paginate HTML block elements into pages
 * @param blockNodes Array of HTML elements to paginate
 * @param pageHeightPx Available height per page (default: AVAILABLE_HEIGHT)
 * @returns Array of arrays, where each inner array contains blocks for that page
 */
export function paginateBlocks(
  blockNodes: HTMLElement[],
  pageHeightPx: number = AVAILABLE_HEIGHT
): HTMLElement[][] {
  const pages: HTMLElement[][] = [];
  let currentPage: HTMLElement[] = [];
  let currentPageHeight = 0;

  for (const block of blockNodes) {
    const blockHeight = block.offsetHeight || 0;

    // If adding this block would exceed page height and current page has content
    if (currentPageHeight + blockHeight > pageHeightPx && currentPage.length > 0) {
      // Start new page
      pages.push(currentPage);
      currentPage = [block];
      currentPageHeight = blockHeight;
    } else {
      // Add to current page
      currentPage.push(block);
      currentPageHeight += blockHeight;
    }
  }

  // Add remaining blocks
  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages.length > 0 ? pages : [[]];
}

/**
 * Calculate number of pages needed for given content height
 */
export function calculatePageCount(contentHeight: number): number {
  return Math.ceil(contentHeight / AVAILABLE_HEIGHT);
}

/**
 * Check if an element should avoid page breaks
 */
export function shouldAvoidBreak(element: HTMLElement): boolean {
  return element.classList.contains('avoid-break') || 
         element.classList.contains('page-break-inside-avoid');
}

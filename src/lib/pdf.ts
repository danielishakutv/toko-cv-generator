import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, ImageRun } from 'docx';

// A4 dimensions in points (pt) for PDF
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;

// A4 dimensions in pixels at 150 DPI (recommended for quality vs size)
const A4_WIDTH_PX = 1240;
const A4_HEIGHT_PX = 1754;

/**
 * Export CV as PDF with A4 sizing and compression to keep file under 1MB
 */
export async function exportPdfA4(element: HTMLElement, filename: string = 'cv.pdf'): Promise<void> {
  try {
    let quality = 0.72;
    let canvasWidth = A4_WIDTH_PX;
    let canvasHeight = A4_HEIGHT_PX;
    let pdfBlob: Blob | null = null;

    // Try to compress until file size is under 1MB
    while (quality >= 0.5) {
      const dataUrl = await toJpeg(element, {
        quality,
        canvasWidth,
        canvasHeight,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
        compress: true,
      });

      pdf.addImage(dataUrl, 'JPEG', 0, 0, A4_WIDTH_PT, A4_HEIGHT_PT, undefined, 'FAST');
      pdfBlob = pdf.output('blob');

      // Check file size (1MB = 1048576 bytes)
      if (pdfBlob.size <= 1048576) {
        break;
      }

      // Reduce quality for next iteration
      if (quality > 0.65) {
        quality = 0.65;
      } else if (quality > 0.5) {
        quality = 0.5;
        // Also reduce resolution
        canvasWidth = 992;
        canvasHeight = 1404;
      } else {
        break;
      }
    }

    if (pdfBlob) {
      saveAs(pdfBlob, filename);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

/**
 * Export CV as JPEG image
 */
export async function exportJpeg(element: HTMLElement, filename: string = 'cv.jpeg'): Promise<void> {
  try {
    const dataUrl = await toJpeg(element, {
      quality: 0.9,
      canvasWidth: A4_WIDTH_PX,
      canvasHeight: A4_HEIGHT_PX,
      backgroundColor: '#ffffff',
      cacheBust: true,
    });

    // Convert data URL to blob and save
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error generating JPEG:', error);
    throw error;
  }
}

/**
 * Export CV as DOCX with embedded image
 * Simple approach: embeds the CV as an image in an A4 document
 */
export async function exportDocx(element: HTMLElement, filename: string = 'cv.docx'): Promise<void> {
  try {
    // Generate PNG image of the CV
    const dataUrl = await toPng(element, {
      quality: 1,
      canvasWidth: A4_WIDTH_PX,
      canvasHeight: A4_HEIGHT_PX,
      backgroundColor: '#ffffff',
      cacheBust: true,
    });

    // Convert data URL to array buffer
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    // Create DOCX with embedded image
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: arrayBuffer,
                  transformation: {
                    width: 595, // A4 width in points
                    height: 842, // A4 height in points
                  },
                  type: 'png',
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Generate and save DOCX
    const docxBlob = await Packer.toBlob(doc);
    saveAs(docxBlob, filename);
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw error;
  }
}

/**
 * Legacy function - now redirects to exportPdfA4
 */
export async function downloadCvAsPdf(elementId: string, filename: string = 'cv.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }
  return exportPdfA4(element, filename);
}

/**
 * Print CV
 */
export function printCv(): void {
  window.print();
}

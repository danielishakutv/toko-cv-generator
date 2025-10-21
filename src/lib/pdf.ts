import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export async function downloadCvAsPdf(elementId: string, filename: string = 'cv.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // Create image from HTML element
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export function printCv() {
  window.print();
}

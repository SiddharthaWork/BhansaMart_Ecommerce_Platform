import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface PdfDownloadProps {
  tableData: any[];
  headers: { label: string; key: string }[];
  fileName?: string;
  title?: string;
}

export const downloadPdf = ({
  tableData,
  headers,
  fileName = "download.pdf",
  title = "Transaction Report",
}: PdfDownloadProps) => {
  const doc = new jsPDF();

  // Set page border
  const margin = 10;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Draw rectangle border
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(
    margin,
    margin,
    pageWidth - 2 * margin,
    pageHeight - 2 * margin,
    "S"
  );

  doc.setFontSize(16);

  // Add title text
  doc.text(title, pageWidth / 2, 20, { align: "center" });

  // Add underline
  const titleWidth = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line((pageWidth - titleWidth) / 2, 23, (pageWidth + titleWidth) / 2, 23);

  const arrayData = tableData?.map((row) => {
    return headers?.map((header) => row[header.key]);
  });

  autoTable(doc, {
    startY: 35,
    margin: { top: 10, right: margin + 5, bottom: 10, left: margin + 5 },
    head: [headers?.map((h) => h.label)],
    body: arrayData,
    styles: {
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [34, 117, 252],
    },
  });

  doc.save(fileName);
};


import { toast } from "sonner";
import jsPDF from "jspdf";

/**
 * Creates and triggers a download for a text or HTML file
 */
export const downloadFile = (
  content: string, 
  fileName: string, 
  contentType: string = 'text/plain'
) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  toast.success(`Exported as ${fileName}`);
};

/**
 * Downloads content as PDF file
 */
export const downloadAsPDF = (title: string, content: string) => {
  if (!content.trim()) {
    toast.error("Cannot export empty content");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(title, 20, 20);
  doc.setFontSize(12);
  
  // Create a temp div to strip HTML and get plain text
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  
  // Split text into lines to fit on PDF
  const splitText = doc.splitTextToSize(text, 170);
  doc.text(splitText, 20, 30);
  
  doc.save(`${title}.pdf`);
  toast.success(`Exported as ${title}.pdf`);
};

/**
 * Downloads content as TXT file
 */
export const downloadAsTxt = (title: string, content: string) => {
  if (!content.trim()) {
    toast.error("Cannot export empty content");
    return;
  }
  
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  downloadFile(text, `${title}.txt`, 'text/plain');
};

/**
 * Downloads content as DOCX file
 */
export const downloadAsDocx = (title: string, content: string) => {
  if (!content.trim()) {
    toast.error("Cannot export empty content");
    return;
  }

  // Create HTML content with the content
  const htmlContent = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div>${content}</div>
      </body>
    </html>
  `;

  // Create a Blob with HTML content and Word-specific metadata
  const blob = new Blob([htmlContent], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  toast.success(`Exported as ${title}.docx`);
  toast.info("Note: For better DOCX formatting, consider copying content into a word processor");
};

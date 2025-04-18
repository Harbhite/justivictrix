
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from 'xlsx';
import { Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimetableExportProps {
  timetableRef: React.RefObject<HTMLDivElement>;
  classes: any[];
  timeSlots: string[];
  daysOfWeek: string[];
}

const TimetableExport = ({ 
  timetableRef, 
  classes, 
  timeSlots, 
  daysOfWeek 
}: TimetableExportProps) => {
  
  const downloadAsPDF = async () => {
    if (!timetableRef.current) {
      toast.error("Timetable element not found");
      return;
    }
    
    try {
      toast.info("Preparing your timetable download...");
      
      // Set proper scale and options for better quality rendering
      const canvas = await html2canvas(timetableRef.current, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit the page properly
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // Margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('class-timetable.pdf');
      
      toast.success("Timetable downloaded as PDF!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download timetable as PDF");
    }
  };

  const downloadAsExcel = () => {
    try {
      toast.info("Preparing your Excel download...");
      
      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new();
      
      // Prepare the header data
      const excelData = [
        ["Class Timetable"], // Title row
        [], // Empty row for spacing
        ["Day/Time", ...timeSlots], // Header row with time slots
      ];
      
      // Add data for each day
      daysOfWeek.forEach(day => {
        const dayRow = [day];
        
        timeSlots.forEach(time => {
          // Find classes that occur at this time slot on this day
          const classesAtTime = classes.filter(classItem => {
            if (classItem.day !== day) return false;
            
            const startTimeIndex = timeSlots.indexOf(classItem.start_time);
            const endTimeIndex = timeSlots.indexOf(classItem.end_time);
            const currentTimeIndex = timeSlots.indexOf(time);
            
            return currentTimeIndex >= startTimeIndex && currentTimeIndex < endTimeIndex;
          });
          
          // Get the first class at this time slot if any
          const classItem = classesAtTime[0];
          
          if (classItem) {
            dayRow.push(`${classItem.course_code}: ${classItem.course_title}\nLocation: ${classItem.location}\nLecturer: ${classItem.lecturer}`);
          } else {
            dayRow.push("");
          }
        });
        
        excelData.push(dayRow);
      });
      
      // Create the worksheet from data
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      
      // Set column widths for better readability
      const wscols = [
        { wch: 15 }, // Day column
        ...timeSlots.map(() => ({ wch: 30 })) // Time slot columns - increased width for better readability
      ];
      
      ws['!cols'] = wscols;
      
      // Set row heights
      const wsrows = [
        { hpt: 30 }, // Title row
        { hpt: 15 }, // Empty spacing row
        { hpt: 25 }, // Header row
        ...daysOfWeek.map(() => ({ hpt: 80 })) // Day rows with increased height
      ];
      
      ws['!rows'] = wsrows;
      
      // Add styling for title row
      const titleCell = XLSX.utils.encode_cell({r: 0, c: 0});
      if(!ws[titleCell]) ws[titleCell] = {};
      ws[titleCell].s = { font: { bold: true, sz: 16 }, alignment: { horizontal: 'center' } };
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Timetable");
      
      // Merge cells for title
      if(!ws['!merges']) ws['!merges'] = [];
      ws['!merges'].push(
        { s: { r: 0, c: 0 }, e: { r: 0, c: timeSlots.length } } // Merge title across all columns
      );
      
      // Write the workbook to file
      XLSX.writeFile(wb, "class-timetable.xlsx");
      
      toast.success("Timetable downloaded as Excel!");
    } catch (error) {
      console.error("Error generating Excel file:", error);
      toast.error("Failed to download timetable as Excel");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={downloadAsPDF}
        className="px-4 py-2 bg-blue-100 border-4 border-black hover:bg-blue-200 transition-colors"
      >
        <Download className="mr-2" /> PDF
      </Button>
      <Button
        onClick={downloadAsExcel}
        className="px-4 py-2 bg-green-100 border-4 border-black hover:bg-green-200 transition-colors"
      >
        <FileSpreadsheet className="mr-2" /> Excel
      </Button>
    </div>
  );
};

export default TimetableExport;

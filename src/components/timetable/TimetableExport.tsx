
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
    if (!timetableRef.current) return;
    
    try {
      toast.info("Preparing your timetable download...");
      
      const canvas = await html2canvas(timetableRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 280;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('class-timetable.pdf');
      
      toast.success("Timetable downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download timetable");
    }
  };

  const downloadAsExcel = () => {
    try {
      toast.info("Preparing your Excel download...");
      
      const wb = XLSX.utils.book_new();
      
      const excelData = [
        ["Class Timetable"], // Title row
        [], // Empty row for spacing
        ["Day/Time", ...timeSlots], // Header row with time slots
      ];
      
      daysOfWeek.forEach(day => {
        const dayRow = [day];
        
        timeSlots.forEach(time => {
          const classesAtTime = classes.filter((classItem: any) => {
            if (classItem.day !== day) return false;
            
            const startTimeIndex = timeSlots.indexOf(classItem.start_time);
            const endTimeIndex = timeSlots.indexOf(classItem.end_time);
            const currentTimeIndex = timeSlots.indexOf(time);
            
            return currentTimeIndex >= startTimeIndex && currentTimeIndex < endTimeIndex;
          });
          
          const classItem = classesAtTime[0]; // Get the first class at this time slot if any
          
          if (classItem) {
            dayRow.push(`${classItem.course_code}: ${classItem.course_title}\nLocation: ${classItem.location}\nLecturer: ${classItem.lecturer}`);
          } else {
            dayRow.push("");
          }
        });
        
        excelData.push(dayRow);
      });
      
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      
      const wscols = [
        { wch: 15 }, // Day column
        ...timeSlots.map(() => ({ wch: 25 })) // Time slot columns
      ];
      
      ws['!cols'] = wscols;
      
      XLSX.utils.book_append_sheet(wb, ws, "Timetable");
      
      XLSX.writeFile(wb, "class-timetable.xlsx");
      
      toast.success("Excel file downloaded successfully!");
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

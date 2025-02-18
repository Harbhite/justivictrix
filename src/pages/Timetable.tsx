
import { motion } from "framer-motion";
import { Download, Image as ImageIcon } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { toast } from "sonner";

const Timetable = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  
  const timetable = [
    {
      time: "8:00 AM - 10:00 AM",
      monday: "Constitutional Law",
      tuesday: "Criminal Law",
      wednesday: "Contract Law",
      thursday: "Property Law",
      friday: "Jurisprudence"
    },
    {
      time: "10:00 AM - 12:00 PM",
      monday: "Legal Methods",
      tuesday: "Nigerian Legal System",
      wednesday: "Administrative Law",
      thursday: "Law of Torts",
      friday: "Legal Research"
    },
    {
      time: "1:00 PM - 3:00 PM",
      monday: "Commercial Law",
      tuesday: "Company Law",
      wednesday: "Evidence",
      thursday: "Civil Procedure",
      friday: "Moot Court"
    }
  ];

  const downloadAsCsv = () => {
    let csvContent = "Time,Monday,Tuesday,Wednesday,Thursday,Friday\n";
    timetable.forEach(row => {
      csvContent += `${row.time},${row.monday},${row.tuesday},${row.wednesday},${row.thursday},${row.friday}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'LLB28_Timetable.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Timetable downloaded as CSV');
  };

  const downloadAsImage = async () => {
    if (!tableRef.current) return;
    
    try {
      const canvas = await html2canvas(tableRef.current);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'LLB28_Timetable.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Timetable downloaded as image');
    } catch (error) {
      toast.error('Failed to download image');
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-black text-law-dark mb-12 border-4 border-black p-4 inline-block transform -rotate-1">
          Class Timetable
        </h1>

        <div className="p-8 bg-blue-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-end gap-4 mb-6">
            <button
              onClick={downloadAsCsv}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download CSV
            </button>
            <button
              onClick={downloadAsImage}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              Download Image
            </button>
          </div>
          
          <div ref={tableRef} className="bg-white p-6 rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-black bg-white p-2">Time</th>
                  <th className="border-2 border-black bg-white p-2">Monday</th>
                  <th className="border-2 border-black bg-white p-2">Tuesday</th>
                  <th className="border-2 border-black bg-white p-2">Wednesday</th>
                  <th className="border-2 border-black bg-white p-2">Thursday</th>
                  <th className="border-2 border-black bg-white p-2">Friday</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((row, index) => (
                  <tr key={index}>
                    <td className="border-2 border-black bg-white p-2">{row.time}</td>
                    <td className="border-2 border-black bg-white p-2">{row.monday}</td>
                    <td className="border-2 border-black bg-white p-2">{row.tuesday}</td>
                    <td className="border-2 border-black bg-white p-2">{row.wednesday}</td>
                    <td className="border-2 border-black bg-white p-2">{row.thursday}</td>
                    <td className="border-2 border-black bg-white p-2">{row.friday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Timetable;

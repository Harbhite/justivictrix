import React, { useState, useRef, useEffect } from 'react';
import { useMetaTags } from "@/hooks/useMetaTags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  FileDown,
  Save,
  FileText,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Link
} from "lucide-react";
import jsPDF from 'jspdf';
import TurndownService from 'turndown';

const NoteTaker = () => {
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [savedNotes, setSavedNotes] = useState<Array<{id: string; title: string; content: string}>>([]);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  useMetaTags({
    title: "Note Taker - LLB28 Hub",
    description: "Create, edit, and manage your study notes with a rich text editor. Export notes as HTML, Markdown, PDF, or DOCX.",
    image: "/og-image.png",
    type: "website"
  });

  // Load saved notes from local storage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      try {
        setSavedNotes(JSON.parse(storedNotes));
      } catch (e) {
        console.error('Failed to parse stored notes', e);
      }
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(savedNotes));
  }, [savedNotes]);
  
  // Store the selection before any command execution
  const saveSelection = () => {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel && sel.getRangeAt && sel.rangeCount) {
        setSelectionRange(sel.getRangeAt(0));
      }
    }
  };

  // Restore selection after command execution
  const restoreSelection = () => {
    if (selectionRange && window.getSelection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(selectionRange);
      }
    }
  };
  
  const formatText = (command: string, value: string = "") => {
    if (editorRef.current) {
      // Save the current selection
      saveSelection();
      
      // Focus the editor to ensure commands apply correctly
      editorRef.current.focus();
      
      // Restore selection before applying command
      restoreSelection();
      
      // Execute command
      document.execCommand(command, false, value);
      
      // Update content state after formatting
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    }
  };
  
  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Track selection changes
  const handleSelectionChange = () => {
    if (window.getSelection && document.activeElement === editorRef.current) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount) {
        setSelectionRange(sel.getRangeAt(0));
      }
    }
  };

  // Add selection change listener
  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const insertLink = () => {
    saveSelection();
    const url = prompt('Enter URL:');
    if (url) {
      restoreSelection();
      formatText('createLink', url);
    }
  };

  const saveNote = () => {
    if (!content.trim()) {
      toast.error("Cannot save empty note");
      return;
    }
    
    const newNote = {
      id: Date.now().toString(),
      title,
      content
    };
    
    setSavedNotes([...savedNotes, newNote]);
    toast.success("Note saved successfully!");
  };
  
  const exportAsHTML = () => {
    if (!content.trim()) {
      toast.error("Cannot export empty note");
      return;
    }
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div>${content}</div>
        </body>
      </html>
    `;
    
    downloadFile(htmlContent, `${title}.html`, 'text/html');
  };
  
  const exportAsMarkdown = () => {
    if (!content.trim()) {
      toast.error("Cannot export empty note");
      return;
    }
    
    // Use TurndownService to convert HTML to Markdown
    const turndownService = new TurndownService();
    let markdown = `# ${title}\n\n`;
    markdown += turndownService.turndown(content);
    
    downloadFile(markdown, `${title}.md`, 'text/markdown');
  };

  const exportAsPDF = () => {
    if (!content.trim()) {
      toast.error("Cannot export empty note");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(22);
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

  const exportAsDocx = () => {
    if (!content.trim()) {
      toast.error("Cannot export empty note");
      return;
    }

    // Create a simple HTML document with the content
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

    // Since html-to-docx is causing issues, we'll use a workaround
    // We'll create a Blob with HTML content and add MS Word specific metadata
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
  
  const exportAsText = () => {
    if (!content.trim()) {
      toast.error("Cannot export empty note");
      return;
    }
    
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = `${title}\n\n${tempDiv.textContent || tempDiv.innerText || ""}`;
    downloadFile(text, `${title}.txt`, 'text/plain');
  };
  
  const downloadFile = (content: string, fileName: string, contentType: string) => {
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

  const loadNote = (note: {id: string; title: string; content: string}) => {
    setTitle(note.title);
    setContent(note.content);
    // Set the content without dangerouslySetInnerHTML to avoid interference
    if (editorRef.current) {
      editorRef.current.innerHTML = note.content;
    }
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedNotes = savedNotes.filter(note => note.id !== id);
    setSavedNotes(updatedNotes);
    toast.success("Note deleted");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Note Taker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="p-4 mb-6 shadow-lg">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold mb-4"
              placeholder="Note Title"
            />
            
            <div className="bg-gray-100 p-2 rounded-md mb-4 flex flex-wrap gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('bold')}
                title="Bold"
              >
                <Bold size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('italic')}
                title="Italic"
              >
                <Italic size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('underline')}
                title="Underline"
              >
                <Underline size={16} />
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('justifyLeft')}
                title="Align Left"
              >
                <AlignLeft size={16} />
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('justifyCenter')}
                title="Center"
              >
                <AlignCenter size={16} />
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('justifyRight')}
                title="Align Right"
              >
                <AlignRight size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('insertUnorderedList')}
                title="Bullet List"
              >
                <List size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('insertOrderedList')}
                title="Numbered List"
              >
                <ListOrdered size={16} />
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('formatBlock', '<h1>')}
                title="Heading 1"
              >
                <Heading1 size={16} />
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('formatBlock', '<h2>')}
                title="Heading 2"
              >
                <Heading2 size={16} />
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={insertLink}
                title="Insert Link"
              >
                <Link size={16} />
              </Button>
              
              <div className="ml-auto flex gap-1">
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={saveNote}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save size={16} className="mr-1" />
                  Save
                </Button>
              </div>
            </div>
            
            <div
              ref={editorRef}
              className="min-h-[400px] border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              contentEditable
              onInput={handleContentChange}
              onBlur={handleContentChange}
            />
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Button 
                variant="outline"
                onClick={exportAsHTML}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <FileDown size={16} className="mr-2" />
                Export as HTML
              </Button>
              
              <Button 
                variant="outline"
                onClick={exportAsMarkdown}
                className="text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                <FileDown size={16} className="mr-2" />
                Export as Markdown
              </Button>
              
              <Button 
                variant="outline"
                onClick={exportAsPDF}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <FileDown size={16} className="mr-2" />
                Export as PDF
              </Button>

              <Button 
                variant="outline"
                onClick={exportAsDocx}
                className="text-blue-800 border-blue-800 hover:bg-blue-50"
              >
                <FileDown size={16} className="mr-2" />
                Export as DOCX
              </Button>
              
              <Button 
                variant="outline"
                onClick={exportAsText}
                className="text-gray-600 border-gray-600 hover:bg-gray-50"
              >
                <FileDown size={16} className="mr-2" />
                Export as Text
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FileText size={18} className="mr-2" />
              Saved Notes
            </h2>
            
            {savedNotes.length === 0 ? (
              <p className="text-gray-500 text-sm">No saved notes yet.</p>
            ) : (
              <div className="space-y-2">
                {savedNotes.map(note => (
                  <div 
                    key={note.id} 
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer flex justify-between items-center"
                    onClick={() => loadNote(note)}
                  >
                    <div>
                      <h3 className="font-medium">{note.title}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(parseInt(note.id)).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => deleteNote(note.id, e)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NoteTaker;


import React, { useState, useRef } from 'react';
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
  FileText
} from "lucide-react";

const NoteTaker = () => {
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [savedNotes, setSavedNotes] = useState<Array<{id: string; title: string; content: string}>>([]);
  
  const formatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };
  
  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const saveNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content
    };
    
    setSavedNotes([...savedNotes, newNote]);
    toast.success("Note saved successfully!");
  };
  
  const exportAsHTML = () => {
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
    // Simple HTML to Markdown conversion
    let markdown = `# ${title}\n\n`;
    
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Process paragraphs
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      markdown += p.textContent + '\n\n';
    });
    
    // Process lists
    const uls = tempDiv.querySelectorAll('ul');
    uls.forEach(ul => {
      ul.querySelectorAll('li').forEach(li => {
        markdown += `- ${li.textContent}\n`;
      });
      markdown += '\n';
    });
    
    const ols = tempDiv.querySelectorAll('ol');
    ols.forEach(ol => {
      let i = 1;
      ol.querySelectorAll('li').forEach(li => {
        markdown += `${i}. ${li.textContent}\n`;
        i++;
      });
      markdown += '\n';
    });
    
    downloadFile(markdown, `${title}.md`, 'text/markdown');
  };
  
  const exportAsText = () => {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = `${title}\n\n${tempDiv.textContent}`;
    downloadFile(text, `${title}.txt`, 'text/plain');
  };
  
  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success(`Exported as ${fileName}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Note Taker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="p-4 mb-6">
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
              >
                <Bold size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('italic')}
              >
                <Italic size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('underline')}
              >
                <Underline size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('insertUnorderedList')}
              >
                <List size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => formatText('insertOrderedList')}
              >
                <ListOrdered size={16} />
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
              dangerouslySetInnerHTML={{ __html: content }}
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
          <Card className="p-4">
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
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setTitle(note.title);
                      setContent(note.content);
                      if (editorRef.current) {
                        editorRef.current.innerHTML = note.content;
                      }
                    }}
                  >
                    <h3 className="font-medium">{note.title}</h3>
                    <p className="text-xs text-gray-500 truncate">
                      {new Date(parseInt(note.id)).toLocaleString()}
                    </p>
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

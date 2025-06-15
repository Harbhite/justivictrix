
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote', 'code'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ]
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'blockquote', 'code',
  'list', 'bullet', 'align', 'link', 'image'
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  readOnly = false,
}) => (
  <ReactQuill
    className={className}
    theme="snow"
    value={value}
    onChange={onChange}
    modules={modules}
    formats={formats}
    placeholder={placeholder}
    readOnly={readOnly}
    style={{ minHeight: 320, background: readOnly ? "#f9f9f9" : "#fff" }}
  />
);

export default RichTextEditor;

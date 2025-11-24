import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

// Tools
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import Raw from "@editorjs/raw";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";

const EditorComponent = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a heading",
              levels: [1, 2, 3, 4, 5, 6], // H1 → H6
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote’s author",
            },
          },
          code: {
            class: Code,
            inlineToolbar: false,
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 2,
            },
          },
          raw: Raw, // raw HTML block
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "http://localhost:8000/fetchUrl", // must create backend API to fetch metadata
            },
          },
          image: {
            class: ImageTool,
            config: {
              /**
               * Backend endpoint for image upload
               * You must implement this API to accept files and return { success: 1, file: { url: "..." } }
               */
              endpoints: {
                byFile: "http://localhost:8000/uploadFile", // upload from computer
                byUrl: "http://localhost:8000/fetchUrl", // add by link
              },
            },
          },
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="editorjs"
      className="p-4 border rounded-lg bg-gray-50 min-h-[300px]"
    />
  );
};

export default EditorComponent;

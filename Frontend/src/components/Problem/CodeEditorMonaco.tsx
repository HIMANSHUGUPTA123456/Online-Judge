import React, { useEffect, useRef } from "react";
import Editor, { loader, OnMount } from "@monaco-editor/react";
import { editor as monacoEditor } from "monaco-editor";
import { useTheme } from "../provider/theme-provider";

loader.init().then((monaco) => {
  monaco.editor.defineTheme("cd-game", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "ffa500", fontStyle: "italic" },
      { token: "keyword", foreground: "00ff00" },
      { token: "number", foreground: "ff00ff" },
      { token: "string", foreground: "0000ff" },
    ],
    colors: {
      "editor.foreground": "#F8F8F2",
      "editor.background": "#282A36",
      "editorCursor.foreground": "#FFFAAA",
      "editor.lineHighlightBackground": "#3E3D32",
      "editorLineNumber.foreground": "#8B8B8B",
      "editor.selectionBackground": "#FF5F7F",
      "editor.inactiveSelectionBackground": "#FF5F7F99",
    },
  });

  monaco.editor.defineTheme("cd-rose", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "657b83", fontStyle: "italic" },
      { token: "keyword", foreground: "859900" },
      { token: "number", foreground: "2aa198" },
      { token: "string", foreground: "2aa198" },
    ],
    colors: {
      "editor.foreground": "#657B83",
      "editor.background": "#FDF6E3",
      "editorCursor.foreground": "#DC322F",
      "editor.lineHighlightBackground": "#EEE8D5",
      "editorLineNumber.foreground": "#93A1A1",
      "editor.selectionBackground": "#073642",
      "editor.inactiveSelectionBackground": "#07364299",
    },
  });
});

const CodeEditor = ({
  lang,
  setCode,
  code,
  activetheme,
}: {
  code: string;
  lang: string;
  activetheme: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}) => {
  const {theme}=useTheme()
  useEffect(() => {}, [lang,theme]);
  const editorRef = useRef<monacoEditor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    //console.log("Monaco editor mounted: ", monaco);
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  return (
    <Editor
      className="h-full w-full bg-gray-200 rounded-lg overflow-hidden"
      height={300}
      theme={activetheme}
      language={lang}
      value={code}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;

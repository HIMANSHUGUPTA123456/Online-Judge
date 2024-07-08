import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const EditorComponent = ({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}) => {
  return (
    <div
      style={{ border: "1px solid #ddd", padding: "10px", minHeight: "200px" }}
    >
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default EditorComponent;

import { Reenie_Beanie } from "next/font/google";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";

import ExampleTheme from "./plugins/ArtboardTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

const Artboard = ({ content }: any) => {
  const [editorState, setEditorState] = useState();
  function onChange(editorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  return (
    <LexicalComposer
      initialConfig={{
        editorState: content,
        namespace: "myeditor",
        nodes: [ListNode, ListItemNode],
        onError(error: Error) {
          throw error;
        },
        theme: ExampleTheme,
      }}
    >
      <div className={`editor-container`}>
        <ToolbarPlugin />
        <div className={`editor-inner ${reenie.className}`}>
          <RichTextPlugin
            placeholder={<></>}
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <ListPlugin />
          <CheckListPlugin />
          <HistoryPlugin />
          <MyOnChangePlugin onChange={onChange} />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Artboard;

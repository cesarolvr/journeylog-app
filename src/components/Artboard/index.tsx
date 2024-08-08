// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";

import { Reenie_Beanie } from "next/font/google";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

import ExampleTheme from "./plugins/ArtboardTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const onChange = (
  editorState: any,
  prevEditorState: any,
  setters: any,
  setContent: Function = (f: any) => f
) => {
  editorState.read(() => {
    const newStateString = JSON.stringify(editorState.toJSON());
    const currentState = JSON.stringify(prevEditorState.toJSON());

    if (newStateString != currentState) {
      setContent(newStateString);
    }
  });
};

const InitialStatePlugin = ({ content }) => {
  // const key = Math.random().toString(16).slice(2);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content) {
      const initialEditorState = editor.parseEditorState(JSON.parse(content));
      // console.log(initialEditorState);
      editor.setEditorState(initialEditorState)
    }
  }, [content]);

  return null;
};

const Artboard = ({ content, setContent }: any) => {
  // useEffect(() => {
  //   debugger
  // }, [setContent])

  return (
    <LexicalComposer
      // key={key}
      initialConfig={{
        editorState:
          content ||
          `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`,
        namespace: "myeditor",
        nodes: [ListNode, ListItemNode],
        onError(error: Error) {
          throw error;
        },
        theme: ExampleTheme,
      }}
    >
      <div className={`editor-container ${reenie.className}`}>
        <ToolbarPlugin />
        <div className={`editor-inner`}>
          <RichTextPlugin
            placeholder={
              <div className="editor-placeholder">
                what did you do this day?
              </div>
            }
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <ListPlugin />
          <CheckListPlugin />
          <HistoryPlugin />
          <InitialStatePlugin content={content} />
          <OnChangePlugin
            onChange={(newState, prevState, setters) => {
              onChange(newState, prevState, setters, setContent);
            }}
          />
          {/* <AutoFocusPlugin /> */}
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Artboard;

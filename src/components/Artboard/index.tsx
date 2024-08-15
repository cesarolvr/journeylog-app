import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";

import { Reenie_Beanie } from "next/font/google";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

import ExampleTheme from "./plugins/ArtboardTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import React from "react";
import { $getRoot } from "lexical";

const onChange = (
  editorState: any,
  prevEditorState: any,
  _: any,
  setContent: Function = (f: any) => f
) => {
  editorState.read(() => {
    const newStateString = JSON.stringify(editorState.toJSON());
    const currentState = JSON.stringify(prevEditorState.toJSON());

    const root = $getRoot();
    const isEmpty = root?.isEmpty() && root?.getChildrenSize() === 1;

    if (newStateString != currentState && !isEmpty) {
      setContent(newStateString);
    }
  });
};

const Artboard = ({ setContent, initialState, id }: any) => {
  return (
    <LexicalComposer
      key={id}
      initialConfig={{
        editorState: initialState,
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
          <ClearEditorPlugin />

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

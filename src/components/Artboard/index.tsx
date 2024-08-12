import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
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
import { $getRoot } from "lexical";

const INITIAL_STATE = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

const onChange = (
  editorState: any,
  prevEditorState: any,
  setters: any,
  setContent: Function = (f: any) => f
) => {
  editorState.read(() => {
    const newStateString = JSON.stringify(editorState.toJSON());
    const currentState = JSON.stringify(prevEditorState.toJSON());

    const root = $getRoot();
    const isEmpty =
      root?.getFirstChild()?.isEmpty() && root?.getChildrenSize() === 1;

    if (newStateString != currentState && !isEmpty) {
      setContent(newStateString);
    }
  });
};

const InitialStatePlugin = ({ content, selectedDay }: any) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content) {
      const initialEditorState = editor.parseEditorState(JSON.parse(content));
      editor.setEditorState(initialEditorState);
    } else {
    }
  }, [content]);

  useEffect(() => {
    if (true) {
      const initialEditorState = editor.parseEditorState(
        JSON.parse(INITIAL_STATE)
      );
      editor.setEditorState(initialEditorState);
    }
  }, [selectedDay]);

  return null;
};

const Artboard = ({ content, setContent, selectedDay }: any) => {
  return (
    <LexicalComposer
      initialConfig={{
        editorState: content || INITIAL_STATE,
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
          <InitialStatePlugin content={content} selectedDay={selectedDay} />
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

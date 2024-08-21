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
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";

import { Reenie_Beanie } from "next/font/google";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

import ExampleTheme from "./plugins/ArtboardTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import React from "react";
import { $getRoot } from "lexical";

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_MATCHER =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export const MATCHERS = [
  (text: any) => {
    const match = URL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: match[0],
      }
    );
  },
  (text: any) => {
    const match = EMAIL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: `mailto:${match[0]}`,
      }
    );
  },
];

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
        nodes: [ListNode, ListItemNode, AutoLinkNode, LinkNode],
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
          <AutoLinkPlugin matchers={MATCHERS} />
          <LinkPlugin />
          <AutoFocusPlugin />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Artboard;

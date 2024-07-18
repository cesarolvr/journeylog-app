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

import ExampleTheme from "./components/ExampleTheme";
import ToolbarPlugin from "./components/ToolbarPlugin";

const placeholder = "Enter some rich text...";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [ListNode, ListItemNode],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

export default function App() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={`editor-container`}>
        <ToolbarPlugin />
        <div className={`editor-inner ${reenie.className}`}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <CheckListPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}

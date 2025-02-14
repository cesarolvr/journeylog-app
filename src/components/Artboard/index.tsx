import React from "react";

// Lexical plugins
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
import ToolbarPlugin from "./plugins/ToolbarPlugin";

// Themes
import ExampleTheme from "./plugins/ArtboardTheme";

// Custom hook
import useArtboard from "./hooks";

const Artboard = ({ setContent, initialState, id, font }: any) => {
  // Base methods on custom hook
  const { MATCHERS, onChange } = useArtboard();

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
      <div className={`editor-container ${font.class} font-${font.code}`}>
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
          <br />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Artboard;

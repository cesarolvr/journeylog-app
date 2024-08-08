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
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function MyOnChangePlugin({ onChange }: any) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState, prevEditorState }) => {
      onChange(editorState, prevEditorState);
    });
  }, [editor, onChange]);
  return null;
}

const Artboard = ({ content, setContent, fontClassname }: any) => {
  const onChange = (editorState: any, prevEditorState: any) => {
    const editorStateJSON = editorState.toJSON();
    const currentStateString = JSON.stringify(prevEditorState.toJSON());
    const newStateString = JSON.stringify(editorStateJSON);

    if (currentStateString != newStateString) {
      setContent(newStateString);
    }
  };

  const key = Math.random().toString(16).slice(2);

  return (
    <LexicalComposer
      key={key}
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
      <div className={`editor-container ${fontClassname}`}>
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
          <MyOnChangePlugin onChange={onChange} />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Artboard;

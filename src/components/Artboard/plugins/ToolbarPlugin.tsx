import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { FORMAT_TEXT_COMMAND } from "lexical";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Bold, CheckSquare, Code, HighlighterIcon, Italic, List, ListOrdered, Redo, Strikethrough, Subscript, Superscript, Underline, Undo } from "lucide-react";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({ subsets: ["latin"], weight: "400" });

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");

  const formatList = (listType: any) => {
    if (listType === "number" && blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      setBlockType("number");
    } else if (listType === "bullet" && blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      setBlockType("bullet");
    } else if (listType === "check" && blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
      setBlockType("check");
    } else if (listType === "code" && blockType !== "code") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
      setBlockType("code");
    } else if (listType === "bold" && blockType !== "bold") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      setBlockType("bold");
    } else if (listType === "italic" && blockType !== "italic") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      setBlockType("italic");
    } else if (listType === "underline" && blockType !== "underline") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
      setBlockType("underline");
    } else if (listType === "strikethrough" && blockType !== "strikethrough") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
      setBlockType("strikethrough");
    } else if (listType === "highlight" && blockType !== "highlight") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
      setBlockType("highlight");
    } else if (listType === "subscript" && blockType !== "subscript") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
      setBlockType("subscript");
    } else if (listType === "superscript" && blockType !== "superscript") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
      setBlockType("superscript");
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      setBlockType("paragraph");
    }
  };

  const formatText = (formatType: any) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className={`toolbar ${nunito.className} flex mb-1 rounded-xl pr-[10px] align-middle sticky md:top-[115px] top-[110px] z-[9]`}
      ref={toolbarRef}
    >
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <Undo />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <Redo />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "bullet",
        })}
        onClick={() => formatList("bullet")}
        aria-label="Bullet List"
      >
        <List />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "number",
        })}
        onClick={() => formatList("number")}
        aria-label="Numbered List"
      >
        <ListOrdered />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "check",
        })}
        onClick={() => formatList("check")}
        aria-label="Check List"
      >
        <CheckSquare />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "code",
        })}
        onClick={() => {
          formatList("code");
        }}
        aria-label="Code"
      >
        <Code />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "bold",
        })}
        onClick={() => formatList("bold")}
        aria-label="Bold"
      >
        <Bold />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "italic",
        })}
        onClick={() => formatList("italic")}
        aria-label="Italic"
      >
        <Italic />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "underline",
        })}
        onClick={() => formatList("underline")}
        aria-label="Underline"
      >
        <Underline />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "strikethrough",
        })}
        onClick={() => formatList("strikethrough")}
        aria-label="Strikethrough"
      >
        <Strikethrough />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "highlight",
        })}
        onClick={() => formatList("highlight")}
        aria-label="Highlight"
      >
        <HighlighterIcon />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "subscript",
        })}
        onClick={() => formatList("subscript")}
        aria-label="Subscript"
      >
        <Subscript />
      </button>
      <button
        disabled={false}
        className={classNames("toolbar-item spaced", {
          active: blockType === "superscript",
        })}
        onClick={() => formatList("superscript")}
        aria-label="Superscript"
      >
        <Superscript />
      </button>
    </div>
  );
}

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

const useArtboard = () => {
  const URL_MATCHER =
    /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  const EMAIL_MATCHER =
    /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  const MATCHERS = [
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

  return {
    MATCHERS,
    onChange,
  };
};

export default useArtboard;

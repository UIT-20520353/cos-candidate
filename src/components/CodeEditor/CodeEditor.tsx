import Editor from "@monaco-editor/react";
import { useState } from "react";

type IProps = {
  code: string;
  theme: string;
  language: string;
  onChange: (code: string, value: string) => void;
};

function CodeEditor(props: IProps) {
  const [value, setValue] = useState(props.code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    if (props.onChange) props.onChange("code", value);
  };

  return (
    <div className="overlay shadow-4xl h-full w-full overflow-hidden rounded-md">
      <Editor
        height="85vh"
        width={`100%`}
        language={props.language || "javascript"}
        value={value}
        theme={props.theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default CodeEditor;

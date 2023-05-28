import { ChangeEvent, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai.js";

function CodeEditor() {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const options = { useWorker: false };

  const handleSubmit = () => {
    console.log(code);
  };

  return (
    <div className={"my-4 w-full rounded-md bg-gray-200 p-3 shadow-md"}>
      <div className={"w-full"}>
        <div className={"mb-4"}>
          <label htmlFor="language-select" className={"mb-2 block text-sm font-medium text-gray-900"}>
            Chọn ngôn ngữ lập trình:
          </label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="c_cpp">C/C++</option>
            <option value="java">Java</option>
          </select>
        </div>
        <AceEditor
          mode={language}
          theme="monokai"
          width="100%"
          height="600px"
          value={code}
          name={"code-editor"}
          onChange={handleEditorChange}
          setOptions={options}
        />
      </div>
      <button
        type={"button"}
        className={"mt-3 w-full rounded-md bg-[#023e8a] px-5 py-2 text-white duration-200 hover:bg-[#0247A1]"}
        onClick={handleSubmit}
      >
        Nộp bài
      </button>
    </div>
  );
}

export default CodeEditor;

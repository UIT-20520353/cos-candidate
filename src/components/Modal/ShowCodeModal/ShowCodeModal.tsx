import Editor from "@monaco-editor/react";
import ModalPortal from "~/components/ModalPortal";

type IProps = {
  language: string;
  code: string;
  closeModal: () => void;
};

const getValueLanguage = (language: string): string => {
  switch (language) {
    case "C++":
      return "cpp";
    case "NodeJS":
      return "javascript";
    case "Python":
      return "python";
    case "C":
      return "c";
    case "C#":
      return "csharp";
    case "Java":
      return "java";
    default:
      return "javascript";
  }
};

function ShowCodeModal(props: IProps) {
  return (
    <ModalPortal>
      <div className={"fixed left-0 top-0 z-40 h-screen w-full bg-black opacity-50"}></div>
      <div
        className={
          "fixed left-1/2 top-1/2 z-50 grid max-h-[95%] w-3/5 -translate-x-1/2 -translate-y-1/2 gap-y-5 overflow-y-auto rounded-md bg-white p-5"
        }
      >
        <p className={"text-lg font-semibold"}>Code đã nộp</p>
        {/*<p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>{props.code}</p>*/}
        <Editor
          height={"75vh"}
          width={`100%`}
          language={getValueLanguage(props.language)}
          theme={"vs-dark"}
          defaultValue={props.code}
        />
        <button
          className={
            "w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70 focus:outline-none"
          }
          type={"button"}
          onClick={props.closeModal}
        >
          Đóng
        </button>
      </div>
    </ModalPortal>
  );
}

export default ShowCodeModal;

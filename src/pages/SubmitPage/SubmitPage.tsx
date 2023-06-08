import CodeEditor from "../../components/CodeEditor";
import { ILanguageOption, languageOptions } from "../../constants/languageOptions";
import { useState } from "react";
import LanguagesDropdown from "../../components/LanguagesDropdown";
import axios from "axios";
import Swal from "sweetalert2";
import { IResponseSubmission } from "../../types/submission.type";
import { useParams } from "react-router-dom";
import { getProblemsById } from "../../Query/api/problem-service";
import { IProblem } from "../../types/problem.type";
import { ITestcase } from "../../types/testcase.type";
import { getTestcaseList } from "../../Query/api/testcase-service";
import { insertSubmission } from "../../Query/api/submission-service";

const javascriptDefault = `// Nhập code ở đây`;

const getIdNumber = (id: string | undefined): number => {
  if (!id) return -1;

  const temp = id.split("-");
  return parseInt(temp[1]);
};

function SubmitPage() {
  const { idProblem } = useParams<{ idProblem: string }>();
  const [language, setLanguage] = useState<ILanguageOption>(languageOptions[0]);
  const [code, setCode] = useState<string>(javascriptDefault);

  const onSelectChange = (sl: ILanguageOption) => {
    setLanguage(sl);
  };
  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const compileCode = async (input: string): Promise<IResponseSubmission> => {
    const formData = {
      language: language.value,
      input: input,
      code: code
    };
    const options = {
      method: "POST",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    };

    try {
      return await axios.request<IResponseSubmission, any>(options);
    } catch (err) {
      console.log(err);
      return err as IResponseSubmission;
    }
  };

  const handleSubmit = async () => {
    Swal.fire({
      title: "Đang chấm điểm",
      allowOutsideClick: false,
      showConfirmButton: false,
      position: "center",
      didOpen() {
        Swal.showLoading();
      }
    });

    const problem: IProblem[] | undefined = await getProblemsById(getIdNumber(idProblem));
    if (!problem) {
      Swal.close();
      return;
    }

    const response = await compileCode(problem[0].example_input);

    if (response.data.error !== "") {
      await insertSubmission(
        "Compilation Error",
        language.label,
        code,
        getIdNumber(idProblem),
        parseInt(sessionStorage.getItem("id") ?? "-1")
      );
      Swal.close();
      return;
    }

    if (response.data.output !== problem[0].example_output) {
      await insertSubmission(
        "Wrong Answer",
        language.label,
        code,
        getIdNumber(idProblem),
        parseInt(sessionStorage.getItem("id") ?? "-1")
      );
      Swal.close();
      return;
    }

    const testcases: ITestcase[] | undefined = await getTestcaseList(getIdNumber(idProblem));
    if (!testcases) {
      await insertSubmission(
        "Accepted",
        language.label,
        code,
        getIdNumber(idProblem),
        parseInt(sessionStorage.getItem("id") ?? "-1")
      );
      Swal.close();
      return;
    }

    for (const testcase of testcases) {
      const res = await compileCode(testcase.input);

      if (res.data.error !== "") {
        await insertSubmission(
          "Compilation Error",
          language.label,
          code,
          getIdNumber(idProblem),
          parseInt(sessionStorage.getItem("id") ?? "-1")
        );
        Swal.close();
        return;
      }
      if (res.data.output !== testcase.output) {
        await insertSubmission(
          "Wrong Answer",
          language.label,
          code,
          getIdNumber(idProblem),
          parseInt(sessionStorage.getItem("id") ?? "-1")
        );
        Swal.close();
        return;
      }
    }

    await insertSubmission(
      "Accepted",
      language.label,
      code,
      getIdNumber(idProblem),
      parseInt(sessionStorage.getItem("id") ?? "-1")
    );
    Swal.close();
  };

  return (
    <div className={"mb-4 mt-2"}>
      <div className="py-2">
        <LanguagesDropdown onSelectChange={onSelectChange} />
      </div>
      <div className="flex flex-col items-start py-3">
        <div className="flex h-full w-full flex-col items-start justify-start">
          <CodeEditor code={code} onChange={onChange} language={language?.valueForCodeEditor} theme={"vs-dark"} />
        </div>
        <div className={"w-full"}>
          <button
            onClick={handleSubmit}
            className={
              "mt-4 w-full rounded-md border-2 border-white bg-[#0077b6] py-2 text-white duration-300 hover:bg-[#023e8a] hover:text-white"
            }
          >
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitPage;

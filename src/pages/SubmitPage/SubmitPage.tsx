import CodeEditor from "~/components/CodeEditor";
import { ILanguageOption, languageOptions } from "~/constants/languageOptions";
import { useEffect, useState } from "react";
import LanguagesDropdown from "~/components/LanguagesDropdown";
import { IProblem } from "~/types";
import { useNavigate, useParams } from "react-router-dom";
import { getProblemsById, handleSubmit } from "~/Query";
import { useSessionStorage } from "~/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingModal } from "~/components";
import { toast } from "react-toastify";

const javascriptDefault = `// Nhập code ở đây`;

function SubmitPage() {
  const navigate = useNavigate();
  const [user] = useSessionStorage("cos-candidate", null);
  const { idProblem } = useParams<{ idProblem: string }>();
  const [language, setLanguage] = useState<ILanguageOption>(languageOptions[0]);
  const [code, setCode] = useState<string>(javascriptDefault);

  useEffect(() => {
    document.title = "Nộp bài";
  }, []);

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

  const { data: problem, isLoading: isFetchingProblem } = useQuery({
    queryKey: ["problem", Number(idProblem) || -1],
    queryFn: () => {
      return getProblemsById(Number(idProblem) || -1);
    }
  });

  const { mutate: mutateSubmit, isLoading } = useMutation({
    mutationFn: (body: IProblem) => {
      return handleSubmit(body, language, code, user.id, problem?.id);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Nộp bài thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      } else {
        toast("Xảy ra lỗi khi nộp bài", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });

  const submitClick = async () => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    mutateSubmit(problem);
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
            onClick={submitClick}
            className={
              "mt-4 w-full rounded-md border-2 border-white bg-[#0077b6] py-2 text-white duration-300 hover:bg-[#023e8a] hover:text-white"
            }
            disabled={isLoading || isFetchingProblem}
          >
            Nộp bài
          </button>
        </div>
      </div>
      {isLoading && <LoadingModal title={"Đang chấm điểm"} />}
    </div>
  );
}

export default SubmitPage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IProblem } from "../../types/problem.type";
import { getProblemsById } from "../../Query/api/problem-service";

const getIdNumber = (contest_id: string) => {
  let temp: string[] = [];
  if (contest_id) {
    temp = contest_id.split("-");
  }

  return parseInt(temp[1]);
};

function DetailProblem() {
  const { idProblem, idContest } = useParams<{ idProblem: string; idContest: string }>();
  const initialProblem: IProblem = {
    id: getIdNumber(idProblem),
    name: "",
    detail: "",
    example_input: "",
    example_output: "",
    contest_id: getIdNumber(idContest)
  };
  const [problem, setProblem] = useState<IProblem>(initialProblem);

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const problem_id = getIdNumber(idProblem);
    const dataProblem = await getProblemsById(problem_id);
    if (dataProblem && dataProblem.length !== 0) {
      setProblem(dataProblem[0] ?? initialProblem);
    }

    Swal.close();
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className={"my-8 w-full"}>
      <div className={"flex w-full flex-row items-start justify-between gap-3 text-center"}>
        <p className={"flex-1 text-3xl font-medium text-[#10002b]"}>{problem.name}</p>
      </div>
      <div className={"mt-4 grid w-full gap-y-3 rounded-md bg-gray-100 p-3 shadow-md"}>
        <div className={"w-full"}>
          <p className={"text-xl font-semibold"}>Đề bài</p>
          <p className={"whitespace-pre-line text-base font-normal"}>{problem.detail}</p>
        </div>
        <div className={"flex w-full flex-col items-start gap-y-4"}>
          <div className={"w-full"}>
            <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Input mẫu</span>
            <p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>
              {problem.example_input}
            </p>
          </div>
          <div className={"w-full"}>
            <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Output mẫu</span>
            <p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>
              {problem.example_output}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProblem;

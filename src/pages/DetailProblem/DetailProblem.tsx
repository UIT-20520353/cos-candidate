import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProblemsById } from "~/Query";
import DetailProblemSkeleton from "~/skeletons/detail-problem-skeleton";
import { useQuery } from "@tanstack/react-query";

function DetailProblem() {
  const { idProblem } = useParams<{ idProblem: string; idContest: string }>();

  const { data: problem, isLoading: isFetchingProblem } = useQuery({
    queryKey: ["problem", Number(idProblem) || -1],
    queryFn: () => {
      return getProblemsById(Number(idProblem) || -1);
    }
  });

  useEffect(() => {
    document.title = "Chi tiết đề thi";
  }, []);

  if (isFetchingProblem) return <DetailProblemSkeleton />;
  return (
    <div className={"my-8 w-full"}>
      <div className={"flex w-full flex-row items-start justify-between gap-3 text-center"}>
        <p className={"flex-1 text-3xl font-medium text-[#10002b]"}>{problem?.name}</p>
      </div>
      <div className={"mt-4 grid w-full gap-y-3 rounded-md bg-gray-100 p-3 shadow-md"}>
        <div className={"w-full"}>
          <p className={"text-xl font-semibold"}>Đề bài</p>
          <p className={"whitespace-pre-line text-base font-normal"}>{problem?.detail}</p>
        </div>
        <div className={"flex w-full flex-col items-start gap-y-4"}>
          <div className={"w-full"}>
            <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Input mẫu</span>
            <p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>
              {problem?.example_input}
            </p>
          </div>
          <div className={"w-full"}>
            <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Output mẫu</span>
            <p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>
              {problem?.example_output}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProblem;

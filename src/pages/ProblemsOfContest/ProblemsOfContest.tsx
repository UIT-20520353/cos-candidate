import Header from "~/components/Header";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDataProblemOfContest } from "~/Query/problem-of-contest";
import { getContestById } from "~/Query";
import OverviewProblem from "~/components/OverviewProblem";
import ProblemsOfContestSkeleton from "~/skeletons/problems-of-contest-skeleton";

function ProblemsOfContest() {
  const { id } = useParams<{ id: string }>();
  const { data: dataProblems, isLoading: isFetchingProblems } = useQuery({
    queryKey: ["problem-list", `contest-${Number(id) || -1}`],
    queryFn: () => {
      return fetchDataProblemOfContest(Number(id) || -1);
    }
  });
  const { data: contest, isLoading: isFetchingContest } = useQuery({
    queryKey: ["contest", Number(id) || -1],
    queryFn: () => {
      return getContestById(Number(id) || -1);
    }
  });

  useEffect(() => {
    document.title = "Danh sách đề thi";
  }, []);

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <div className={"flex w-full flex-row items-center justify-between"}>
          <p className={"text-2xl font-medium text-[#10002b]"}>Các đề bài của cuộc thi {contest?.name}</p>
          <NavLink
            className={"rounded-md bg-gray-200 px-5 py-2 font-medium shadow-md duration-300 hover:bg-gray-300"}
            to={"/contest/list/registered"}
          >
            Quay lại
          </NavLink>
        </div>

        {(isFetchingContest || isFetchingProblems) && <ProblemsOfContestSkeleton />}
        {!isFetchingContest && !isFetchingProblems && (
          <div>
            {dataProblems?.length !== 0 ? (
              <ul className={"mt-5 grid w-full grid-cols-3 gap-3"}>
                {dataProblems?.map((problem) => (
                  <OverviewProblem key={`problem-${problem.id}`} problem={problem} />
                ))}
              </ul>
            ) : (
              <p>Không có đề thi</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemsOfContest;

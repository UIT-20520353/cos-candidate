import Header from "~/components/Header";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getContestById } from "~/Query/api/contest-service";
import { useQuery } from "@tanstack/react-query";
import { fetchDataRankContest } from "~/Query";
import RankContestSkeleton from "~/skeletons/rank-contest-skeleton";

function RankContest() {
  const { idContest } = useParams<{ idContest: string }>();

  const { data: contest, isLoading: isFetchingContest } = useQuery({
    queryKey: ["contest", Number(idContest) || -1],
    queryFn: () => {
      return getContestById(Number(idContest) || -1);
    }
  });

  const { data, isLoading: isFetchingData } = useQuery({
    queryKey: ["rank-contest", Number(idContest) || -1],
    queryFn: () => {
      return fetchDataRankContest(Number(idContest) || -1);
    }
  });

  console.log(data);

  useEffect(() => {
    document.title = "Kết quả cuộc thi";
  }, []);

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      {(isFetchingContest || isFetchingData) && <RankContestSkeleton />}
      {!isFetchingContest && !isFetchingData && (
        <div className={"my-8 w-4/5"}>
          <div className={"flex flex-row items-center justify-between"}>
            <p className={"text-lg font-medium"}>Bảng xếp hạng của cuộc thi {contest?.name}</p>
            {/*<NavLink*/}
            {/*  className={*/}
            {/*    "inline-block rounded-md bg-gray-300 px-6 py-2 text-base font-medium shadow-md duration-300 hover:bg-gray-200"*/}
            {/*  }*/}
            {/*  to={"/contest/list/registered"}*/}
            {/*>*/}
            {/*  Quay lại*/}
            {/*</NavLink>*/}
          </div>
          <div className={"mt-5 max-h-[550px] w-[1250px] overflow-y-scroll"}>
            <table className="table-auto border-separate border-spacing-1 text-center text-sm text-gray-500">
              <thead className="bg-gray-200 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="min-w-[80px] rounded border border-slate-600 px-6 py-3">
                    Hạng
                  </th>
                  <th scope="col" className="w-full min-w-[384px] rounded border border-slate-600 px-6 py-3">
                    Tên đội
                  </th>
                  {data?.problems.map((problem) => {
                    return (
                      <th
                        key={`header-problem-${problem.id}`}
                        scope="col"
                        className="min-w-[224px] rounded border border-slate-600 px-6 py-3"
                      >
                        {problem.name}
                      </th>
                    );
                  })}
                  <th scope="col" className="min-w-[128px] rounded border border-slate-600 px-6 py-3">
                    Tổng số giải được
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.teams.map((team, index) => {
                  let count = 0;
                  return (
                    <tr key={`rank-row-${index}`} className={`border-b bg-white`}>
                      <th
                        scope="row"
                        className={`whitespace-nowrap rounded border border-black px-3 py-1 font-medium text-black`}
                      >
                        {index + 1}
                      </th>
                      <td className="rounded border border-black px-3 py-1 text-base font-medium text-black">
                        {team.team_name}
                      </td>
                      {data?.problems.map((problem, index2) => {
                        const status = data?.result[`${team.team_id}-${problem.id}`];
                        if (status === "Accepted") count++;
                        return (
                          <td key={`row-${index}-${index2}`} className="text-base font-bold text-black">
                            <div
                              className={`flex h-10 w-full items-center justify-center rounded-md ${
                                status === "Accepted" && "bg-green-600"
                              } ${status === "Wrong answer" && "bg-yellow-300"} ${
                                status === "Not submit" && "bg-gray-200"
                              }`}
                            >
                              <p>{status}</p>
                            </div>
                          </td>
                        );
                      })}
                      <td className="rounded border border-black px-3 py-1 text-base font-medium text-black">
                        {count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default RankContest;

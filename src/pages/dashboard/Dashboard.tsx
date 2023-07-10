import Header from "~/components/Header";
import { IContestDashboard, IContestForRanking } from "~/types/contest.type";
import { getDateAndTime } from "~/utils/ValidateDate/ValidateDate";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardSkeleton from "~/skeletons/dashboard-skeleton";
import { useEffect } from "react";
import { getContestListDashboard, getContestsForRanking } from "~/Query";

type IProps = {
  contest: IContestDashboard;
  dateDisplay: string;
};

function Notification(props: IProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (sessionStorage.getItem("id") == null) navigate("/login");
    else navigate(`/contest/list/register/contest-${props.contest.id}`);
  };

  return (
    <div className={"w-full"}>
      <button className={"cursor-pointer text-xl font-medium text-blue-950 hover:text-blue-800"} onClick={handleClick}>
        {props.contest.name}
      </button>
      <p className={"text-lg"}>
        <span className={"text-black"}>{props.contest.host_name}</span>, ngày {props.dateDisplay}
      </p>
    </div>
  );
}

function RowItem(props: { row: IContestForRanking; stt: number }) {
  return (
    <tr className="border border-black bg-stone-200">
      <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
        {props.stt + 1}
      </th>
      <td className="px-6 py-4">{props.row.name}</td>
      <td className="px-6 py-4">{props.row.amount}</td>
    </tr>
  );
}

function Dashboard() {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  const { data: contests, isLoading: isFetchingContests } = useQuery({
    queryKey: ["dashboard", "contest-list"],
    queryFn: getContestListDashboard
  });
  const { data: rankings, isLoading: isFetchingRankings } = useQuery({
    queryKey: ["dashboard", "ranking-list"],
    queryFn: getContestsForRanking
  });

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />

      {(isFetchingRankings || isFetchingContests) && <DashboardSkeleton />}
      {!isFetchingContests && !isFetchingRankings && (
        <div className={"mt-8 flex w-4/5 flex-row items-start gap-x-5"}>
          <div className={"flex w-3/5 flex-col items-start gap-y-7"}>
            <p className={"-mb-2 text-2xl font-medium"}>Các cuộc thi sắp diễn ra</p>
            {contests?.map((contest) => {
              const current_date = new Date();
              const { year, month, day, hour, minute, second } = getDateAndTime(contest.date_begin, contest.time_begin);

              const time_begin = new Date(year, month, day, hour, minute, second);
              if (time_begin > current_date)
                return (
                  <Notification
                    dateDisplay={`${day}/${month + 1}/${year}`}
                    key={`notification-${contest.id}`}
                    contest={contest}
                  />
                );
            })}
          </div>
          <div className={"flex flex-1 flex-col items-center gap-y-5"}>
            <div className={"w-full rounded-md border-gray-300 bg-gray-200 p-3 shadow-md"}>
              <p className={"text-xl font-semibold text-blue-950"}>Bảng xếp hạng các cuộc thi</p>

              <div className="overflow-x-auto">
                <table className="mt-3 w-full text-left text-sm text-gray-500">
                  <thead className="border border-black bg-stone-100 text-xs uppercase text-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Hạng
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tên cuộc thi
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Số đội tham gia
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings?.map((ranking, index) => {
                      if (index >= 5) return;
                      return <RowItem row={ranking} stt={index} key={`ranking-${ranking.id}`} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

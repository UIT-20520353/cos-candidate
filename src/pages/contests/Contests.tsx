import Header from "../../components/Header";
import OverviewContest from "../../components/OverviewContest";
import { IContest } from "../../types/contest.type";
import { useEffect, useState } from "react";
import { getContestList } from "../../Query/api/contest-service";

function Contests() {
  const [contests, setContests] = useState<IContest[]>([]);

  useEffect(() => {
    getContestList().then((data) => {
      setContests(data ?? []);
    });
  }, []);

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Tất cả các cuộc thi</p>
        <ul className={"mt-5 grid grid-cols-3 gap-4"}>
          {contests.map((contest) => (
            <OverviewContest amount={6} key={`contest-${contest.id}`} contest={contest} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contests;

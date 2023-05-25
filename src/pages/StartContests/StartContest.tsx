import Header from "../../components/Header";
import OverviewContest from "../../components/OverviewContest";
import { IOverviewContest } from "../../types/contest.type";
import { useState } from "react";

const initialContest: IOverviewContest[] = [
  {
    id: "question-1-2",
    name: "Beginner Free Contest 51",
    amount: 32,
    date: "2023-06-02",
    time: "10:00",
    duration: "2 giờ",
    registered: false
  }
];

function StartContest() {
  const [registeredContests, setRegisteredContests] = useState<IOverviewContest[]>(initialContest);

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Các cuộc thi đã đăng ký</p>
        <ul className={"mt-5 grid grid-cols-3 gap-4"}>
          {registeredContests.map((contest) => (
            <OverviewContest
              key={contest.id}
              id={contest.id}
              name={contest.name}
              amount={contest.amount}
              date={contest.date}
              time={contest.time}
              duration={contest.duration}
              registered={contest.registered}
              isBeginContest={true}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StartContest;

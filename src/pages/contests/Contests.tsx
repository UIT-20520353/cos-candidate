import Header from "../../components/Header";
import OverviewContest from "../../components/OverviewContest";
import { IOverviewContest, IStatus } from "../../types/contest.type";
import { useState } from "react";
import Checkbox from "../../components/Checkbox";

const tamplateContests: IOverviewContest[] = [
  {
    id: "question-1-2",
    name: "Beginner Free Contest 51",
    amount: 32,
    date: "2023-06-02",
    time: "10:00"
  },
  {
    id: "question-2-3",
    name: "Testing Round 49",
    amount: 25,
    date: "2023-05-18",
    time: "14:00"
  },
  {
    id: "question-4-3",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 50,
    date: "2023-04-30",
    time: "05:00"
  },
  {
    id: "question-5-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-07-12",
    time: "08:00"
  }
];

function Contests() {
  const [filter, setFilter] = useState<IStatus>({ notStarted: false, playing: false, played: false });

  const playedClick = () => {
    setFilter((prevState) => ({ ...prevState, played: !prevState.played }));
  };
  const playingClick = () => {
    setFilter((prevState) => ({ ...prevState, playing: !prevState.playing }));
  };
  const notStartedClick = () => {
    setFilter((prevState) => ({ ...prevState, notStarted: !prevState.notStarted }));
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Tất cả các cuộc thi</p>
        <div className={"mt-5 flex flex-row items-center gap-x-8"}>
          <Checkbox title={"Đã kết thúc"} status={filter.played} handleClick={playedClick} />
          <Checkbox title={"Đang diễn ra"} status={filter.playing} handleClick={playingClick} />
          <Checkbox title={"Chưa bắt đầu"} status={filter.notStarted} handleClick={notStartedClick} />
        </div>
        <ul className={"mt-5 grid grid-cols-3 gap-4"}>
          {tamplateContests.map((contest) => (
            <OverviewContest
              key={contest.id}
              id={contest.id}
              name={contest.name}
              amount={contest.amount}
              date={contest.date}
              time={contest.time}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contests;

import Header from "../../components/Header";
import OverviewContest from "../../components/OverviewContest";
import { IOverviewContest, IStatus } from "../../types/contest.type";
import { useState } from "react";
import Checkbox from "../../components/Checkbox";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const initialContests: IOverviewContest[] = [
  {
    id: "question-1-2",
    name: "Beginner Free Contest 51",
    amount: 32,
    date: "2023-06-02",
    time: "10:00",
    duration: "2 giờ",
    registered: false
  },
  {
    id: "question-2-3",
    name: "Testing Round 49",
    amount: 25,
    date: "2023-05-18",
    time: "14:00",
    duration: "3 giờ",
    registered: false
  },
  {
    id: "question-4-3",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 50,
    date: "2023-04-30",
    time: "05:00",
    duration: "1 giờ 30 phút",
    registered: false
  },
  {
    id: "question-5-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-07-12",
    time: "08:00",
    duration: "3 giờ",
    registered: false
  },
  {
    id: "question-6-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-06-06",
    time: "08:00",
    duration: "3 giờ",
    registered: false
  },
  {
    id: "question-7-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-05-02",
    time: "08:00",
    duration: "3 giờ",
    registered: true
  },
  {
    id: "question-8-2",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-06-01",
    time: "08:00",
    duration: "3 giờ",
    registered: false
  },
  {
    id: "question-9-2",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-05-11",
    time: "10:00",
    duration: "1 giờ 30 phút",
    registered: false
  },
  {
    id: "question-10-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-06-01",
    time: "08:00",
    duration: "3 giờ",
    registered: true
  }
];

function Contests() {
  const user = useSelector((state: RootState) => state.user);
  const [contests, setContests] = useState<IOverviewContest[]>(initialContests);
  const [filter, setFilter] = useState<IStatus>({
    notStarted: false,
    playing: false,
    played: false,
    registered: false
  });

  const playedClick = () => {
    setFilter((prevState) => ({ ...prevState, played: !prevState.played }));
    if (!filter.played) {
      const temp = initialContests.filter((contest) => {
        const dateBegin = new Date(`${contest.date}T${contest.time}`);
        const current = new Date();

        if (current > dateBegin) return contest;
      });
      setContests(temp);
    } else {
      const temp = [...initialContests];
      setContests(temp);
    }
  };
  const playingClick = () => {
    setFilter((prevState) => ({ ...prevState, playing: !prevState.playing }));
  };
  const notStartedClick = () => {
    setFilter((prevState) => ({ ...prevState, notStarted: !prevState.notStarted }));
  };
  const registeredClick = () => {
    setFilter((prevState) => ({ ...prevState, registered: !prevState.registered }));
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Tất cả các cuộc thi</p>
        <div className={"mt-5 flex flex-row items-center gap-x-8"}>
          <Checkbox title={"Đã kết thúc"} status={filter.played} handleClick={playedClick} />
          <Checkbox title={"Đang diễn ra"} status={filter.playing} handleClick={playingClick} />
          <Checkbox title={"Chưa bắt đầu"} status={filter.notStarted} handleClick={notStartedClick} />
          {user.id && <Checkbox title={"Đã đăng ký"} status={filter.registered} handleClick={registeredClick} />}
        </div>
        <ul className={"mt-5 grid grid-cols-3 gap-4"}>
          {contests.map((contest) => (
            <OverviewContest
              key={contest.id}
              id={contest.id}
              name={contest.name}
              amount={contest.amount}
              date={contest.date}
              time={contest.time}
              duration={contest.duration}
              registered={contest.registered}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contests;

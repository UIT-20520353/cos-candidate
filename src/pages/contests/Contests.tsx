import Header from "../../components/Header";
import OverviewContest from "../../components/OverviewContest";
import { IStatus } from "../../types/contest.type";
import { useState } from "react";
import Checkbox from "../../components/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { cancelRegistration } from "./contests.reducer";

function Contests() {
  const dispatch = useDispatch();
  const contests = useSelector((state: RootState) => state.contests);
  const user = useSelector((state: RootState) => state.user);
  const [filter, setFilter] = useState<IStatus>({
    notStarted: false,
    playing: false,
    played: false,
    registered: false
  });

  const playedClick = () => {
    setFilter((prevState) => ({ ...prevState, played: !prevState.played }));
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

  const handleCancelRegistration = (cancelId: string) => {
    dispatch(cancelRegistration(cancelId));
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
              handleCancelRegistration={handleCancelRegistration}
              isBeginContest={false}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contests;

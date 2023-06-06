import { BiTimeFive, GiDuration, MdDateRange, RiTeamFill } from "react-icons/all";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IContest } from "../../types/contest.type";
import { getDateAndTime, getTimeEnd } from "../../utils/ValidateDate/ValidateDate";
import { RootState } from "../../store";

type IProps = {
  contest: IContest;
  amount: number;
  typeOverview: boolean;
};

function OverviewContest(props: IProps) {
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [dateDisplay, setDateDisplay] = useState<string>("");

  useEffect(() => {
    const current_date = new Date();
    const { year, month, day, hour, minute, second } = getDateAndTime(
      props.contest.date_begin,
      props.contest.time_begin
    );

    const time_begin = new Date(year, month, day, hour, minute, second);
    const time_end = getTimeEnd({ year, month, day, hour, minute, second, duration: props.contest.duration });

    if (time_begin > current_date) setStatus("Chưa bắt đầu");
    else {
      if (time_begin <= current_date && time_end >= current_date) setStatus("Đang diễn ra");
      else {
        setStatus("Đã kết thúc");
      }
    }
    setDateDisplay(`${day}/${month + 1}/${year}`);
  }, []);

  const handleRegisterContestClick = () => {
    if (user.id !== -1) {
      navigate(`/contest/list/register/contest-${props.contest.id}`, { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <li
      id={`contest-${props.contest.id}`}
      key={`contest-${props.contest.id}`}
      className={"rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}
    >
      <p className={"mb-3 truncate text-lg font-semibold"}>{props.contest.name}</p>
      <span
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          status === "Đang diễn ra" ? "bg-[#b7e4c7] text-[#081c15]" : ""
        } ${status === "Đã kết thúc" ? "bg-[#ffb3c1] text-[#590d22]" : ""} ${
          status === "Chưa bắt đầu" ? "bg-[#fff2b2] text-[#710000]" : ""
        }`}
      >
        {status}
      </span>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <RiTeamFill className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.amount} đội tham gia</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <MdDateRange className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{dateDisplay}</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <BiTimeFive className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.contest.time_begin}</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <GiDuration className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.contest.duration}</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        {props.typeOverview ? (
          <div>
            {status !== "Đã kết thúc" && (
              <button
                className={
                  "w-44 rounded-md bg-[#0077b6] px-4 py-2 text-center text-base font-medium text-white duration-300 hover:opacity-70"
                }
                onClick={handleRegisterContestClick}
              >
                Đăng ký tham gia
              </button>
            )}
            {status === "Đã kết thúc" && (
              <NavLink
                className={
                  "w-44 rounded-md bg-[#6c757d] px-4 py-2 text-center text-base font-medium text-white duration-300 hover:opacity-70"
                }
                to={"/"}
              >
                Kết quả
              </NavLink>
            )}
          </div>
        ) : (
          <div>
            <NavLink
              className={
                "inline-block w-44 rounded-md bg-[#0077b6] px-4 py-2 text-center text-base font-medium text-white duration-300 hover:opacity-70"
              }
              to={`/contest/enter/${props.contest.id}`}
            >
              Vào thi
            </NavLink>
          </div>
        )}
      </div>
    </li>
  );
}

export default OverviewContest;

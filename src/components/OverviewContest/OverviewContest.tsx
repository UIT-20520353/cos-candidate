import { BiTimeFive, GiDuration, MdDateRange, RiTeamFill } from "react-icons/all";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IAllContest } from "~/types";
import { getContestStatus } from "~/utils";

type IProps = {
  contest: IAllContest;
  typeOverview: boolean;
};

function OverviewContest(props: IProps) {
  const [status, setStatus] = useState<string>("");
  const [dateDisplay, setDateDisplay] = useState<string>("");

  useEffect(() => {
    const data = getContestStatus(props.contest.date_begin, props.contest.time_begin, props.contest.duration);
    setStatus(data.status);
    setDateDisplay(data.dateDisplay);
  }, []);

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
        <span className={"text-sm text-gray-500"}>{props.contest.amount} đội tham gia</span>
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
              <NavLink
                className={
                  "mr-3 inline-block w-44 rounded-md bg-[#0077b6] px-4 py-2 text-center text-base font-medium text-white duration-300 hover:opacity-70"
                }
                to={`/contest/register/${props.contest.id}`}
              >
                Đăng ký tham gia
              </NavLink>
            )}
            {(status === "Đã kết thúc" || status === "Đang diễn ra") && (
              <NavLink
                className={
                  "inline-block w-44 rounded-md bg-[#6c757d] px-4 py-2 text-center text-base font-medium text-white duration-300 hover:opacity-70"
                }
                to={`/contest/ranking/${props.contest.id}`}
              >
                Kết quả
              </NavLink>
            )}
          </div>
        ) : (
          <div>
            {status === "Đang diễn ra" && (
              <NavLink
                className={
                  "mr-3 inline-block w-44 rounded-md bg-[#0077b6] px-4 py-2 text-center text-base font-medium text-white duration-300 hover:opacity-70"
                }
                to={`/contest/enter/${props.contest.id}`}
              >
                Vào thi
              </NavLink>
            )}
            {(status === "Đang diễn ra" || status === "Đã kết thúc") && (
              <NavLink
                className={
                  "inline-block w-44 rounded-md bg-[#6c757d] px-4 py-2 text-center text-base font-medium text-white duration-300 hover:opacity-70"
                }
                to={`/contest/ranking/${props.contest.id}`}
              >
                Kết quả
              </NavLink>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default OverviewContest;

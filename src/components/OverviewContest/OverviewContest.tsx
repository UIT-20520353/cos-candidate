import { BiTimeFive, MdDateRange, RiTeamFill } from "react-icons/all";
// import { NavLink } from "react-router-dom";
import { IOverviewContest } from "../../types/contest.type";
import { useEffect, useState } from "react";

function OverviewContest(props: IOverviewContest) {
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    const dateBegin = new Date(`${props.date}T${props.time}`);
    const current = new Date();

    if (current > dateBegin) setStatus("Đã kết thúc");
    else setStatus("Chưa bắt đầu");
  }, []);

  const handleClick = () => {
    const dateBegin = new Date(`${props.date}T${props.time}`);
    console.log(dateBegin);
  };
  return (
    <li id={props.id} className={"rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}>
      <p className={"mb-3 truncate text-lg font-medium"}>{props.name}</p>
      <span
        className={`rounded-full ${
          status === "Đã kết thúc" ? "bg-red-200 text-red-900" : "bg-gray-300"
        } px-4 py-2 text-sm font-semibold text-[#081c15]`}
      >
        {status}
      </span>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <RiTeamFill className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.amount} đội tham gia</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <MdDateRange className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.date}</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <BiTimeFive className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.time}</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-3"}>
        <button
          className={`rounded-lg ${
            status === "Đã kết thúc" ? "bg-transparent" : "bg-gray-300 hover:bg-gray-400"
          } px-4 py-2 text-sm font-semibold text-black duration-300`}
          onClick={handleClick}
          disabled={status === "Đã kết thúc"}
        >
          Đăng ký tham gia
        </button>
      </div>
    </li>
  );
}

export default OverviewContest;

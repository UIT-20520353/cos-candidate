import { BiTimeFive, GiDuration, MdDateRange, RiTeamFill } from "react-icons/all";
import { IOverviewContest } from "../../types/contest.type";
import { useEffect, useState, MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type IPlusProps = {
  handleCancelRegistration: (id: string) => void;
};

type IProps = IPlusProps & IOverviewContest;

function OverviewContest(props: IProps) {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

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
  const handleNavlinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!user.id) {
      event.preventDefault();
      navigate("/login", { replace: true });
    }
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
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <GiDuration className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.duration}</span>
      </div>

      {status !== "Đã kết thúc" && (
        <div className={"mt-4"}>
          {!props.registered ? (
            <NavLink
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-black duration-300 ${
                props.registered ? "bg-red-200 text-red-900 hover:bg-red-300" : "bg-gray-300 hover:bg-gray-400"
              }`}
              disabled={status === "Đã kết thúc"}
              to={`/contest/list/register/${props.id}`}
              onClick={handleNavlinkClick}
            >
              Đăng ký tham gia
            </NavLink>
          ) : (
            <div className={"flex flex-row items-center gap-x-3"}>
              <button
                className={`rounded-lg bg-gray-300 px-4 py-2 text-sm font-semibold text-black duration-300 hover:bg-gray-400
                `}
                onClick={handleClick}
              >
                Cập nhật thông tin
              </button>
              <button
                className={
                  "rounded-lg bg-red-300 px-4 py-2 text-sm font-semibold text-red-900 duration-300 hover:bg-red-400"
                }
                onClick={() => props.handleCancelRegistration(props.id)}
              >
                Hủy đăng ký
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default OverviewContest;

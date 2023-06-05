import Header from "../../components/Header";
import { NavLink, useParams } from "react-router-dom";
import OverviewTeam from "../../components/OverviewTeam";
import { AiFillPlusCircle } from "react-icons/all";
import { useEffect, useState } from "react";
import { IContest } from "../../types/contest.type";
import { getContestById } from "../../Query/api/contest-service";

const getContestIdNumber = (id: string | undefined) => {
  let temp: string[] = [];
  if (id) {
    temp = id.split("-");
    return parseInt(temp[1]);
  }
  return -1;
};

function RegisterContest() {
  const { contestId } = useParams<{ contestId: string }>();
  const initialContest: IContest = {
    id: getContestIdNumber(contestId),
    name: "",
    description: "",
    date_begin: "",
    time_begin: "",
    duration: "",
    host_id: null
  };
  const [contest, setContest] = useState<IContest>(initialContest);

  useEffect(() => {
    const contest_id = getContestIdNumber(contestId);
    getContestById(contest_id).then((data) => {
      if (data) {
        setContest(data[0] ?? initialContest);
      }
    });
  }, []);

  const handleCreateTeam = () => {
    return;
  };

  return contest.id !== -1 ? (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 flex w-4/5 flex-col items-start"}>
        <div className={"flex w-full flex-row items-center justify-between"}>
          <p className={"text-2xl font-medium text-[#10002b]"}>Đăng ký tham gia cuộc thi</p>
          <NavLink
            className={"rounded-md bg-gray-200 px-5 py-2 font-medium shadow-md duration-300 hover:bg-gray-300"}
            to={"/contest/list"}
          >
            Quay lại
          </NavLink>
        </div>
        <div className={"mt-5 grid w-full grid-cols-3 gap-2 rounded-md bg-gray-200 p-3 shadow-md"}>
          <p className={"col-span-2 text-lg font-medium uppercase text-black"}>{contest.name}</p>
          <p className={"text-sm font-normal text-black"}>
            Ban tổ chức <span className={"cursor-pointer text-base font-medium hover:underline"}>Free contest</span>
          </p>
          <p className={"text-sm font-normal text-black"}>
            Ngày bắt đầu <span className={"text-base font-medium"}>{contest.date_begin}</span>
          </p>
          <p className={"text-sm font-normal text-black"}>
            Giờ bắt đầu <span className={"text-base font-medium"}>{contest.time_begin}</span>
          </p>
          <p className={"text-sm font-normal text-black"}>
            Diễn ra trong <span className={"text-base font-medium"}>{contest.duration}</span>
          </p>
          <p className={"col-span-3 text-sm font-normal text-black"}>Mô tả của cuộc thi</p>
          <p className={"col-span-3 rounded-md border border-black bg-gray-50 p-2 text-sm font-normal text-black"}>
            {contest.description}
          </p>
        </div>
        <div className={"mt-5 w-full p-3"}>
          <div className={"flex flex-row items-center justify-between"}>
            <p className={"text-lg font-medium text-black"}>Danh sách các đội đã đăng ký</p>
            <button
              className={
                "flex flex-row items-center gap-x-3 rounded-md bg-gray-200 px-4 py-2 shadow-md hover:bg-gray-300"
              }
              onClick={handleCreateTeam}
            >
              <span className={"text-lg font-medium"}>Tạo đội</span>{" "}
              <AiFillPlusCircle className={"inline-block h-6 w-6"} />
            </button>
          </div>
          <ul className={"mt-3 grid grid-cols-3 gap-3"}>
            <OverviewTeam />
            <OverviewTeam />
            <OverviewTeam />
            <OverviewTeam />
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>không lấy được id</p>
    </div>
  );
}

export default RegisterContest;

import Header from "../../components/Header";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function ProblemsOfContest() {
  const { id } = useParams();
  const contests = useSelector((state: RootState) => state.contests);
  const currentContest = contests.find((contest) => contest.id === id);

  return currentContest ? (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <div className={"flex w-full flex-row items-center justify-between"}>
          <p className={"text-2xl font-medium text-[#10002b]"}>Các đề bài của cuộc thi {currentContest.name}</p>
          <NavLink
            className={"rounded-md bg-gray-200 px-5 py-2 font-medium shadow-md duration-300 hover:bg-gray-300"}
            to={"/contest/list/registered"}
          >
            Quay lại
          </NavLink>
        </div>

        <div className={"mt-5 grid w-full grid-cols-3 gap-3"}>
          <div className={"flex flex-col items-start gap-y-2 rounded-md bg-gray-200 p-3 shadow-md"}>
            <p className={"w-full truncate text-lg font-medium"}>Đường đi ngắn nhất Đường đi ngắn nhất Đường đi n</p>
            <p className={"text-sm font-medium"}>
              Số đội giải được <span className={"text-base"}>8</span>
            </p>
            <NavLink
              to={"/problem/detail/problem-1-3/question-1-2"}
              className={
                "inline-block rounded-md bg-[#023e8a] px-5 py-1 text-base font-medium text-white duration-300 hover:bg-[#0077b6]"
              }
            >
              Làm bài
            </NavLink>
          </div>
          <div className={"flex flex-col items-start gap-y-2 rounded-md bg-gray-200 p-3 shadow-md"}>
            <p className={"w-full truncate text-lg font-medium"}>Ghép số</p>
            <p className={"text-sm font-medium"}>
              Số đội giải được <span className={"text-base"}>11</span>
            </p>
            <NavLink
              to={"/problem/detail/problem-2-5/question-1-2"}
              className={
                "inline-block rounded-md bg-[#023e8a] px-5 py-1 text-base font-medium text-white duration-300 hover:bg-[#0077b6]"
              }
            >
              Làm bài
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>không lấy được id</p>
    </div>
  );
}

export default ProblemsOfContest;

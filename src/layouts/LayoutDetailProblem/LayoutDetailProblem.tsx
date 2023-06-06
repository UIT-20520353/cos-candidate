import Header from "../../components/Header";
import { NavLink, Outlet, useParams } from "react-router-dom";

const getContestIdNumber = (contest_id: string | undefined) => {
  if (!contest_id) return -1;

  const temp = contest_id.split("-");
  return parseInt(temp[1]);
};

function LayoutDetailProblem() {
  const { idProblem, idContest } = useParams<{ idProblem: string; idContest: string }>();

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <div className={"flex flex-row items-center"}>
          <NavLink
            to={`/problem/detail/${idProblem}/${idContest}`}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
            end={true}
          >
            Đề bài
          </NavLink>
          <NavLink
            to={"/problem/detail/problem-1-3/question-1-2/submit"}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
          >
            Nộp bài
          </NavLink>
          <NavLink
            to={"/problem/detail/problem-2-5/question-1-2/submission/mine"}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
          >
            Các lần bạn nộp
          </NavLink>
          <NavLink
            to={`/contest/enter/${getContestIdNumber(idContest)}`}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
          >
            Quay lại cuộc thi
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutDetailProblem;

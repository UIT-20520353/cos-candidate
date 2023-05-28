import Header from "../../components/Header";
import { NavLink, Outlet, useParams } from "react-router-dom";

function LayoutDetailProblem() {
  const { idProblem, idContest } = useParams();

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
            to={"/"}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
          >
            Các lần bạn nộp
          </NavLink>
          <NavLink
            to={`/contest/enter/${idContest}`}
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

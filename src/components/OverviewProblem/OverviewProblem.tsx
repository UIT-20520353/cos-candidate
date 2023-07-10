import { NavLink } from "react-router-dom";
import { IProblem } from "~/types";

type IProps = {
  problem: IProblem;
};

function OverviewProblem(props: IProps) {
  return (
    <li
      id={`problem-${props.problem.id}`}
      className={"flex flex-col items-start gap-y-2 rounded-md bg-gray-200 p-3 shadow-md"}
    >
      <p className={"w-full truncate text-lg font-medium"}>{props.problem.name}</p>
      <p className={"line-clamp-4 w-full whitespace-pre-line text-base font-normal"}>{props.problem.detail}</p>
      <NavLink
        to={`/problem/detail/${props.problem.id}/contest/${props.problem.contest_id}`}
        className={
          "inline-block rounded-md bg-[#023e8a] px-5 py-1 text-base font-medium text-white duration-300 hover:bg-[#0077b6]"
        }
      >
        Làm bài
      </NavLink>
    </li>
  );
}

export default OverviewProblem;

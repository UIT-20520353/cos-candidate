import Header from "~/components/Header";
import { useEffect, useState } from "react";
import { getProblemsAndCount } from "~/Query/api/problem-service";
import { IOverviewProblem } from "~/types/problem.type";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ExercisesSkeleton from "~/skeletons/exercises-skeleton";

type IProps = {
  stt: number;
  problem: IOverviewProblem;
};

function RowItem(props: IProps) {
  return (
    <tr className="border-b bg-white">
      <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-black">
        {props.stt + 1}
      </th>
      <td className="cursor-pointer px-6 py-4 text-base font-medium text-black hover:underline">
        <NavLink to={`/problem/detail/${props.problem.id}/contest/${0}`}>{props.problem.name}</NavLink>
      </td>
      <td className="px-6 py-4 text-base font-medium text-black">{props.problem.amount}</td>
    </tr>
  );
}

function Exercises() {
  const { data: problems, isLoading: isFetchingProblems } = useQuery({
    queryKey: ["exercise-list"],
    queryFn: () => {
      return getProblemsAndCount();
    }
  });

  useEffect(() => {
    document.title = "Danh sách bài tập";
  }, []);

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      {isFetchingProblems && <ExercisesSkeleton />}
      {!isFetchingProblems && (
        <div className={"my-8 w-4/5"}>
          <p className={"text-2xl font-medium text-[#10002b]"}>Danh sách bài tập</p>
          <table className="my-5 w-full text-center text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên bài tập
                </th>
                <th scope="col" className="px-6 py-3">
                  Số giải được
                </th>
              </tr>
            </thead>
            <tbody>
              {problems?.map((problem, index) => (
                <RowItem key={`problem-${problem.id}`} stt={index} problem={problem} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Exercises;

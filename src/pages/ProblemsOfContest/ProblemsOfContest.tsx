import Header from "../../components/Header";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IContest } from "../../types/contest.type";
import { getContestById } from "../../Query/api/contest-service";
import Swal from "sweetalert2";
import { IProblem } from "../../types/problem.type";
import { getProblemsByContestId } from "../../Query/api/problem-service";
import OverviewProblem from "../../components/OverviewProblem";
import Search from "../../components/Search";

const getContestIdNumber = (id: string | undefined) => {
  if (!id) return -1;

  const temp = id.split("-");
  return parseInt(temp[1]);
};

function ProblemsOfContest() {
  const { id } = useParams<{ id: string }>();
  const initialContest: IContest = {
    id: parseInt(id ?? "-1"),
    name: "",
    description: "",
    date_begin: "",
    time_begin: "",
    duration: "",
    host_id: null
  };
  const [contest, setContest] = useState<IContest>(initialContest);
  const [problems, setProblems] = useState<IProblem[]>([]);
  const [filterProblems, setFilterProblems] = useState<IProblem[]>([]);

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const contest_id = getContestIdNumber(id);
    const contests = await getContestById(contest_id);
    if (contests && contests.length !== 0) {
      setContest(contests[0] ?? initialContest);
    }
    const dataProblems = await getProblemsByContestId(contest_id);
    if (dataProblems && dataProblems.length !== 0) {
      setProblems(dataProblems ?? []);
      setFilterProblems(dataProblems ?? []);
    }

    Swal.close();
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleSearch = (filtered: string) => {
    if (!filtered) {
      const temp = [...problems];
      setFilterProblems(temp);
      return;
    }

    const result = problems.filter((problem) => {
      const problemName = problem.name.toUpperCase();
      return problemName.includes(filtered.toUpperCase());
    });
    setFilterProblems(result);
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <div className={"flex w-full flex-row items-center justify-between"}>
          <p className={"text-2xl font-medium text-[#10002b]"}>Các đề bài của cuộc thi {contest.name}</p>
          <NavLink
            className={"rounded-md bg-gray-200 px-5 py-2 font-medium shadow-md duration-300 hover:bg-gray-300"}
            to={"/contest/list/registered"}
          >
            Quay lại
          </NavLink>
        </div>

        <Search handleSearch={handleSearch} placeHolder={"Nhập tên bài"} />

        <ul className={"mt-5 grid w-full grid-cols-3 gap-3"}>
          {filterProblems.map((problem) => (
            <OverviewProblem key={`problem-${problem.id}`} problem={problem} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProblemsOfContest;

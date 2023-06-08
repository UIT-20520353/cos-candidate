import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { getContestById } from "../../../Query/api/contest-service";
import { IContest } from "../../../types/contest.type";
import { getTeamList, getTeamMember } from "../../../Query/api/team-service";
import { getProblemsByContestId } from "../../../Query/api/problem-service";
import { getAllSubmission } from "../../../Query/api/submission-service";

type IRanking = {
  id: number;
  name: string;
  solved: number;
};

const initialContest: IContest = {
  id: -1,
  name: "",
  description: "",
  date_begin: "",
  time_begin: "",
  duration: "",
  host_id: -1
};

function RankContest() {
  const { idContest } = useParams<{ idContest: string }>();
  const [contest, setContest] = useState<IContest>(initialContest);
  const [teams, setTeams] = useState<IRanking[]>([]);
  const [numberProblem, setNumberProblem] = useState<number>(0);

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const contestsResponse = await getContestById(parseInt(idContest ?? "-1"));
    const teamsResponse = await getTeamList(parseInt(idContest ?? "-1"));
    const problemsResponse = await getProblemsByContestId(parseInt(idContest ?? "-1"));
    const submissionsResponse = await getAllSubmission();
    if (
      !teamsResponse ||
      teamsResponse.length === 0 ||
      !problemsResponse ||
      problemsResponse.length === 0 ||
      !contestsResponse ||
      contestsResponse.length === 0 ||
      !submissionsResponse ||
      submissionsResponse.length === 0
    ) {
      Swal.close();
      return;
    }
    const teamIds = teamsResponse.map((team) => team.id);
    const teamMembersResponse = await getTeamMember(teamIds);
    if (!teamMembersResponse) {
      Swal.close();
      return;
    }

    const ranking: IRanking[] = [];
    setContest(contestsResponse[0] ?? initialContest);
    for (const team of teamsResponse) {
      ranking.push({ id: team.id, name: team.name, solved: 0 });
    }
    setNumberProblem(problemsResponse.length ?? 0);
    for (const problem of problemsResponse) {
      for (const team of teamsResponse) {
        const members = teamMembersResponse.filter((member) => member.team_id === team.id);
        for (const member of members) {
          const result = submissionsResponse?.find(
            (submission) =>
              submission.account_id === member.account_id &&
              submission.status === "Accepted" &&
              submission.problem_id === problem.id
          );

          if (result) {
            ranking.forEach((rank) => {
              if (rank.id === team.id) rank.solved += 1;
            });
            break;
          }
        }
      }
    }

    const sortedRanking = ranking.sort((a, b) => b.solved - a.solved);
    setTeams(sortedRanking);
    Swal.close();
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Bảng xếp hạng của cuộc thi {contest.name}</p>
        {teams && teams.length !== 0 && (
          <table className="mt-5 w-full text-center text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="w-1/5 px-6 py-3">
                  Thứ hạng
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên đội
                </th>
                <th scope="col" className="w-1/5 px-6 py-3">
                  Số bài giải được
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => {
                const isOdd = !(index % 2);

                return (
                  <tr key={`team-${team.id}`} className={`border-b ${isOdd ? "bg-white" : "bg-gray-50"}`}>
                    <th
                      scope="row"
                      className={`whitespace-nowrap px-6 py-4 font-medium ${isOdd ? "text-black" : "text-gray-900"}`}
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 text-base font-medium text-black">{team.name}</td>
                    <td className="px-6 py-4 text-base font-medium text-black">
                      {team.solved}/{numberProblem}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {(!teams || teams.length === 0) && <p className={"text-base"}>Không có đội tham gia cuộc thi</p>}
      </div>
    </div>
  );
}

export default RankContest;

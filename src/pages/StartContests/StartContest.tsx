import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getContestIds, getTeamIds, getTeams } from "../../Query/api/team-service";
import Swal from "sweetalert2";
import { IContest } from "../../types/contest.type";
import { getContestsByContestIds } from "../../Query/api/contest-service";
import OverviewContest from "../../components/OverviewContest";
import { ITeam } from "../../types/team.type";
import Search from "../../components/Search";

const getAmount = (teams: ITeam[], contestId: number) => {
  return teams.filter((team) => team.contest_id === contestId).length;
};

function StartContest() {
  const user_id = parseInt(sessionStorage.getItem("id") ?? "-1");
  const [contests, setContests] = useState<IContest[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [filterContests, setFilterContests] = useState<IContest[]>([]);

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const teamIdsResponse = await getTeamIds(user_id);
    let team_ids: number[] = [];
    if (teamIdsResponse && teamIdsResponse.length !== 0) {
      team_ids = teamIdsResponse.map((item) => item.team_id);
    }
    const contestIdsResponse = await getContestIds(team_ids);
    let contest_ids: number[] = [];
    if (contestIdsResponse && contestIdsResponse.length !== 0) {
      contest_ids = contestIdsResponse.map((item) => item.contest_id);
    }
    const contestsResponse = await getContestsByContestIds(contest_ids);
    if (contestsResponse && contestsResponse.length !== 0) {
      setContests(contestsResponse ?? []);
      setFilterContests(contestsResponse ?? []);
    }
    const dataTeams = await getTeams();
    if (dataTeams && dataTeams.length !== 0) {
      setTeams(dataTeams ?? []);
    }

    Swal.close();
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleSearch = (filtered: string) => {
    if (!filtered) {
      const temp = [...contests];
      setFilterContests(temp);
      return;
    }

    const temp = contests.filter((contest) => {
      const nameContest = contest.name.toUpperCase();
      return nameContest.includes(filtered.toUpperCase());
    });
    setFilterContests(temp);
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Bắt đầu cuộc thi</p>
        <Search handleSearch={handleSearch} />
        <ul className={"mt-5 grid grid-cols-3 gap-4"}>
          {filterContests.map((contest) => (
            <OverviewContest
              amount={getAmount(teams, contest.id)}
              key={`contest-${contest.id}`}
              contest={contest}
              typeOverview={false}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StartContest;

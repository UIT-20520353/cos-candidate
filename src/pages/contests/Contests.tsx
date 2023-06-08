import Header from "../../components/Header";
import OverviewContest from "../../components/OverviewContest";
import { IContest } from "../../types/contest.type";
import { useEffect, useState } from "react";
import { getContestList } from "../../Query/api/contest-service";
import Swal from "sweetalert2";
import { ITeam } from "../../types/team.type";
import { getTeams } from "../../Query/api/team-service";
import Search from "../../components/Search";

const getAmount = (teams: ITeam[], contestId: number) => {
  return teams.filter((team) => team.contest_id === contestId).length;
};

function Contests() {
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

    const dataContests = await getContestList();
    if (dataContests && dataContests.length !== 0) {
      setContests(dataContests ?? []);
      setFilterContests(dataContests ?? []);
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
      <div className={"my-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Tất cả các cuộc thi</p>
        <Search handleSearch={handleSearch} />
        <ul className={"mt-5 grid grid-cols-3 gap-4"}>
          {filterContests.map((contest) => (
            <OverviewContest
              amount={getAmount(teams, contest.id)}
              key={`contest-${contest.id}`}
              contest={contest}
              typeOverview={true}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contests;

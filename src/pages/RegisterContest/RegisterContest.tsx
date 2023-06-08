import Header from "../../components/Header";
import { NavLink, useParams } from "react-router-dom";
import OverviewTeam from "../../components/OverviewTeam";
import { AiFillPlusCircle } from "react-icons/all";
import { useEffect, useState } from "react";
import { IContest } from "../../types/contest.type";
import { getContestById } from "../../Query/api/contest-service";
import AddTeamModal from "../../components/Modal/AddTeamModal";
import { ITeam, ITeamMemberDetail } from "../../types/team.type";
import { getTeamList, getTeamMember } from "../../Query/api/team-service";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Search from "../../components/Search";

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
  const user = useSelector((state: RootState) => state.user);
  const initialContest: IContest = {
    id: getContestIdNumber(contestId),
    name: "",
    description: "",
    date_begin: "",
    time_begin: "",
    duration: "",
    host_id: null
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contest, setContest] = useState<IContest>(initialContest);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [filterTeams, setFilterTeams] = useState<ITeam[]>([]);
  const [teamMemberDetails, setTeamMemberDetails] = useState<ITeamMemberDetail[]>([]);

  async function handleFetchData(type: string) {
    if (type === "all")
      Swal.fire({
        title: "Đang lấy dữ liệu",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen() {
          Swal.showLoading();
        }
      });
    const contest_id = getContestIdNumber(contestId);
    const dataContests = await getContestById(contest_id);
    if (type === "all")
      if (dataContests && dataContests.length !== 0) {
        setContest(dataContests[0] ?? initialContest);
      }
    const dataTeams = await getTeamList(contest_id);
    let teamIds: number[] = [];
    if (dataTeams && dataTeams.length !== 0) {
      setTeams(dataTeams ?? []);
      setFilterTeams(dataTeams ?? []);
      teamIds = dataTeams.map((team) => team.id);
    }
    const dateTeamMembers = await getTeamMember(teamIds);
    if (dateTeamMembers && dateTeamMembers.length !== 0) {
      setTeamMemberDetails(dateTeamMembers ?? []);
    }
    if (type === "all") Swal.close();
  }

  useEffect(() => {
    handleFetchData("all");
  }, []);

  const openModal = () => {
    const result = teamMemberDetails.find((dataTeamMember) => dataTeamMember.account_id === user.id);

    if (result) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Thông báo",
        text: "Bạn đã tham gia đội, vui lòng rời đội trước khi tạo đội mới",
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        allowOutsideClick: false
      });
      return;
    }

    setIsOpen(true);
  };
  const closeModal = () => {
    handleFetchData("none");
    setIsOpen(false);
  };
  const updateList = () => {
    setTeams([]);
    setTeamMemberDetails([]);
    handleFetchData("none");
  };

  const handleSearch = (filtered: string) => {
    if (!filtered) {
      const temp = [...teams];
      setFilterTeams(temp);
      return;
    }

    const result = teams.filter((team) => {
      const teamName = team.name.toUpperCase();
      return teamName.includes(filtered.toUpperCase());
    });
    console.log(result);
    setFilterTeams(result);
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
          <p className={"col-span-3 rounded-md border border-gray-700 bg-gray-100 p-2 text-sm font-normal text-black"}>
            {contest.description}
          </p>
        </div>
        <div className={"mt-5 w-full p-3"}>
          <div className={"flex flex-row items-center justify-between"}>
            <p className={"text-xl font-medium text-black"}>Danh sách các đội đã đăng ký</p>
            <button
              className={
                "flex flex-row items-center gap-x-3 rounded-md bg-gray-200 px-4 py-2 shadow-md hover:bg-gray-300"
              }
              onClick={openModal}
            >
              <span className={"text-lg font-medium"}>Tạo đội</span>{" "}
              <AiFillPlusCircle className={"inline-block h-6 w-6"} />
            </button>
          </div>
          <Search handleSearch={handleSearch} placeHolder={"Nhập tên đội"} />
          {filterTeams && filterTeams.length !== 0 ? (
            <ul className={"mt-3 grid grid-cols-3 gap-3"}>
              {filterTeams.map((team) => (
                <OverviewTeam
                  key={`team-${team.id}`}
                  teamId={team.id}
                  name={team.name}
                  teamMemberDetails={teamMemberDetails}
                  updateList={updateList}
                  max_member={team.max_member}
                />
              ))}
            </ul>
          ) : (
            <p className={"mt-3 text-base font-normal"}>Chưa có đội đăng ký cho cuộc thi này</p>
          )}
        </div>
      </div>
      {isOpen && <AddTeamModal contestId={getContestIdNumber(contestId)} closeModal={closeModal} />}
    </div>
  ) : (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <p>không lấy được id</p>
    </div>
  );
}

export default RegisterContest;

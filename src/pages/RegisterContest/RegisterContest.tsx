import { NavLink, useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/all";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import Search from "~/components/Search";
import AddTeamModal from "~/components/Modal/AddTeamModal";
import Header from "~/components/Header";
import OverviewTeam from "~/components/OverviewTeam";
import { useSessionStorage } from "~/utils";
import { fetchDataRegisterTeam, getContestById } from "~/Query";
import RegisterContestSkeleton from "~/skeletons/register-contest-skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function RegisterContest() {
  const { contestId } = useParams<{ contestId: string }>();
  const { data: contest, isLoading: isFetchingContest } = useQuery({
    queryKey: ["contest", Number(contestId) || -1],
    queryFn: () => {
      return getContestById(Number(contestId) || -1);
    }
  });
  const { data: dataTeams, isLoading: isFetchingData } = useQuery({
    queryKey: ["team", "team-member", `contest-${Number(contestId) || -1}`],
    queryFn: () => {
      return fetchDataRegisterTeam(Number(contestId) || -1);
    },
    keepPreviousData: true
  });

  const [user] = useSessionStorage("cos-candidate", null);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isJoinTeam, setIsJoinTeam] = useState<boolean>(false);

  useEffect(() => {
    const result = dataTeams?.find((item) => {
      return item.teamMembers.find((member) => member.account_id === user.id);
    });
    setIsJoinTeam(result);
  }, [dataTeams]);

  const openModal = () => {
    if (isJoinTeam) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Bạn đã tham gia đội, vui lòng rời đội trước khi tạo đội mới",
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        allowOutsideClick: false
      });
      return;
    }

    setIsOpen(true);
  };
  const closeModal = () => {
    updateList();
    setIsOpen(false);
  };
  const updateList = () => {
    queryClient.invalidateQueries({ queryKey: ["team", "team-member", `contest-${Number(contestId) || -1}`] });
  };

  return (
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
        {(isFetchingContest || isFetchingData) && <RegisterContestSkeleton />}
        {!isFetchingContest && !isFetchingData && (
          <>
            <div className={"mt-5 grid w-full grid-cols-3 gap-2 rounded-md bg-gray-200 p-3 shadow-md"}>
              <p className={"col-span-2 text-lg font-medium uppercase text-black"}>{contest?.name}</p>
              <p className={"text-sm font-normal text-black"}>
                Ban tổ chức <span className={"cursor-pointer text-base font-medium hover:underline"}>Free contest</span>
              </p>
              <p className={"text-sm font-normal text-black"}>
                Ngày bắt đầu <span className={"text-base font-medium"}>{contest?.date_begin}</span>
              </p>
              <p className={"text-sm font-normal text-black"}>
                Giờ bắt đầu <span className={"text-base font-medium"}>{contest?.time_begin}</span>
              </p>
              <p className={"text-sm font-normal text-black"}>
                Diễn ra trong <span className={"text-base font-medium"}>{contest?.duration}</span>
              </p>
              <p className={"col-span-3 text-sm font-normal text-black"}>Mô tả của cuộc thi</p>
              <p
                className={
                  "col-span-3 rounded-md border border-gray-700 bg-gray-100 p-2 text-sm font-normal text-black"
                }
              >
                {contest?.description}
              </p>
            </div>
            <div className={"mt-5 w-full p-3"}>
              <div className={"flex flex-row items-center justify-between"}>
                <p className={"text-xl font-medium text-black"}>Danh sách các đội đã đăng ký</p>
                <button
                  className={
                    "flex flex-row items-center gap-x-3 rounded-md bg-gray-200 px-4 py-2 shadow-md hover:bg-gray-300"
                  }
                  disabled={contest?.id === -1}
                  onClick={openModal}
                >
                  <span className={"text-lg font-medium"}>Tạo đội</span>
                  <AiFillPlusCircle className={"inline-block h-6 w-6"} />
                </button>
              </div>
              {/*<Search handleSearch={handleSearch} placeHolder={"Nhập tên đội"} />*/}
              {dataTeams?.length !== 0 ? (
                <ul className={"mt-3 grid grid-cols-3 gap-3"}>
                  {dataTeams?.map((item) => (
                    <OverviewTeam
                      updateList={updateList}
                      key={`team-${item.team.id}`}
                      teamId={item.team.id}
                      name={item.team.name}
                      teamMembers={item.teamMembers}
                      max_member={item.team.max_member}
                      isJoinTeam={isJoinTeam}
                    />
                  ))}
                </ul>
              ) : (
                <p className={"mt-3 text-base font-normal"}>Chưa có đội đăng ký cho cuộc thi này</p>
              )}
            </div>
          </>
        )}
      </div>
      {isOpen && <AddTeamModal contestId={contest?.id} closeModal={closeModal} />}
    </div>
  );
}

export default RegisterContest;

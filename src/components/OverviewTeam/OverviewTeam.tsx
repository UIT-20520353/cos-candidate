import { FaUserAlt } from "react-icons/all";
import { ITeamMemberDetail } from "../../types/team.type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Swal from "sweetalert2";
import { handleDeleteTeam, handleJoinTeamAPI, handleLeaveTeamAPI } from "../../Query/api/team-service";

type IProps = {
  teamId: number;
  name: string;
  teamMemberDetails: ITeamMemberDetail[];
  updateList: () => void;
  max_member: number;
};

function OverviewTeam(props: IProps) {
  const user = useSelector((state: RootState) => state.user);
  const [myTeam, setMyTeam] = useState<boolean>(false);
  const [numberOfMember, setNumberOfMember] = useState<number>(0);

  useEffect(() => {
    const result = props.teamMemberDetails.find(
      (teamMemberDetail) => user.id === teamMemberDetail.account_id && teamMemberDetail.team_id === props.teamId
    );
    if (result) setMyTeam(true);
    else setMyTeam(false);

    const count = props.teamMemberDetails.filter((member) => member.team_id === props.teamId).length;
    setNumberOfMember(count);
  });
  const handleJoinTeam = () => {
    const result = props.teamMemberDetails.find((dataTeamMember) => dataTeamMember.account_id === user.id);

    if (result) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Thông báo",
        text: "Bạn đã tham gia đội, vui lòng rời đội trước khi tham gia đội mới",
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        allowOutsideClick: false
      });
      return;
    }

    Swal.fire({
      title: "Tham gia đội?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        handleJoinTeamAPI(props.teamId, user.id).then((response) => {
          if (response) {
            props.updateList();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Tham gia đội thành công",
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              allowOutsideClick: false
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Thông báo",
              text: "Xảy ra lỗi khi tham gia đội",
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              allowOutsideClick: false
            });
          }
        });
      }
    });
  };
  const handleLeaveTeam = () => {
    const temp = props.teamMemberDetails.find((member) => member.account_id === user.id);
    if (!temp) return;

    if (temp.is_leader) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn đang là đội trưởng, xác nhận rời đội sẽ xóa đội này?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteTeam(props.teamId).then((response) => {
            if (response) {
              props.updateList();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Rời đội thành công",
                showConfirmButton: true,
                confirmButtonText: "Đồng ý",
                allowOutsideClick: false,
                timer: 3000
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Thông báo",
                text: "Xảy ra lỗi khi rời đội",
                showConfirmButton: true,
                confirmButtonText: "Đồng ý",
                allowOutsideClick: false
              });
            }
          });
        }
      });
      return;
    }

    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận rời đội?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        const temp = props.teamMemberDetails.find((member) => member.account_id === user.id);
        if (temp)
          handleLeaveTeamAPI(temp.id).then((response) => {
            if (response) {
              props.updateList();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Rời đội thành công",
                showConfirmButton: true,
                confirmButtonText: "Đồng ý",
                allowOutsideClick: false,
                timer: 3000
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Thông báo",
                text: "Xảy ra lỗi khi rời đội",
                showConfirmButton: true,
                confirmButtonText: "Đồng ý",
                allowOutsideClick: false
              });
            }
          });
      }
    });
  };

  return (
    <li
      id={`team-${props.teamId}`}
      className={
        "flex flex-row items-start justify-between rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"
      }
    >
      <div>
        <p className={"mb-3 truncate text-lg font-semibold"}>{props.name}</p>

        <ul>
          {props.teamMemberDetails.map((member) => {
            if (member.team_id === props.teamId)
              return (
                <li
                  id={`member-${member.accounts.id}`}
                  key={`member-${member.accounts.id}`}
                  className={"group mt-4 flex cursor-pointer flex-row items-center gap-x-2"}
                >
                  <FaUserAlt className={"inline-block h-5 w-5 opacity-50 group-hover:opacity-100"} />
                  <span className={"text-sm text-gray-500 group-hover:text-black group-hover:underline"}>
                    {member.accounts.name}{" "}
                    {member.is_leader && <span className={"text-sm font-medium"}>(Nhóm trưởng)</span>}
                  </span>
                </li>
              );
          })}
        </ul>
      </div>

      <div className={"flex flex-col items-center gap-y-3"}>
        {myTeam && (
          <button
            className={
              "rounded-md bg-[#c9184a] px-4 py-2 text-sm font-medium text-gray-300 duration-300 hover:bg-[#a4133c] hover:text-white"
            }
            onClick={handleLeaveTeam}
          >
            Rời nhóm
          </button>
        )}
        {!myTeam && numberOfMember < props.max_member && (
          <button
            className={
              "rounded-md bg-[#78c6a3] px-4 py-2 text-sm font-medium duration-300 hover:bg-[#469d89] hover:text-white"
            }
            onClick={handleJoinTeam}
          >
            Tham gia
          </button>
        )}
      </div>
    </li>
  );
}

export default OverviewTeam;

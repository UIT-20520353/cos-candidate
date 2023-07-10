import { FaUserAlt } from "react-icons/all";
import { useEffect, useState } from "react";
import { ITeamMember } from "~/types";
import { useSessionStorage } from "~/utils";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { deleteTeam, joinTeam, leaveTeam } from "~/Query";
import { toast } from "react-toastify";

type IProps = {
  teamId: number;
  name: string;
  teamMembers: ITeamMember[];
  max_member: number;
  isJoinTeam: boolean;
  updateList: () => void;
};

function OverviewTeam(props: IProps) {
  const [user] = useSessionStorage("cos-candidate", null);
  const [myTeam, setMyTeam] = useState<boolean>(false);

  useEffect(() => {
    setMyTeam(false);
    props.teamMembers.forEach((member) => {
      if (member.account_id === user.id) {
        setMyTeam(true);
      }
    });
  }, [props.teamMembers]);

  const { mutate: mutateJoin } = useMutation({
    mutationFn: (body: { teamId: number; accountId: number }) => {
      return joinTeam(body.teamId, body.accountId);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Tham gia đội thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        props.updateList();
      } else {
        toast("Xảy ra lỗi khi tham gia đội", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (body: number) => {
      return deleteTeam(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Xóa đội thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        props.updateList();
      } else {
        toast("Xảy ra lỗi khi xóa gia đội", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });
  const { mutate: mutateLeave } = useMutation({
    mutationFn: (body: number) => {
      return leaveTeam(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Rời đội thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        props.updateList();
      } else {
        toast("Xảy ra lỗi khi rời gia đội", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });

  const handleJoinTeam = () => {
    if (props.isJoinTeam) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Bạn đã tham gia đội, vui lòng rời đội trước khi tham gia đội mới",
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
        const body = { teamId: props.teamId, accountId: user.id };
        mutateJoin(body);
      }
    });
  };
  const handleLeaveTeam = () => {
    const detailMember = props.teamMembers.find((member) => member.account_id === user.id);
    if (!detailMember) return;

    if (detailMember.is_leader) {
      Swal.fire({
        title: "Bạn đang là đội trưởng, xác nhận rời đội sẽ xóa đội này?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          mutateDelete(props.teamId);
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
        mutateLeave(detailMember.id);
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
          {props.teamMembers.map((member) => {
            // if (member.team_id === props.teamId)
            return (
              <li
                id={`member-${member.account_id}`}
                key={`member-${member.account_id}`}
                className={"group mt-4 flex flex-row items-center gap-x-2"}
              >
                <FaUserAlt className={"inline-block h-5 w-5 opacity-50"} />
                <span className={"text-sm text-gray-500"}>
                  {member.member_name}{" "}
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
        {!myTeam && props.teamMembers.length < props.max_member && (
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

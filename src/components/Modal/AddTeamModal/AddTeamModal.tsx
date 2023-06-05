import ModalPortal from "../../ModalPortal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormTeamValue } from "../../../types/team.type";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { handleCreateTeam } from "../../../Query/api/team-service";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type ModalProps = {
  contestId: number;
  closeModal: () => void;
};

function AddTeamModal(props: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IFormTeamValue>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setValue("contestId", props.contestId);
  }, []);

  const onSubmit: SubmitHandler<IFormTeamValue> = (data) => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận tạo đội mới với các thông tin đã nhập?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        handleCreateTeam(data, user.id).then((response) => {
          if (response && response.length !== 0) {
            Swal.fire({
              position: "center",
              title: "Tạo đội thành công",
              showConfirmButton: true,
              allowOutsideClick: false,
              icon: "success"
            });
            props.closeModal();
          } else {
            Swal.fire({
              position: "center",
              title: "Tạo đội không thành công",
              showConfirmButton: true,
              allowOutsideClick: false,
              icon: "error"
            });
          }
        });
      }
    });
  };

  return (
    <ModalPortal>
      <div className={"fixed left-0 top-0 z-40 h-screen w-full bg-black opacity-50"}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "fixed left-1/2 top-1/2 z-50 max-h-[95%] w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5"
        }
      >
        <p className={"mb-5 text-lg font-semibold"}>Tạo đội mới</p>
        <div className={"relative mb-6"}>
          <span className={"text-sm font-semibold"}>Tên đội</span>
          <input
            id={"team-name"}
            placeholder={"Tên đội"}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register("name", { required: "Vui lòng nhập tên đội" })}
            autoComplete={"off"}
          />
          {errors.name && <span className={"absolute text-xs text-red-600"}>{errors.name.message}</span>}
        </div>
        <div className={"relative mb-8"}>
          <span className={"text-sm font-semibold"}>Số lượng thành viên tối đa</span>
          <input
            type={"number"}
            id={"max-member"}
            placeholder={"Số lượng thành viên"}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register("max_member", {
              required: "Vui lòng nhập số lượng thành viên",
              min: { value: 1, message: "Số lượng thành viên tối thiểu là 1, tối đa là 4" },
              max: { value: 4, message: "Số lượng thành viên tối thiểu là 1, tối đa là 4" }
            })}
            autoComplete={"off"}
          />
          {errors.max_member && <span className={"absolute text-xs text-red-600"}>{errors.max_member.message}</span>}
        </div>
        <div className={"flex flex-row items-center gap-x-3"}>
          <button
            className={
              "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
            }
            type={"submit"}
          >
            Lưu
          </button>
          <button
            className={
              "w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
            }
            type={"button"}
            onClick={props.closeModal}
          >
            Đóng
          </button>
        </div>
      </form>
    </ModalPortal>
  );
}

export default AddTeamModal;

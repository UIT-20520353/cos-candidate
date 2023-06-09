import Header from "~/components/Header";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormValue } from "~/types/account.type";
import { isEmailValid } from "~/utils/ValidateEmail/ValidateEmail";
import Swal from "sweetalert2";
import { getAccountInfo, updateAccount } from "~/Query/api/account-services";
import { useEffect, useState } from "react";
import ChangePasswordModal from "~/components/Modal/ChangePasswordModal";
import { useSessionStorage } from "~/utils";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProfilePageSkeleton from "~/skeletons/profile-page-skeleton";

const isPhoneNumberValid = (phoneNumber: string | null): boolean | string => {
  if (!phoneNumber) return true;

  const phoneRegex = /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09[0-9])[0-9]{7}$/;
  return phoneRegex.test(phoneNumber) || "Số điện thoại không hợp lệ";
};

function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IFormValue>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user] = useSessionStorage("cos-candidate", null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", `user-${user.id}`],
    queryFn: () => {
      return getAccountInfo(user.id);
    }
  });

  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("phone", profile.phone);
      setValue("email", profile.email || "");
      setValue("address", profile.address || "");
    }
  }, [profile]);

  const onSubmit: SubmitHandler<IFormValue> = (data) => {
    Swal.fire({
      title: "Cập nhật thông tin tài khoản?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        updateAccount(user.id, data.name, data.email, data.phone || "", data.address || "").then((res) => {
          if (res) {
            toast("Cập nhật thông tin tài khoản thành công", {
              type: "success",
              position: "bottom-right",
              autoClose: 3000,
              closeOnClick: false
            });
          } else {
            toast("Xảy ra lỗi khi cập nhật thông tin tài khoản", {
              type: "success",
              position: "bottom-right",
              autoClose: 3000,
              closeOnClick: false
            });
          }
        });
      }
    });
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      {isLoading && <ProfilePageSkeleton />}
      {!isLoading && (
        <div className={"mt-8 w-4/5"}>
          <div className={"flex flex-row items-center justify-between"}>
            <p className={"text-2xl font-medium text-[#10002b]"}>Thông tin tài khoản</p>
            <button
              className={
                "rounded-md bg-gray-300 px-4 py-2 text-base font-medium shadow-md duration-300 hover:bg-gray-200"
              }
              onClick={openModal}
            >
              Đổi mật khẩu
            </button>
          </div>
          <form
            className={"my-5 flex w-full flex-col items-center gap-y-6 rounded-md bg-gray-200 p-3 shadow-md"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={"grid w-full grid-cols-2 gap-4"}>
              <div className={"relative w-full"}>
                <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>
                  Họ tên<span className={"text-red-600"}>*</span>
                </span>
                <input
                  id={"full-name"}
                  type="text"
                  className={
                    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  autoComplete={"off"}
                  placeholder={"Họ tên"}
                  {...register("name", { required: "Vui lòng nhập họ tên" })}
                />
                {errors.name && <span className={"absolute text-xs text-red-600"}>{errors.name.message}</span>}
              </div>
              <div className={"relative w-full"}>
                <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>
                  Email<span className={"text-red-600"}>*</span>
                </span>
                <input
                  id={"email"}
                  className={
                    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  autoComplete={"off"}
                  placeholder={"Email"}
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    validate: (value) => isEmailValid(value) || "Email không hợp lệ"
                  })}
                />
                {errors.email && <span className={"absolute text-xs text-red-600"}>{errors.email.message}</span>}
              </div>
            </div>
            <div className={"grid w-full grid-cols-2 gap-4"}>
              <div className={"w-full"}>
                <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>
                  Trường học / công ty
                </span>
                <input
                  id={"address"}
                  type="text"
                  className={
                    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  autoComplete={"off"}
                  placeholder={"Nơi học tập, làm việc"}
                  {...register("address")}
                />
              </div>
              <div className={"w-full"}>
                <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Số điện thoại</span>
                <input
                  id={"phone"}
                  type="text"
                  className={
                    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  autoComplete={"off"}
                  placeholder={"Số điện thoại"}
                  {...register("phone", { validate: (value) => isPhoneNumberValid(value) })}
                />
                {errors.phone && <span className={"absolute text-xs text-red-600"}>{errors.phone.message}</span>}
              </div>
            </div>
            <div className={"mt-4 flex w-full flex-col items-start gap-y-3"}>
              <button
                className={"w-full rounded-lg bg-[#0077b6] py-2 text-white duration-300 hover:bg-[#023e8a]"}
                type={"submit"}
              >
                Cập nhật thông tin
              </button>
            </div>
          </form>
        </div>
      )}
      {isOpen && <ChangePasswordModal closeModal={closeModal} />}
    </div>
  );
}

export default ProfilePage;

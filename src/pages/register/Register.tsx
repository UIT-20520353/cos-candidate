import { SubmitHandler, useForm } from "react-hook-form";
import { IAccount, IFormValue } from "../../types/account.type";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isEmailValid } from "../../utils/ValidateEmail/ValidateEmail";
import Swal from "sweetalert2";
import { getAccountList, insertAccount } from "../../Query/api/account-services";

const isPhoneNumberValid = (phoneNumber: string | null): boolean | string => {
  if (!phoneNumber) return true;

  const phoneRegex = /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09[0-9])[0-9]{7}$/;
  return phoneRegex.test(phoneNumber) || "Số điện thoại không hợp lệ";
};

function Register() {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues
  } = useForm<IFormValue>();

  useEffect(() => {
    setValue("phone", "");
    setValue("address", "");
    getAccountList().then((data) => {
      if (data) {
        setAccounts(data ?? []);
      }
    });
  }, []);

  const checkAccountExist = (username: string | undefined) => {
    if (!username) return "Vui lòng nhập tên đăng nhập";

    const result = accounts.find((account) => account.username === username);
    if (result) return "Tên đăng nhập đã được sử dụng";
  };

  const onSubmit: SubmitHandler<IFormValue> = (data) => {
    if (data.password !== data.rePassword) {
      return;
    }

    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận tạo tài khoản mới với các thông tin đã nhập?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        insertAccount(data).then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Thông báo",
              text: "Đăng ký tài khoản thành công",
              allowOutsideClick: false,
              showConfirmButton: true,
              timer: 4000
            });
            reset();
          }
        });
      }
    });
  };
  const checkRePassword = (value: string) => {
    const password = getValues("password");
    if (password) {
      return value === password || "Mật khẩu không trùng khớp";
    }
    return true;
  };

  return (
    <div className={"flex h-screen items-center justify-center"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex w-4/5 flex-col items-center gap-y-6 rounded-md bg-gray-200 p-3 shadow-md"}
      >
        <p className={"font-serif text-3xl font-semibold tracking-wider"}>Đăng ký tài khoản</p>
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
              Tên đăng nhập<span className={"text-red-600"}>*</span>
            </span>
            <input
              id={"username"}
              type="text"
              className={
                "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              }
              autoComplete={"off"}
              placeholder={"Tên đăng nhập"}
              {...register("username", {
                required: "Vui lòng nhập tên đăng nhập",
                minLength: { value: 6, message: "Tên đăng nhập phải có ít nhất 6 ký tự" },
                validate: (value) => checkAccountExist(value)
              })}
            />
            {errors.username && <span className={"absolute text-xs text-red-600"}>{errors.username.message}</span>}
          </div>
        </div>
        <div className={"grid w-full grid-cols-2 gap-4"}>
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
          <div className={"relative w-full"}>
            <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>
              Mật khẩu<span className={"text-red-600"}>*</span>
            </span>
            <input
              id={"password"}
              type="password"
              className={
                "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              }
              autoComplete={"off"}
              placeholder={"Mật khẩu"}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
              })}
            />
            {errors.password && <span className={"absolute text-xs text-red-600"}>{errors.password.message}</span>}
          </div>
        </div>
        <div className={"grid w-full grid-cols-2 gap-4"}>
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
          <div className={"relative w-full"}>
            <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>
              Nhập lại mật khẩu<span className={"text-red-600"}>*</span>
            </span>
            <input
              id={"re-password"}
              type="password"
              className={
                "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              }
              autoComplete={"off"}
              placeholder={"Nhập lại mật khẩu"}
              {...register("rePassword", {
                required: "Vui lòng nhập lại mật khẩu",
                validate: (value) => checkRePassword(value)
              })}
            />
            {errors.rePassword && <span className={"absolute text-xs text-red-600"}>{errors.rePassword.message}</span>}
          </div>
        </div>
        <div className={"grid w-full grid-cols-2 gap-4"}>
          <div className={"w-full"}>
            <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Trường học / công ty</span>
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
        </div>
        <div className={"mt-4 flex w-full flex-col items-start gap-y-3"}>
          <button className={"w-full rounded-lg bg-[#0077b6] py-2 text-white duration-300 hover:bg-[#023e8a]"}>
            Đăng ký
          </button>
          <div className={"flex flex-row items-center gap-x-6"}>
            <NavLink to={"/login"} className={"text-sm duration-100 "}>
              Đã có tài khoản? <span className={"hover:underline"}>Đăng nhập</span>
            </NavLink>
            <NavLink to={"/"} className={"text-sm duration-100 hover:underline"}>
              Quay lại trang chủ
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;

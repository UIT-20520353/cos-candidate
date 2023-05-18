import { NavLink } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/all";

function ResetPassword() {
  return (
    <div className={"flex h-screen items-center justify-center"}>
      <form className={"flex w-1/2 flex-col items-center gap-y-5 rounded-md bg-gray-200 p-3 shadow-md"}>
        <p className={"font-serif text-2xl font-semibold uppercase tracking-wider text-[#10002b]"}>Quên mật khẩu?</p>
        <div className={"w-full"}>
          <label
            htmlFor="email"
            className={"mb-2 block text-base font-medium font-medium text-[#10002b] text-gray-900"}
          >
            Email
          </label>
          <input
            id={"email"}
            type="email"
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Nhập email đã đăng ký tài khoản"}
          />
        </div>
        <div className={" flex w-full flex-col items-center gap-y-3"}>
          <button className={"w-full rounded-lg bg-[#240046] py-2 text-white duration-300 hover:bg-[#5a189a]"}>
            Gửi mã xác nhận
          </button>
          <NavLink to={"/login"} className={"flex flex-row items-center gap-x-1"}>
            <BiLeftArrowAlt className={"inline-block h-5 w-5"} />
            <span className={"text-sm font-medium text-[#10002b]"}>Trở về trang đăng nhập</span>
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;

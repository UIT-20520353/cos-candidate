import { NavLink } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/all";
import { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { changePassword, checkEmail } from "~/Query/api/account-services";
import CryptoJS from "crypto-js";

function ResetPassword() {
  const [email, setEmail] = useState<string>("");

  const handleResetPassword = async () => {
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(email)) {
      Swal.fire({ position: "center", titleText: "Email không hợp lệ", toast: true, icon: "error" });
      return;
    }

    const res = await checkEmail(email);
    if (!res || res.length === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        titleText: "Email chưa được đăng ký trong hệ thống",
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        allowOutsideClick: false
      });
      return;
    }

    emailjs
      .send(
        "service_x5noa5l",
        "template_miu4zr4",
        {
          username: res[0].username,
          to_email: email,
          message:
            "Chúng tôi đã đặt lại mật khẩu cho tài khoản của bạn là thisinh123. Vui lòng truy cập vào hệ thống và thay đổi mật khẩu.",
          to_name: res[0].name
        },
        "gSYxgAJ_OY7fBe2zA"
      )
      .then(
        (result) => {
          console.log(result);
          changePassword(res[0].id, CryptoJS.SHA256("thisinh123").toString());
          Swal.fire({
            position: "center",
            icon: "success",
            toast: true,
            titleText: "Đã gửi email đặt lại mật khẩu",
            showConfirmButton: true,
            confirmButtonText: "Đồng ý"
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className={"flex h-screen items-center justify-center"}>
      <form className={"flex w-1/2 flex-col items-center gap-y-5 rounded-md bg-gray-200 p-3 shadow-md"}>
        <p className={"font-serif text-2xl font-semibold uppercase tracking-wider text-[#10002b]"}>Quên mật khẩu?</p>
        <div className={"w-full"}>
          <span className={"mb-2 block text-base font-medium font-medium text-[#10002b] text-gray-900"}>Email</span>
          <input
            id={"email"}
            type="text"
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Nhập email đã đăng ký tài khoản"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={" flex w-full flex-col items-center gap-y-3"}>
          <button
            type={"button"}
            className={"w-full rounded-lg bg-[#240046] py-2 text-white duration-300 hover:bg-[#5a189a]"}
            onClick={handleResetPassword}
          >
            Đặt lại mật khẩu
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

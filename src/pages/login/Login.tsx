import { NavLink, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { userLogin } from "./user.reducer";

function Login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName === "thisinh" && password === "123") {
      dispatch(userLogin({ id: "user-1-1", name: "Xuân Vương" }));

      localStorage.setItem("id", "user-1-1");
      localStorage.setItem("name", "Xuân Vương");

      navigate("/", { replace: true });
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    } else {
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Đăng nhập không thành công",
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
  };

  return (
    <div className={"flex h-screen items-center justify-center"}>
      <form
        onSubmit={handleFormSubmit}
        className={"flex w-1/2 flex-col items-center gap-y-5 rounded-md bg-gray-200 p-3 shadow-md"}
      >
        <p className={"font-serif text-3xl font-semibold tracking-wider"}>Đăng nhập</p>
        <div className={"w-full"}>
          <label htmlFor="user-name" className={"mb-2 block text-base font-medium font-medium text-gray-900"}>
            Tên đăng nhập
          </label>
          <input
            id={"user-name"}
            type="text"
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className={"w-full"}>
          <label htmlFor="password" className={"mb-2 block text-base font-medium font-medium text-gray-900"}>
            Mật khẩu
          </label>
          <input
            id={"password"}
            type="password"
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={"mt-4 flex w-full flex-col items-start gap-y-3"}>
          <button className={"w-full rounded-lg bg-[#0077b6] py-2 text-white duration-300 hover:bg-[#023e8a]"}>
            Đăng nhập
          </button>
          <div className={"flex flex-row items-center gap-x-6"}>
            <NavLink to={"/reset-password"} className={"text-sm duration-100 hover:font-bold hover:underline"}>
              Quên mật khẩu?
            </NavLink>
            <NavLink to={"/"} className={"text-sm duration-100 hover:font-bold hover:underline"}>
              Quay lại trang chủ
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

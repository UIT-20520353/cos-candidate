import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { userLogin } from "./user.reducer";
import { IAccount, IFormLoginValue } from "../../types/account.type";
import { getAccountList } from "../../Query/api/account-services";
import { SubmitHandler, useForm } from "react-hook-form";

function Login() {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormLoginValue>();

  useEffect(() => {
    getAccountList().then((data) => {
      if (data) {
        setAccounts(data ?? []);
      }
    });
  }, []);

  const onSubmit: SubmitHandler<IFormLoginValue> = (data) => {
    const result = accounts.find((account) => {
      return (
        data.username === account.username && data.password === account.password && account.roles.name === "CANDIDATE"
      );
    });
    if (result) {
      sessionStorage.setItem("id", result.id.toString());
      sessionStorage.setItem("name", result.name);
      dispatch(userLogin({ id: result.id, name: result.name }));
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: true,
        timer: 3000,
        allowOutsideClick: false
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Đăng nhập không thành công",
        text: "Tên đăng nhập hoặc mật khẩu không chính xác",
        showConfirmButton: true,
        timer: 4000,
        allowOutsideClick: false
      });
    }
  };

  return (
    <div className={"flex h-screen items-center justify-center"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex w-1/2 flex-col items-center gap-y-5 rounded-md bg-gray-200 p-3 shadow-md"}
      >
        <p className={"font-serif text-3xl font-semibold tracking-wider"}>Đăng nhập</p>
        <div className={"relative w-full"}>
          <span className={"mb-2 block text-base font-medium font-medium text-gray-900"}>Tên đăng nhập</span>
          <input
            id={"user-name"}
            type="text"
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            autoComplete={"off"}
            {...register("username", { required: "Vui lòng nhập tên đăng nhập" })}
          />
          {errors.username && <span className={"absolute text-xs text-red-600"}>{errors.username.message}</span>}
        </div>
        <div className={"relative w-full"}>
          <span className={"mb-2 block text-base font-medium font-medium text-gray-900"}>Mật khẩu</span>
          <input
            id={"password"}
            type="password"
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            autoComplete={"off"}
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
          />
          {errors.password && <span className={"absolute text-xs text-red-600"}>{errors.password.message}</span>}
        </div>
        <div className={"mt-4 flex w-full flex-col items-start gap-y-3"}>
          <button className={"w-full rounded-lg bg-[#0077b6] py-2 text-white duration-300 hover:bg-[#023e8a]"}>
            Đăng nhập
          </button>
          <div className={"flex flex-row items-center gap-x-6"}>
            <NavLink to={"/register"} className={"text-sm duration-100"}>
              Chưa có tài khoản? <span className={"hover:underline"}>Đăng ký</span>
            </NavLink>
            <NavLink to={"/reset-password"} className={"text-sm duration-100 hover:underline"}>
              Quên mật khẩu?
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

export default Login;

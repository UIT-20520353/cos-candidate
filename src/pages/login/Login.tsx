import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormLoginValue, ISimpleAccount } from "~/types";
import { handleLogin } from "~/Query";
import { useSessionStorage } from "~/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { LoadingModal } from "~/components";
import CryptoJS from "crypto-js";

function Login() {
  const navigate = useNavigate();
  const [, setUser] = useSessionStorage("cos-candidate", null);
  const { register, handleSubmit } = useForm<IFormLoginValue>();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (body: IFormLoginValue) => {
      const hashPassword = CryptoJS.SHA256(body.password).toString();
      return handleLogin(body.username, hashPassword);
    },
    onSuccess: (data: ISimpleAccount) => {
      if (data.id === -1) {
        toast("Tên đăng nhập hoặc mật khẩu không chính xác", {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false,
          type: "error"
        });
        return;
      }
      setUser({ id: data.id, name: data.name });
      navigate("/");
      toast("Đăng nhập thành công", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "success"
      });
    }
  });

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const onSubmit: SubmitHandler<IFormLoginValue> = (data) => {
    if (!data.username) {
      toast("Vui lòng nhập tên đăng nhập", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "warning"
      });
      return;
    }
    if (!data.password) {
      toast("Vui lòng nhập mật khẩu", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "warning"
      });
      return;
    }
    login(data);
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
            {...register("username")}
          />
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
            {...register("password")}
          />
        </div>
        <div className={"flex w-full flex-col items-start gap-y-3"}>
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
      {isLoading && <LoadingModal title={"Đang xử lý đăng nhập"} />}
    </div>
  );
}

export default Login;

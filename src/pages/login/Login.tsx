import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className={"flex h-screen items-center justify-center"}>
      <div className={"flex w-1/2 flex-col items-center gap-y-5 rounded-md bg-gray-200 p-3 shadow-md"}>
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
          />
        </div>
        <div className={"mt-4 flex w-full flex-col items-start gap-y-3"}>
          <button className={"w-full rounded-lg bg-[#0077b6] py-2 text-white duration-300 hover:bg-[#023e8a]"}>
            Đăng nhập
          </button>
          <div className={"flex flex-row items-center gap-x-6"}>
            <NavLink to={"/"} className={"text-sm duration-100 hover:font-bold hover:underline"}>
              Quên mật khẩu?
            </NavLink>
            <NavLink to={"/"} className={"text-sm duration-100 hover:font-bold hover:underline"}>
              Quay lại trang chủ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

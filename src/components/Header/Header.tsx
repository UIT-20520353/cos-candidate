import logo from "../../assets/transparent-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { userLogout } from "../../pages/login/user.reducer";

function Header() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    dispatch(userLogout());
    navigate("/", { replace: true });
  };

  return (
    <div className={"sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-gray-50 px-12 shadow-md"}>
      <NavLink to={"/"}>
        <img src={logo} className={"ml-16 h-10 cursor-pointer"} alt={""} />
      </NavLink>
      <div className={"flex flex-row items-center gap-x-10"}>
        <NavLink
          className={({ isActive }) =>
            `border-b-[3px] font-sans text-lg font-medium duration-300 ease-linear hover:border-black ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
          to={"/problem/list"}
        >
          Danh sách bài tập
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `border-b-[3px] font-sans text-lg font-medium duration-300 ease-linear hover:border-black ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
          to={"/contest/list"}
          end={true}
        >
          Danh sách cuộc thi
        </NavLink>
        {user.id !== -1 && (
          <NavLink
            className={({ isActive }) =>
              `border-b-[3px] font-sans text-lg font-medium duration-300 ease-linear hover:border-black ${
                isActive ? "border-black" : "border-transparent"
              }`
            }
            to={"/contest/list/registered"}
            end={true}
          >
            Làm bài thi
          </NavLink>
        )}
        <NavLink
          className={({ isActive }) =>
            `border-b-[3px] font-sans text-lg font-medium duration-300 ease-linear hover:border-black ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
          to={"/ranking"}
        >
          Bảng xếp hạng
        </NavLink>
        {user.id === -1 ? (
          <div className={"flex flex-row gap-x-3"}>
            <NavLink to={"/register"} className={"rounded-full px-4 py-2 text-base font-medium hover:text-[#0077b6]"}>
              Đăng ký
            </NavLink>
            <NavLink
              to={"/login"}
              className={"rounded-full bg-[#0077b6] px-4 py-2 text-base font-medium text-white hover:bg-[#023e8a]"}
            >
              Đăng nhập
            </NavLink>
          </div>
        ) : (
          <button type={"button"} onClick={logout}>
            <CgProfile className={"h-10 w-10 cursor-pointer opacity-60 duration-300 hover:opacity-100"} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;

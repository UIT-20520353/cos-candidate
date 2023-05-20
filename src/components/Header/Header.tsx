import logo from "../../assets/transparent-logo.svg";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/all";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Header() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className={"sticky top-0 z-50 flex h-20 w-full items-center justify-between bg-gray-50 px-12 shadow-md"}>
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
          to={"/contests"}
        >
          Danh sách cuộc thi
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `border-b-[3px] font-sans text-lg font-medium duration-300 ease-linear hover:border-black ${
              isActive ? "border-black" : "border-transparent"
            }`
          }
          to={"/teams"}
        >
          Danh sách đội
        </NavLink>
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
        {!user.id ? (
          <div className={"flex flex-row gap-x-3"}>
            <button className={"rounded-full px-4 py-2 text-base font-medium hover:text-[#0077b6]"}>Đăng ký</button>
            <NavLink
              to={"/login"}
              className={"rounded-full bg-[#0077b6] px-4 py-2 text-base font-medium text-white hover:bg-[#023e8a]"}
            >
              Đăng nhập
            </NavLink>
          </div>
        ) : (
          <CgProfile className={"h-10 w-10 cursor-pointer"} />
        )}
      </div>
    </div>
  );
}

export default Header;

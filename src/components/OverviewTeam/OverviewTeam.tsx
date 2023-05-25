import { FaUserAlt } from "react-icons/all";

type IMember = {
  id: string;
  name: string;
};
const members: IMember[] = [
  {
    id: "user-1-1",
    name: "Trương Xuân Vương"
  },
  {
    id: "user-2-2",
    name: "Bùi Đoàn Khánh Ân"
  }
];

function OverviewTeam() {
  return (
    <li
      id={"team-1-1"}
      className={
        "flex flex-row items-start justify-between rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"
      }
    >
      <div>
        <p className={"mb-3 truncate text-lg font-semibold"}>Đội này mạnh</p>

        <ul>
          {members.map((member) => (
            <li
              id={member.id}
              key={member.id}
              className={"group mt-4 flex cursor-pointer flex-row items-center gap-x-2"}
            >
              <FaUserAlt className={"inline-block h-5 w-5 opacity-50 group-hover:opacity-100"} />
              <span className={"text-sm text-gray-500 group-hover:text-black group-hover:underline"}>
                {member.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={"flex flex-col items-center gap-y-3"}>
        <button className={"rounded-md bg-[#78c6a3] px-4 py-2 text-sm hover:bg-[#469d89] hover:text-white"}>
          Tham gia
        </button>
      </div>
    </li>
  );
}

export default OverviewTeam;

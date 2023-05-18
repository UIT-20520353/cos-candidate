import { TiTick } from "react-icons/all";

type IProps = {
  title: string;
  status: boolean;
  handleClick: () => void;
};

function Checkbox(props: IProps) {
  return (
    <div
      role={"presentation"}
      className={"flex cursor-pointer flex-row items-center gap-x-3 duration-300"}
      onClick={props.handleClick}
    >
      <div
        className={`inline-block flex h-4 w-4 items-center justify-center rounded-sm border border-gray-500 ${
          props.status ? "bg-gray-500" : ""
        }`}
      >
        <TiTick className={`${props.status ? "text-white" : "text-transparent"} duration-300`} />
      </div>
      <span>{props.title}</span>
    </div>
  );
}

export default Checkbox;

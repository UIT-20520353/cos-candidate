import { ChangeEvent } from "react";

type IProps = {
  closeForm: () => void;
  amountMember: number;
  handleAmountChange: (input: number) => void;
};

function FormCreateTeam(props: IProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    props.handleAmountChange(value);
  };

  return (
    <div className={"flex w-full flex-col items-start gap-y-5 rounded-lg bg-gray-200 p-3 shadow-lg"}>
      <p className={"font-2xl font-bold"}>Thông tin đội</p>
      <div className={"grid w-full grid-cols-3 gap-x-5"}>
        <div className={"col-span-2 w-full"}>
          <label htmlFor={"name-team"} className={"mb-2 block text-sm font-medium text-gray-900"}>
            Tên đội
          </label>
          <input
            type="text"
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
          />
        </div>
        <div className={"w-full"}>
          <label htmlFor={"name-team"} className={"mb-2 block text-sm font-medium text-gray-900"}>
            Số lượng thành viên tối đa
          </label>
          <input
            type="number"
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            value={props.amountMember}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={"flex w-full flex-row-reverse gap-x-3"}>
        <button
          type={"button"}
          className={"font-lg rounded-md bg-red-500 px-10 py-2 font-medium text-white duration-300 hover:bg-red-600"}
          onClick={props.closeForm}
        >
          Hủy
        </button>
        <button
          type={"submit"}
          className={
            "font-lg rounded-md bg-green-500 px-10 py-2 font-medium text-white duration-300 hover:bg-green-600"
          }
        >
          Tạo đội
        </button>
      </div>
    </div>
  );
}

export default FormCreateTeam;

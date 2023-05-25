import Header from "../../components/Header";
import { TiPlus } from "react-icons/all";
import { FormEvent, useState } from "react";
import FormCreateTeam from "../../components/FormCreateTeam";
import Swal from "sweetalert2";
import OverviewTeam from "../../components/OverviewTeam";

function CreateTeam() {
  const min = 1;
  const max = 4;
  const [currentForm, setCurrentForm] = useState<boolean>(false);
  const [amountMember, setAmountMember] = useState<number>(1);

  const handleAmountChange = (input: number) => {
    const value = Math.max(min, Math.min(max, Number(input)));
    setAmountMember(value);
  };
  const handleCreateTeam = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(amountMember);
  };
  const closeCurrentForm = () => {
    setCurrentForm(false);
  };
  const openCurrentForm = () => {
    if (currentForm) {
      Swal.fire({
        icon: "warning",
        title: "Không thể tạo nhiều đội cùng lúc",
        showConfirmButton: true,
        timer: 2000
      });
      return;
    }
    setCurrentForm(true);
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Tạo đội mới</p>
        <button
          className={
            "group mt-3 flex h-14 w-14 items-center justify-center rounded-md bg-gray-200 duration-200 hover:bg-gray-300"
          }
          onClick={openCurrentForm}
        >
          <TiPlus className={"h-10 w-10 opacity-50 duration-200 group-hover:text-gray-800 group-hover:opacity-100"} />
        </button>
        <form onSubmit={handleCreateTeam} className={"mt-4"}>
          {currentForm && (
            <FormCreateTeam
              closeForm={closeCurrentForm}
              amountMember={amountMember}
              handleAmountChange={handleAmountChange}
            />
          )}
        </form>
        <p className={"mt-5 text-2xl font-medium text-[#10002b]"}>Các đội đã tham gia</p>
        <ul className={"mt-5 grid grid-cols-3 gap-4"}>
          <OverviewTeam />
        </ul>
      </div>
    </div>
  );
}

export default CreateTeam;

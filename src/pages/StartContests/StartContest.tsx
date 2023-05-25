import Header from "../../components/Header";

function StartContest() {
  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Các cuộc thi đã đăng ký</p>
      </div>
    </div>
  );
}

export default StartContest;

import Header from "~/components/Header";

function Ranking() {
  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <p className={"text-2xl font-medium text-[#10002b]"}>Bảng xếp hạng</p>
      </div>
    </div>
  );
}

export default Ranking;

import Header from "~/components/Header";
import { useEffect, useState } from "react";
import OverviewContest from "~/components/OverviewContest";
import Search from "~/components/Search";
import { useSessionStorage } from "~/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchDataStartContest } from "~/Query";
import StartContestSkeleton from "~/skeletons/start-contest-skeleton";

function StartContest() {
  const [searchText, setSearchText] = useState<string>("");
  const [user] = useSessionStorage("cos-candidate", null);

  const { data: registeredContests, isLoading: isFetchingRegisteredContests } = useQuery({
    queryKey: ["registered-contest-list", "filter", searchText],
    queryFn: () => {
      return fetchDataStartContest(user.id, searchText);
    }
  });

  useEffect(() => {
    document.title = "Bắt đầu thi";
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <div className={"flex w-full flex-row items-center justify-between"}>
          <p className={"text-2xl font-medium text-[#10002b]"}>Bắt đầu cuộc thi</p>
          <Search placeHolder={"Nhập tên cuộc thi"} handleSearch={handleSearch} />
        </div>
        {isFetchingRegisteredContests && <StartContestSkeleton />}
        {!isFetchingRegisteredContests && (
          <ul className={"mt-5 grid grid-cols-3 gap-4"}>
            {registeredContests?.map((contest) => (
              <OverviewContest key={`contest-${contest.id}`} contest={contest} typeOverview={false} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StartContest;

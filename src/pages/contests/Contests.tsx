import Header from "~/components/Header";
import OverviewContest from "~/components/OverviewContest";
import { useEffect, useState } from "react";
import { getAllContests } from "~/Query/api/contest-service";
import Search from "~/components/Search";
import ContestSkeleton from "~/skeletons/contest-skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchDataContests } from "~/Query";

function Contests() {
  useEffect(() => {
    document.title = "Đăng ký thi";
  }, []);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const { data: contests, isLoading } = useQuery({
    queryKey: ["contest-list", "filter", searchText],
    queryFn: () => {
      return fetchDataContests(searchText);
    }
  });

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"my-8 w-4/5"}>
        <div className={"flex w-full flex-row items-center justify-between"}>
          <p className={"text-2xl font-medium text-[#10002b]"}>Tất cả các cuộc thi</p>
          <Search placeHolder={"Nhập tên cuộc thi"} handleSearch={handleSearch} />
        </div>
        {isLoading && (
          <ul className={"mt-5 grid grid-cols-3 gap-4"}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <ContestSkeleton key={`contest-skeleton-${item}`} />
            ))}
          </ul>
        )}
        {!isLoading && (
          <div>
            {contests?.length !== 0 ? (
              <ul className={"mt-5 grid grid-cols-3 gap-4"}>
                {contests?.map((contest) => (
                  <OverviewContest key={`contest-${contest.id}`} contest={contest} typeOverview={true} />
                ))}
              </ul>
            ) : (
              <>{searchText !== "" ? <p>Không có kết quả cần tìm</p> : <p>Không có cuộc thi để đăng ký</p>}</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contests;

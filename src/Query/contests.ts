import { IAllContest } from "~/types";
import { getAllContests } from "~/Query";
import { getContestStatus } from "~/utils";

export async function fetchDataContests(searchText: string): Promise<IAllContest[]> {
  try {
    const contests = await getAllContests(searchText);
    return contests.filter((contest) => {
      return getContestStatus(contest.date_begin, contest.time_begin, contest.duration).status !== "Đã kết thúc";
    });
  } catch (error) {
    console.error("fetchData: ", error);
    return [];
  }
}

import { getAllContests, getRegisteredContests } from "~/Query";
import { IAllContest } from "~/types";

export async function fetchDataStartContest(userId: number, searchText: string): Promise<IAllContest[]> {
  try {
    const contests = await getAllContests("");
    const registeredContests = await getRegisteredContests(userId, searchText);
    const result: IAllContest[] = [];
    for (const registeredContest of registeredContests) {
      const temp = contests.find((contest) => registeredContest.id === contest.id);
      if (temp) result.push(temp);
    }
    return result;
  } catch (error) {
    console.error("fetchData: ", error);
    return [];
  }
}

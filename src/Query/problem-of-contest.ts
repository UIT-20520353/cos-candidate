import { getProblemsByContestId } from "~/Query";
import { IProblem } from "~/types";

export async function fetchDataProblemOfContest(contestId: number): Promise<IProblem[]> {
  try {
    return await getProblemsByContestId(contestId);
  } catch (error) {
    console.error("fetchDataProblemOfContest: ", error);
    return [];
  }
}

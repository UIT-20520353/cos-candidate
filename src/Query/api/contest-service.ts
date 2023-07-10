import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { getContestStatus } from "~/utils";
import { IAllContest, IContest, IContestDashboard, IContestForRanking } from "~/types";

export async function getRegisteredContestList(userId: number, searchText: string): Promise<IContest> {
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .rpc("get_registered_contest_list", { candidate_id: userId, search_text: searchText })
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy tất cả cuộc thi: ", error);
  }
}

export async function getContestById(contestId: number): Promise<IContest> {
  const failResult: IContest = {
    id: -1,
    name: "",
    description: "",
    date_begin: "",
    time_begin: "",
    duration: "",
    host_id: null
  };

  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .eq("id", contestId)
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) {
      throw error;
    } else {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("getContestById: ", error);
    return failResult;
  }
}

export async function getContestsByContestIds(contestIds: number[]) {
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .in("id", contestIds)
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) {
      console.error("getContestsByContestIds: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getContestsByContestIds: ", error);
  }
}

export async function getContestListDashboard(): Promise<IContestDashboard[]> {
  try {
    const { data, error }: PostgrestResponse<IContestDashboard> = await supabase
      .rpc("get_contest_list_for_dashboard")
      .then((response) => response as PostgrestResponse<IContestDashboard>);
    if (error) {
      console.error("getContestListDashboard: ", error);
      return [];
    } else {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getContestListDashboard: ", error);
    return [];
  }
}
export async function getContestsForRanking(): Promise<IContestForRanking[]> {
  try {
    const { data, error }: PostgrestResponse<IContestForRanking> = await supabase
      .rpc("get_contests_for_ranking")
      .then((response) => response as PostgrestResponse<IContestForRanking>);
    if (error) {
      console.error("getContestsForRanking: ", error);
      return [];
    } else {
      if (data) {
        data.sort((a, b) => b.amount - a.amount);
        return data;
      } else return [];
    }
  } catch (error) {
    console.error("getContestsForRanking: ", error);
    return [];
  }
}

export async function getAllContests(searchText: string): Promise<IAllContest[]> {
  const { data, error }: PostgrestResponse<IAllContest> = await supabase
    .rpc("get_all_contests_candidate", { search_text: searchText })
    .then((response) => response as PostgrestResponse<IAllContest>);
  if (error) {
    throw error;
  } else {
    // await new Promise(resolve => setTimeout(resolve, 5000))
    if (data && data.length !== 0) {
      return data;
    } else return [];
  }
}

export async function getRegisteredContests(userId: number, searchText: string): Promise<IContest[]> {
  const { data, error }: PostgrestResponse<IContest> = await supabase
    .rpc("get_registered_contest_list", { candidate_id: userId, search_text: searchText })
    .then((response) => response as PostgrestResponse<IContest>);
  if (error) {
    throw new Error(error);
  } else {
    // await new Promise(resolve => setTimeout(resolve, 5000))
    if (data && data.length !== 0) {
      return data;
    } else return [];
  }
}

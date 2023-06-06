import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IContest } from "../../types/contest.type";

export async function getContestList() {
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
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

export async function getContestById(contestId: number) {
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .eq("id", contestId)
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) {
      console.error(error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy cuộc thi bằng id: ", error);
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

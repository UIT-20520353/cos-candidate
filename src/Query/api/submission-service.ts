import { ISubmission } from "~/types/submission.type";
import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

export async function insertSubmission(
  status: string,
  language: string,
  code: string,
  problem_id: number,
  account_id: number
): Promise<boolean> {
  const currentDate = new Date();

  const { data, error }: PostgrestResponse<ISubmission> = await supabase
    .from("submissions")
    .insert({
      code: code,
      status: status,
      language: language,
      date_submit: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
      time_submit: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
      problem_id: problem_id,
      account_id: account_id
    })
    .select("*")
    .then((response) => response as PostgrestResponse<ISubmission>);

  if (error) {
    throw error;
  } else {
    return !!data;
  }
}

export async function getListSubmissions(problem_id: number, account_id: number): Promise<ISubmission[]> {
  try {
    const { data, error }: PostgrestResponse<ISubmission> = await supabase
      .from("submissions")
      .select("*")
      .eq("problem_id", problem_id)
      .eq("account_id", account_id)
      .order("date_submit", { ascending: false })
      .order("time_submit", { ascending: false })
      .then((response) => response as PostgrestResponse<ISubmission>);
    if (error) {
      throw error;
    } else {
      if (data && data.length !== 0) return data;
      else return [];
    }
  } catch (error) {
    console.error("getListSubmissions: ", error);
    return [];
  }
}

export async function getAllSubmission() {
  try {
    const { data, error }: PostgrestResponse<ISubmission> = await supabase
      .from("submissions")
      .select("*")
      .then((response) => response as PostgrestResponse<ISubmission>);
    if (error) {
      console.error("getAllSubmission: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getAllSubmission: ", error);
  }
}

export async function getSubmissionsByProblemId(problemId: number): Promise<ISubmission[]> {
  const { data, error }: PostgrestResponse<ISubmission> = await supabase
    .from("submissions")
    .select("*")
    .eq("problem_id", problemId)
    .then((response) => response as PostgrestResponse<ISubmission>);
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return data;
    else return [];
  }
}

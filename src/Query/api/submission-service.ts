import { ISubmission } from "../../types/submission.type";
import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

export async function insertSubmission(
  status: string,
  language: string,
  code: string,
  problem_id: number,
  account_id: number
) {
  try {
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
      console.error("insertSubmission: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("insertSubmission: ", error);
  }
}

export async function getListSubmissions(problem_id: number, account_id: number) {
  try {
    const { data, error }: PostgrestResponse<ISubmission> = await supabase
      .from("submissions")
      .select("*")
      .eq("problem_id", problem_id)
      .eq("account_id", account_id)
      .then((response) => response as PostgrestResponse<ISubmission>);
    if (error) {
      console.error("getListSubmissions: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getListSubmissions: ", error);
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

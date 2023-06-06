import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IProblem } from "../../types/problem.type";

export async function getProblemsByContestId(contest_id: number) {
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("contest_id", contest_id)
      .then((response) => response as PostgrestResponse<IProblem>);
    if (error) {
      console.error("getProblemsByContestId: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getProblemsByContestId: ", error);
  }
}

export async function getProblemsById(problem_id: number) {
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("id", problem_id)
      .then((response) => response as PostgrestResponse<IProblem>);
    if (error) {
      console.error("getProblemsById: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getProblemsById: ", error);
  }
}

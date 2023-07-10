import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IOverviewProblem, IProblem } from "~/types/problem.type";

export async function getProblemsByContestId(contest_id: number): Promise<IProblem[]> {
  const { data, error }: PostgrestResponse<IProblem> = await supabase
    .from("problems")
    .select("*")
    .eq("contest_id", contest_id)
    .then((response) => response as PostgrestResponse<IProblem>);
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return data;
    else return [];
  }
}

export async function getProblemsById(problem_id: number): Promise<IProblem> {
  const failResult: IProblem = {
    id: -1,
    name: "",
    detail: "",
    example_input: "",
    example_output: "",
    contest_id: -1
  };
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("id", problem_id)
      .then((response) => response as PostgrestResponse<IProblem>);
    if (error) {
      throw error;
    } else {
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("getProblemsById: ", error);
    return failResult;
  }
}

export async function getProblemsAndCount(): Promise<IOverviewProblem[]> {
  try {
    const { data, error }: PostgrestResponse<IOverviewProblem> = await supabase
      .rpc("get_problem_list_and_count")
      .then((response) => response as PostgrestResponse<IOverviewProblem>);
    if (error) {
      throw error;
    } else {
      if (data && data.length !== 0) return data;
      else return [];
    }
  } catch (error) {
    console.error("getProblemsAndCount: ", error);
    return [];
  }
}

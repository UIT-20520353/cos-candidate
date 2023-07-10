import { PostgrestResponse } from "@supabase/supabase-js";
import { ITestcase } from "~/types";
import supabase from "./supabase";

export async function getTestcaseList(problem_id: number): Promise<ITestcase[]> {
  const { data, error }: PostgrestResponse<ITestcase> = await supabase
    .from("testcases")
    .select("*")
    .eq("problem_id", problem_id)
    .then((response) => response as PostgrestResponse<ITestcase>);

  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return data;
    else return [];
  }
}

import { PostgrestResponse } from "@supabase/supabase-js";
import { ITestcase } from "../../types/testcase.type";
import supabase from "./supabase";

export async function getTestcaseList(problem_id: number): Promise<ITestcase> {
  try {
    const { data, error }: PostgrestResponse<ITestcase> = await supabase
      .from("testcases")
      .select("*")
      .eq("problem_id", problem_id)
      .then((response) => response as PostgrestResponse<ITestcase>);

    if (error) {
      console.error("getTestcaseList: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getTestcaseList: ", error);
  }
}

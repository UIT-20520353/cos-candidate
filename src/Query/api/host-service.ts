import supabase from "./supabase";

export async function getNameHostByContestId(contest_id: number) {
  try {
    const { data, error } = await supabase.from("hosts").select("");
  } catch (error) {
    console.error("getNameHostByContestId: ", error);
  }
}

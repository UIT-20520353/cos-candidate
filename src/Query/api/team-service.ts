import { IFormTeamValue, ITeam, ITeamId, ITeamMember, IContestId, ITeamRank } from "~/types";
import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IDataRankContest } from "~/Query";

export async function insertTeam(team: IFormTeamValue): Promise<ITeam> {
  const { data, error }: PostgrestResponse<ITeam> = await supabase
    .from("teams")
    .insert({
      name: team.name,
      max_member: team.max_member,
      contest_id: team.contestId
    })
    .select("*")
    .then((response) => response as PostgrestResponse<ITeam>);
  if (error) {
    throw new Error(error);
  } else {
    if (data && data.length !== 0) return data[0];
    else throw new Error("Không thêm được team");
  }
}

export async function insertTeamMember(team: ITeam, accountId: number): Promise<boolean> {
  const { data, error }: PostgrestResponse<ITeamMember> = await supabase
    .from("team_members")
    .insert({
      team_id: team.id,
      account_id: accountId,
      is_leader: true
    })
    .select("*")
    .then((response) => response as PostgrestResponse<ITeamMember>);
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return true;
    else throw new Error("Lỗi khi thêm team member");
  }
}

export async function getTeamList(contestId: number): Promise<ITeam[]> {
  const { data, error }: PostgrestResponse<ITeam> = await supabase
    .rpc("get_team_list", { contestid: contestId })
    // .from("teams")
    // .select("*")
    // .eq("contest_id", contestId)
    // .order("max_member", { ascending: false })
    .then((response) => response as PostgrestResponse<ITeam>);
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return data;
    else {
      return [];
    }
  }
}

export async function getTeamMember(teamId: number): Promise<ITeamMember[]> {
  const { data, error }: PostgrestResponse<ITeamMember> = await supabase
    .rpc("get_team_members", { teamid: teamId })
    .then((response) => response as PostgrestResponse<ITeamMember>);
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return data;
    else return [];
  }
}

export async function handleJoinTeamAPI(teamId: number, accountId: number): Promise<boolean> {
  const { data, error } = await supabase
    .from("team_members")
    .insert({
      team_id: teamId,
      account_id: accountId,
      is_leader: false
    })
    .select("*");
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return true;
    else {
      console.error("handleJoinTeamAPI");
      return false;
    }
  }
}

export async function leaveTeam(id: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("team_members").delete().eq("id", id).select("*");
    if (error) {
      throw error;
    } else {
      return true;
    }
  } catch (error) {
    console.error("leaveTeam: ", error);
    return false;
  }
}

export async function deleteTeam(teamId: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("teams").delete().eq("id", teamId).select("*");
    if (error) {
      throw error;
    } else {
      return true;
    }
  } catch (error) {
    console.error("deleteTeam: ", error);
    return false;
  }
}

export async function getTeamsByContestId(contestId: number): Promise<ITeam[]> {
  const { data, error }: PostgrestResponse<ITeam> = await supabase
    .from("teams")
    .select("*")
    .eq("contest_id", contestId)
    .then((response) => response as PostgrestResponse<ITeam>);
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return data;
    else return [];
  }
}

export async function getTeamRanks(contest_id: number): Promise<ITeamRank[]> {
  const { data, error }: PostgrestResponse<ITeamRank> = await supabase
    .rpc("calculate_team_ranks", { id_query: contest_id })
    .then((response) => response as PostgrestResponse<ITeamRank>);
  if (error) {
    throw error;
  } else {
    if (data) return data;
    else return [];
  }
}

export async function getRankContest(contestId: number): Promise<IDataRankContest[]> {
  const { data, error }: PostgrestResponse<IDataRankContest> = await supabase
    .rpc("get_rank_contest", { contestid: contestId })
    .then((response) => response as PostgrestResponse<IDataRankContest>);
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return data;
    else return [];
  }
}

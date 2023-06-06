import { IFormTeamValue, ITeam, ITeamId, ITeamMember, ITeamMemberDetail } from "../../types/team.type";
import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IContestId } from "../../types/contest.type";

export async function insertTeam(team: IFormTeamValue) {
  try {
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
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi insert team: ", error);
  }
}

export async function handleCreateTeam(valueForm: IFormTeamValue, accountId: number) {
  try {
    let team: ITeam = {
      id: 0,
      name: "",
      max_member: 0,
      contest_id: 0,
      score: 0
    };
    await insertTeam(valueForm).then((response) => {
      if (response && response.length !== 0) {
        team = response[0];
      }
    });
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
      return data;
    }
  } catch (error) {
    console.error("Lỗi create team: ", error);
  }
}

export async function getTeamList(contestId: number) {
  try {
    const { data, error }: PostgrestResponse<ITeam> = await supabase
      .from("teams")
      .select("*")
      .eq("contest_id", contestId)
      .then((response) => response as PostgrestResponse<ITeam>);
    if (error) {
      console.error("Lỗi get team list: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi get team list: ", error);
  }
}

export async function getTeamMember(teamIds: number[]) {
  try {
    const { data, error }: PostgrestResponse<ITeamMemberDetail> = await supabase
      .from("team_members")
      .select(`*, accounts("*")`)
      .in("team_id", teamIds)
      .then((response) => response as PostgrestResponse<ITeamMemberDetail>);
    if (error) {
      console.error("Lỗi get team member: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi get team member: ", error);
  }
}

export async function handleJoinTeamAPI(teamId: number, accountId: number) {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .insert({
        team_id: teamId,
        account_id: accountId,
        is_leader: false
      })
      .select("*");
    if (error) {
      console.error("Lỗi join team: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi join team: ", error);
  }
}

export async function handleLeaveTeamAPI(id: number) {
  try {
    const { data, error } = await supabase.from("team_members").delete().eq("id", id).select("*");
    if (error) {
      console.error("Lỗi leave team: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi leave team: ", error);
  }
}

export async function handleDeleteTeam(teamId: number) {
  try {
    const { data, error } = await supabase.from("teams").delete().eq("id", teamId).select("*");
    if (error) {
      console.error("Lỗi delete team: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi delete team: ", error);
  }
}

export async function getTeams() {
  try {
    const { data, error }: PostgrestResponse<ITeam> = await supabase
      .from("teams")
      .select("*")
      .then((response) => response as PostgrestResponse<ITeam>);
    if (error) {
      console.error("Lỗi lấy danh sách đội: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi lấy danh sách đội: ", error);
  }
}

export async function getTeamIds(account_id: number) {
  try {
    const { data, error }: PostgrestResponse<ITeamId> = await supabase
      .from("team_members")
      .select("team_id")
      .eq("account_id", account_id)
      .then((response) => response as PostgrestResponse<ITeamId>);

    if (error) {
      console.error("getTeamMemberIds: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getTeamMemberIds: ", error);
  }
}

export async function getContestIds(teamIds: number[]) {
  try {
    const { data, error }: PostgrestResponse<IContestId> = await supabase
      .from("teams")
      .select("contest_id")
      .in("id", teamIds)
      .then((response) => response as PostgrestResponse<IContestId>);
    if (error) {
      console.error("getContestIds: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getContestIds: ", error);
  }
}

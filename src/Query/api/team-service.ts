import { IFormTeamValue, ITeam, ITeamMember, ITeamMemberDetail } from "../../types/team.type";
import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Đang tạo đội",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });
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
    Swal.close();
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi create team: ", error);
    Swal.close();
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

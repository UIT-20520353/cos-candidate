import { IFormTeamValue, ITeam, ITeamMember } from "~/types";
import { getTeamList, getTeamMember, handleJoinTeamAPI, insertTeam, insertTeamMember } from "~/Query";

export interface IDataRegisterTeam {
  team: ITeam;
  teamMembers: ITeamMember[];
}

export async function fetchDataRegisterTeam(contestId: number): Promise<IDataRegisterTeam[]> {
  try {
    const teams = await getTeamList(contestId);
    const data: IDataRegisterTeam[] = [];
    // await Promise.all(
    //   teams.map(async (team) => {
    //     const teamMembers = await getTeamMember(team.id);
    //     data.push({ team, teamMembers });
    //   })
    // );
    for (const team of teams) {
      const teamMembers = await getTeamMember(team.id);
      data.push({ team, teamMembers });
    }
    data.sort((a, b) => b.team.max_member - a.team.max_member);
    return data;
  } catch (error) {
    console.error("fetchData: ", error);
    return [];
  }
}

export async function createTeam(body: IFormTeamValue, accountId: number): Promise<boolean> {
  try {
    const team = await insertTeam(body);
    await insertTeamMember(team, accountId);
    return true;
  } catch (error) {
    console.error("createTeam: ", error);
    return false;
  }
}

export async function joinTeam(teamId: number, accountId: number): Promise<boolean> {
  try {
    return await handleJoinTeamAPI(teamId, accountId);
  } catch (error) {
    console.error("joinTeam: ", error);
    return false;
  }
}

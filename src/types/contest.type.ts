export type IOverviewContest = {
  id: string;
  name: string;
  amount: number;
  date: string;
  time: string;
  duration: string;
  registered: boolean;
};

export type IStatus = {
  notStarted: boolean;
  playing: boolean;
  played: boolean;
  registered: boolean;
};

export interface IContest {
  id: number;
  name: string;
  description: string;
  date_begin: string;
  time_begin: string;
  duration: string;
  host_id: number | null;
}

export type IContestId = {
  contest_id: number;
};

export type IContestDashboard = {
  id: number;
  name: string;
  date_begin: string;
  time_begin: string;
  host_name: string;
};

export type IContestForRanking = {
  id: number;
  name: string;
  amount: number;
};

export type IAllContest = IContest & { amount: number };

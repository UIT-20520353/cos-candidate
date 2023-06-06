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

export type IContest = {
  id: number;
  name: string;
  description: string;
  date_begin: string;
  time_begin: string;
  duration: string;
  host_id: number | null;
};

export type IContestId = {
  contest_id: number;
};

export type IOverviewContest = {
  id: string;
  name: string;
  amount: number;
  date: string;
  time: string;
};

export type IStatus = {
  notStarted: boolean;
  playing: boolean;
  played: boolean;
};

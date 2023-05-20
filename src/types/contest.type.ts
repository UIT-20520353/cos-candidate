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

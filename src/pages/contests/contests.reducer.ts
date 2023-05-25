import { createAction, createReducer } from "@reduxjs/toolkit";
import { IOverviewContest } from "../../types/contest.type";

const initialContests: IOverviewContest[] = [
  {
    id: "question-1-2",
    name: "Beginner Free Contest 51",
    amount: 32,
    date: "2023-06-02",
    time: "10:00",
    duration: "2 giờ",
    registered: false
  },
  {
    id: "question-2-3",
    name: "Testing Round 49",
    amount: 25,
    date: "2023-05-18",
    time: "14:00",
    duration: "3 giờ",
    registered: false
  },
  {
    id: "question-4-3",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 50,
    date: "2023-04-30",
    time: "05:00",
    duration: "1 giờ 30 phút",
    registered: false
  },
  {
    id: "question-5-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-07-12",
    time: "08:00",
    duration: "3 giờ",
    registered: false
  },
  {
    id: "question-6-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-06-06",
    time: "08:00",
    duration: "3 giờ",
    registered: false
  },
  {
    id: "question-7-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-05-02",
    time: "08:00",
    duration: "3 giờ",
    registered: true
  },
  {
    id: "question-8-2",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-06-01",
    time: "08:00",
    duration: "3 giờ",
    registered: false
  },
  {
    id: "question-9-2",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-05-11",
    time: "10:00",
    duration: "1 giờ 30 phút",
    registered: false
  },
  {
    id: "question-10-1",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 47,
    date: "2023-06-01",
    time: "08:00",
    duration: "3 giờ",
    registered: true
  }
];

export const cancelRegistration = createAction<string>("contests/cancel");

const contestsReducer = createReducer(initialContests, (builder) => {
  builder.addCase(cancelRegistration, (state, action) => {
    const id = action.payload;
    const temp = state.map((contest) => {
      if (contest.id === id)
        return {
          ...contest,
          registered: false
        };
      else return contest;
    });

    state = [...temp];
  });
});

export default contestsReducer;

import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IContest } from "../../types/contest.type";
import Swal from "sweetalert2";

export async function getContestList() {
  try {
    Swal.fire({
      title: "Đang lấy dữ liệu cuộc thi",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .then((response) => response as PostgrestResponse<IContest>);
    Swal.close();
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy tất cả cuộc thi: ", error);
    Swal.close();
  }
}

export async function getContestById(contestId: number) {
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .eq("id", contestId)
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) {
      console.error(error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy cuộc thi bằng id: ", error);
  }
}

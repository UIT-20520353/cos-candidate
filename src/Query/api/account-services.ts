import supabase from "./supabase";
import { IAccount, IFormValue } from "../../types/account.type";
import { PostgrestResponse } from "@supabase/supabase-js";

export async function insertAccount(account: IFormValue) {
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .insert({
        name: account.name,
        email: account.email,
        username: account.username,
        password: account.password,
        phone: account.phone,
        address: account.address,
        role_id: 3
      })
      .select("*")
      .then((response) => response as PostgrestResponse<IAccount>);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi thêm account: ", error);
  }
}

export async function getAccountList() {
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select(`*, roles("*")`)
      .then((response) => response as PostgrestResponse<IAccount>);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách account: ", error);
  }
}

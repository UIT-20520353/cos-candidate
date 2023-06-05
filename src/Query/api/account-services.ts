import supabase from "./supabase";
import { IAccount, IFormLoginValue, IFormValue } from "../../types/account.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

export async function insertAccount(account: IFormValue) {
  try {
    const hashPassword = CryptoJS.SHA256(account.password).toString();
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .insert({
        name: account.name,
        email: account.email,
        username: account.username,
        password: hashPassword,
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
      .select("*")
      .eq("role_id", 3)
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

export async function handleLogin(account: IFormLoginValue) {
  try {
    Swal.fire({
      title: "Đang xử lý đăng nhập",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });
    const hashPassword = CryptoJS.SHA256(account.password).toString();
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select("*")
      .eq("username", account.username)
      .eq("password", hashPassword)
      .then((response) => response as PostgrestResponse<IAccount>);
    Swal.close();
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi thực hiện đăng nhập: ", error);
    Swal.close();
  }
}

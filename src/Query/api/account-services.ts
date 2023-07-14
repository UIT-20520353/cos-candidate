import supabase from "./supabase";
import { IAccount, IFormValue, ISimpleAccount } from "~/types/account.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import CryptoJS from "crypto-js";

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

export async function getAccountList(): Promise<IAccount[]> {
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select("*")
      .then((response) => response as PostgrestResponse<IAccount>);
    if (error) {
      throw error;
    } else {
      if (data && data.length !== 0) return data;
      else return [];
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách account: ", error);
    return [];
  }
}

export async function handleLogin(username: string, password: string): Promise<ISimpleAccount> {
  const failResult: ISimpleAccount = {
    id: -1,
    name: ""
  };

  try {
    const { data, error }: PostgrestResponse<ISimpleAccount> = await supabase
      .rpc("handle_login", {
        password_login: password,
        role_login: 3,
        username_login: username
      })
      .then((response) => response as PostgrestResponse<ISimpleAccount>);
    if (error) {
      console.error("handleLogin :", error);
      return failResult;
    } else {
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("handleLogin :", error);
    return failResult;
  }
}

export async function updateAccount(id: number, name: string, email: string, phone: string, address: string) {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .update({
        name,
        email,
        phone,
        address
      })
      .eq("id", id)
      .select("*");
    if (error) {
      console.error("updateAccount: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("updateAccount: ", error);
  }
}

export async function getAccountInfo(id: number): Promise<IAccount> {
  const failResult: IAccount = {
    id: -1,
    name: "",
    username: "",
    password: "",
    email: null,
    phone: null,
    birth_day: null,
    address: null,
    role_id: -1,
    host_id: -1
  };

  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select("*")
      .eq("id", id)
      .then((res) => res as PostgrestResponse<IAccount>);
    if (error) {
      throw error;
    } else {
      if (data && data.length !== 0) return data[0];
      return failResult;
    }
  } catch (error) {
    console.error("getAccountInfo: ", error);
    return failResult;
  }
}

export async function changePassword(id: number, password: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .update({
        password
      })
      .eq("id", id)
      .select("*");
    if (error) {
      throw error;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("changePassword: ", error);
    return false;
  }
}

export async function checkEmail(email: string): Promise<IAccount[] | undefined> {
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select("*")
      .eq("email", email)
      .eq("role_id", 3)
      .then((res) => res as PostgrestResponse<IAccount>);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("checkEmail: ", error);
  }
}

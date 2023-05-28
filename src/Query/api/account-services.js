import supabase from "./supabase";

async function getAccountByEmail(email) {
  const { data, error } = await supabase.from("accounts").select("*").eq("email", email);
  if (error) throw error;
  return data;
}

async function addAccount(account) {
  const { data, error } = await supabase
    .from("accounts")
    .insert({
      username: account.username,
      password: account.password,
      email: account.email,
      role_id: account.role_id
    })
    .select();
  if (error) throw error;
  return data;
}

async function updateAccount(account) {
  const { data, error } = await supabase.from("accounts").update({}).select();
  if (error) throw error;
  return data;
}
async function deleteAccount(id) {
  const { data, error } = await supabase.from("accounts").delete().eq("id", id).select();
  if (error) throw error;
  return data;
}
export { getAccountByEmail, addAccount, updateAccount, deleteAccount };

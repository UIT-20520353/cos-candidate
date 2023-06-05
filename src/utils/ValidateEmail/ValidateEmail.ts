export const isEmailValid = (value: string) => {
  // Kiểm tra tính hợp lệ của email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Email không hợp lệ";
};

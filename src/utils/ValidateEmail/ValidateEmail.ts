export const isEmailValid = (value: string | null) => {
  if (!value) {
    return "Vui lòng nhập email";
  }

  // Kiểm tra tính hợp lệ của email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Email không hợp lệ";
};

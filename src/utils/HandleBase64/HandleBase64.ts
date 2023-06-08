export function base64ToPlainText(base64String: string): string {
  const decodedBase64 = atob(base64String);
  const decodedPlainText = decodeURIComponent(escape(decodedBase64));
  return decodedPlainText;
}

export function maskPhone(phone?: string): string {
  if (!phone) {
    return "";
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) {
    return "****";
  }
  const head = digits.slice(0, 3);
  const tail = digits.slice(-4);
  return `${head}****${tail}`;
}

export function maskHandle(value?: string): string {
  if (!value) {
    return "";
  }
  if (value.length <= 3) {
    return "***";
  }
  return `${value.slice(0, 1)}***${value.slice(-1)}`;
}

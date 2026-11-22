export const TEACHER_ACCOUNT = "llteacher01";

export function isTeacherAccount(account: string | null | undefined): boolean {
  return (account ?? "").trim().toLowerCase() === TEACHER_ACCOUNT;
}

import { createServerFn } from "@tanstack/react-start";

export const signInStudent = createServerFn({ method: "POST" })
  .inputValidator((data: { account: string; password: string }) => ({
    account: String(data?.account ?? ""),
    password: String(data?.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const { verifyStudent, verifyTeacher } = await import("./class-roster.server");
    const person = (await verifyStudent(data.account, data.password)) ?? (await verifyTeacher(data.account, data.password));
    if (!person) return { ok: false as const };
    let token = "";
    try {
      const { openChatSession } = await import("./chat.server");
      token = await openChatSession(person.account);
    } catch {
      token = "";
    }
    return { ok: true as const, account: person.account, name: person.name, token };
  });

export const changePassword = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string; current: string; next: string }) => ({
    token: String(data?.token ?? ""),
    current: String(data?.current ?? ""),
    next: String(data?.next ?? ""),
  }))
  .handler(async ({ data }) => {
    const { sessionAccount } = await import("./chat.server");
    const account = await sessionAccount(data.token);
    if (!account) return { ok: false as const, error: "請先登入。" };
    const { changeClassPassword } = await import("./class-roster.server");
    return changeClassPassword(account, data.current, data.next);
  });

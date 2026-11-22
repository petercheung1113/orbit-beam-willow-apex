import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as builtinChoices, d as useClassChat, g as AvatarFace, p as changePassword, u as shrinkAvatar, v as choiceFor } from "./router-VNKMmnlx.mjs";
import { r as Shell } from "./Shell-Cqn6vIRv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CIqG6zDy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {}) });
}
function ProfileForm() {
	const room = useClassChat();
	const mine = room.mates.find((mate) => mate.account === room.me);
	const [name, setName] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [nextPassword, setNextPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [passwordPending, setPasswordPending] = (0, import_react.useState)(false);
	const choice = choiceFor(room.me, room.avatars[room.me]);
	(0, import_react.useEffect)(() => {
		if (mine && mine.name !== mine.seat) setName((current) => current || mine.name);
	}, [mine]);
	if (!room.token) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-md px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "先在聊天室輸入密碼，就可以改名字、頭像和密碼。"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/chat",
			className: "mt-4 inline-flex h-12 items-center rounded-2xl bg-grass px-4 font-bold text-paper",
			children: "去聊天室"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-lg px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-coral",
				children: "6D"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl text-ink",
				children: "個人資料"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "改完的名字和頭像，同學在聊天室都會見到。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
					choice,
					online: true,
					className: "size-16"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-bold text-ink",
					children: mine && mine.name !== mine.seat ? mine.name : "未改名"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"班別學號 ",
						mine?.seat ?? room.me,
						"，改名後仍會顯示"
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6",
				onSubmit: async (event) => {
					event.preventDefault();
					setPending(true);
					const next = await room.saveName(name);
					setError(next);
					setNote(next ? "" : "已記住你的名字。班別學號不會變。");
					setPending(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-bold",
						htmlFor: "display-name",
						children: "名字"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "display-name",
						value: name,
						maxLength: 12,
						placeholder: "例如小明",
						onChange: (event) => setName(event.target.value),
						className: "mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: pending,
						className: "mt-3 h-11 rounded-2xl bg-ink px-4 font-bold text-paper disabled:opacity-60",
						children: pending ? "儲存中…" : "儲存名字"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8",
				onSubmit: async (event) => {
					event.preventDefault();
					if (!currentPassword) {
						setError("請先輸入現在的密碼。");
						setNote("");
						return;
					}
					if (nextPassword.length < 4) {
						setError("新密碼最少 4 個字。");
						setNote("");
						return;
					}
					if (nextPassword.length > 20) {
						setError("新密碼最多 20 個字。");
						setNote("");
						return;
					}
					if (nextPassword !== confirmPassword) {
						setError("兩次新密碼不相同。");
						setNote("");
						return;
					}
					if (!room.token) return;
					setPasswordPending(true);
					try {
						const result = await changePassword({ data: {
							token: room.token,
							current: currentPassword,
							next: nextPassword
						} });
						if (!result.ok) {
							setError(result.error);
							setNote("");
							return;
						}
						setCurrentPassword("");
						setNextPassword("");
						setConfirmPassword("");
						setError("");
						setNote("已更改密碼。下次登入請用新密碼。");
					} catch {
						setError("暫時改不到密碼，再試一次。");
						setNote("");
					} finally {
						setPasswordPending(false);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl text-ink",
						children: "更改密碼"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "要先輸入現在的密碼，才可以換成新密碼。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-3 block text-sm font-bold",
						htmlFor: "current-password",
						children: "現在的密碼"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "current-password",
						type: "password",
						autoComplete: "current-password",
						value: currentPassword,
						onChange: (event) => setCurrentPassword(event.target.value),
						className: "mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-3 block text-sm font-bold",
						htmlFor: "next-password",
						children: "新密碼"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "next-password",
						type: "password",
						autoComplete: "new-password",
						value: nextPassword,
						onChange: (event) => setNextPassword(event.target.value),
						className: "mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-3 block text-sm font-bold",
						htmlFor: "confirm-password",
						children: "再輸入新密碼"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "confirm-password",
						type: "password",
						autoComplete: "new-password",
						value: confirmPassword,
						onChange: (event) => setConfirmPassword(event.target.value),
						className: "mt-1 h-12 w-full rounded-2xl border-2 border-ink bg-paper px-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: passwordPending,
						className: "mt-3 h-11 rounded-2xl bg-grass px-4 font-bold text-paper disabled:opacity-60",
						children: passwordPending ? "更改中…" : "更改密碼"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 text-xl text-ink",
				children: "頭像"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-6 gap-2",
				children: builtinChoices().map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": id,
					onClick: () => {
						room.pickAvatar({
							kind: "builtin",
							id
						}).then((next) => {
							setError(next);
							setNote(next ? "" : "已換成內置頭像。");
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFace, {
						choice: {
							kind: "builtin",
							id
						},
						online: true,
						className: "size-12"
					})
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 inline-flex h-11 cursor-pointer items-center rounded-2xl border-2 border-ink px-4 text-sm font-bold",
				children: ["上傳圖片", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/png,image/jpeg,image/webp,image/gif",
					className: "sr-only",
					onChange: (event) => {
						const image = event.target.files?.[0];
						event.target.value = "";
						if (!image) return;
						shrinkAvatar(image).then(async (src) => {
							if (!src) {
								setError("圖片讀唔到，請換一張。");
								setNote("");
								return;
							}
							const next = await room.pickAvatar({
								kind: "upload",
								src
							});
							setError(next);
							setNote(next ? "" : "已換上你的圖片。");
						});
					}
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-bold text-coral",
				children: error
			}) : null,
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-bold text-grass",
				children: note
			}) : null
		]
	});
}
//#endregion
export { ProfilePage as component };

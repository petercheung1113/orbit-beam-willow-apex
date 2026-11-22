import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as speciesOf, i as WEARS, n as SPECIES, o as usePet, r as Shell, t as FOODS } from "./Shell-Cqn6vIRv.mjs";
import { t as PetSprite } from "./PetSprite-3Zzr--Pk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pets-CDgak7vg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PetsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetsHome, {}) });
}
function PetsHome() {
	const save = usePet((s) => s.save);
	const choose = usePet((s) => s.choose);
	const buyWear = usePet((s) => s.buyWear);
	const buyFood = usePet((s) => s.buyFood);
	const wear = usePet((s) => s.wear);
	const feed = usePet((s) => s.feed);
	const [tab, setTab] = (0, import_react.useState)("pet");
	const [note, setNote] = (0, import_react.useState)("");
	const [picking, setPicking] = (0, import_react.useState)(false);
	const pet = speciesOf(save.species);
	const tell = (message) => setNote(message);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-grass",
				children: "遊樂場小夥伴"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl text-ink",
				children: "寵物"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-ink",
				children: "完成一個課題得到 40 寵物錢。買衣服和糧食，糧食吃夠就會進化。"
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-bold text-coral",
				children: note
			}) : null,
			!pet || picking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl text-ink",
						children: pet ? "換一隻" : "選一隻當寵物"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3",
						children: SPECIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full flex-col items-center rounded-2xl border-2 border-ink bg-paper p-3",
							onClick: () => {
								choose(item.id);
								setPicking(false);
								setTab("pet");
								setNote("");
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetSprite, {
									species: item.id,
									stage: 1,
									worn: null,
									className: "h-28 w-28"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg font-bold",
									children: item.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: item.blurb
								})
							]
						}) }, item.id))
					}),
					pet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 h-11 rounded-2xl border-2 border-ink px-4 text-sm font-bold",
						onClick: () => setPicking(false),
						children: "返回"
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: tab === "pet" ? "h-11 rounded-full bg-ink px-4 text-sm font-bold text-paper" : "h-11 rounded-full border-2 border-ink px-4 text-sm font-bold",
					onClick: () => setTab("pet"),
					children: "我的寵物"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: tab === "shop" ? "h-11 rounded-full bg-ink px-4 text-sm font-bold text-paper" : "h-11 rounded-full border-2 border-ink px-4 text-sm font-bold",
					onClick: () => setTab("shop"),
					children: "商城"
				})]
			}), tab === "pet" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-3xl border-2 border-ink bg-paper p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetSprite, {
							species: pet.id,
							stage: save.stage,
							worn: save.worn,
							className: "h-40 w-40"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-3xl text-ink",
								children: [pet.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-base font-bold text-grass",
									children: save.stage === 2 ? "已進化" : "幼年"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: pet.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-lg font-bold",
								children: ["寵物錢 ", save.coins]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm",
								children: [
									"糧食 ",
									Math.min(save.fed, 8),
									" / ",
									8,
									save.stage === 2 ? " · 已經進化" : " · 吃夠就進化"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-3 w-48 overflow-hidden rounded-full border-2 border-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-sun",
									style: { width: `${Math.min(100, save.fed / 8 * 100)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-3 h-11 rounded-2xl border-2 border-ink px-4 text-sm font-bold",
								onClick: () => setPicking(true),
								children: "換一隻"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 text-xl",
						children: "衣櫃"
					}),
					save.owned.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "還沒有衣服。去商城挑一件。"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: save.worn ? "h-11 rounded-2xl border-2 border-ink px-3 text-sm font-bold" : "h-11 rounded-2xl bg-ink px-3 text-sm font-bold text-paper",
							onClick: () => wear(null),
							children: "不穿衣服"
						}), save.owned.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: save.worn === id ? "h-11 rounded-2xl bg-grass px-3 text-sm font-bold text-paper" : "h-11 rounded-2xl border-2 border-ink px-3 text-sm font-bold",
							onClick: () => wear(id),
							children: WEARS.find((item) => item.id === id)?.name
						}, id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 text-xl",
						children: "糧食背包"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-2 sm:grid-cols-2",
						children: FOODS.map((item) => {
							const count = save.food[item.id] ?? 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 rounded-2xl border border-line p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `/art/pets/${item.id}.png`,
										alt: "",
										className: "size-14 object-contain"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted",
											children: [
												"剩 ",
												count,
												" · 飽足 +",
												item.feed
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-11 rounded-xl bg-coral px-3 text-sm font-bold text-paper disabled:opacity-40",
										disabled: count < 1,
										onClick: () => tell(feed(item.id)),
										children: "餵"
									})
								]
							}, item.id);
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shop, {
				coins: save.coins,
				owned: save.owned,
				onWear: (id) => tell(buyWear(id)),
				onFood: (id) => tell(buyFood(id))
			})] })
		]
	});
}
function Shop({ coins, owned, onWear, onFood }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-lg font-bold",
				children: ["寵物錢 ", coins]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 text-2xl",
				children: "衣服"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: WEARS.map((item) => {
					const have = owned.includes(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border-2 border-ink bg-paper p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `/art/pets/${item.id}.png`,
								alt: "",
								className: "mx-auto size-24 object-contain"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-bold",
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [item.price, " 寵物錢"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: have,
								className: "mt-2 h-11 w-full rounded-xl bg-grass text-sm font-bold text-paper disabled:opacity-40",
								onClick: () => onWear(item.id),
								children: have ? "已擁有" : "買下並穿上"
							})
						]
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-2xl",
				children: "糧食"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: FOODS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border-2 border-ink bg-paper p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `/art/pets/${item.id}.png`,
							alt: "",
							className: "mx-auto size-24 object-contain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-bold",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								item.price,
								" 寵物錢 · 飽足 +",
								item.feed
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 h-11 w-full rounded-xl bg-coral text-sm font-bold text-paper",
							onClick: () => onFood(item.id),
							children: "買一份"
						})
					]
				}, item.id))
			})
		]
	});
}
//#endregion
export { PetsPage as component };

//#region node_modules/.nitro/vite/services/ssr/assets/avatars-_NsnOvHN.js
var BUILTIN_IDS = [
	"fox",
	"bear",
	"duck",
	"frog",
	"lion",
	"fish",
	"bird",
	"cube",
	"star",
	"kite",
	"boat",
	"sun"
];
function isBuiltinId(value) {
	return BUILTIN_IDS.includes(value);
}
function defaultBuiltin(account) {
	return BUILTIN_IDS[(Number(account.replace(/\D/g, "")) || 0) % BUILTIN_IDS.length] ?? "fox";
}
//#endregion
export { defaultBuiltin as n, isBuiltinId as r, BUILTIN_IDS as t };

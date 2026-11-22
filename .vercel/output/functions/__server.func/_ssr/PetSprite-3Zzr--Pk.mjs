import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PetSprite-3Zzr--Pk.js
var import_jsx_runtime = require_jsx_runtime();
function PetSprite({ species, stage, worn, className = "" }) {
	const src = stage === 2 ? `/art/pets/${species}-evo.png` : `/art/pets/${species}.png`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative inline-block ${className}`,
		children: [
			worn === "wear-cape" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/pets/wear-cape.png",
				alt: "",
				className: "pet-wear pet-wear-cape"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "pet-sprite relative z-10 size-full object-contain object-bottom"
			}),
			worn && worn !== "wear-cape" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: `/art/pets/${worn}.png`,
				alt: "",
				className: `pet-wear pet-wear-${worn.slice(5)}`
			}) : null
		]
	});
}
//#endregion
export { PetSprite as t };

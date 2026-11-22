import { t as TEACHER_ACCOUNT } from "./teacher-account-BqPbmFfU.mjs";
import { t as getSql } from "./db-BsiyhNta.mjs";
import { n as hasProfanity } from "./profanity-BWxlDsA2.mjs";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/class-roster.server-CIgXvlsE.js
var STUDENTS = [
	{
		account: "6DStudent01",
		name: "6D 1號",
		salt: "e6dfc919076b8736",
		hash: "44b015a44b0bd0106b27f3d54c7c799ada9d169d4771be14660bfe21dce4a96c"
	},
	{
		account: "6DStudent02",
		name: "6D 2號",
		salt: "51ea9437da3548ea",
		hash: "9cda26fe97e08a1fceddf8287df5b799370d86179aacaa53aed4a88c5063922e"
	},
	{
		account: "6DStudent03",
		name: "6D 3號",
		salt: "1ef8ff6b2dfa5bd4",
		hash: "19a77eccf53992fa38b81cf43ab6be723493e705fabad1d94c06a9789b931d01"
	},
	{
		account: "6DStudent04",
		name: "6D 4號",
		salt: "0affd52f9799edda",
		hash: "a7e200910515734ef7c1e30887583cfdc6f7d8b44bec4f09631d1cfa89a9d566"
	},
	{
		account: "6DStudent05",
		name: "6D 5號",
		salt: "89efdfb6b2c176e2",
		hash: "9a0ae7f95744b294f9ffb81b4560d34543ac8c7de097fd85b5b5637e28260d2a"
	},
	{
		account: "6DStudent06",
		name: "6D 6號",
		salt: "162b6e93cdb4d5d9",
		hash: "8e58767409b4c8cf560d194c0151ae41ba347b2d2a5881be0c688c8567f5711b"
	},
	{
		account: "6DStudent07",
		name: "6D 7號",
		salt: "ce64de147525e3bb",
		hash: "09cbc81cedfc277afdf109361e912d16218e7cd086627d910f7c2a13ccfdb581"
	},
	{
		account: "6DStudent08",
		name: "6D 8號",
		salt: "fce0bcc4b020777d",
		hash: "259794eb76c5623e93b1b8e334e327626325cb6a5c4cb69deea6651da3386ded"
	},
	{
		account: "6DStudent09",
		name: "6D 9號",
		salt: "3111bd4e0dc73ca5",
		hash: "74db65cd0a39c18f7c2b7af4fbb944f72ef86142be19e2eafa68c830b098ca1a"
	},
	{
		account: "6DStudent10",
		name: "6D 10號",
		salt: "3e29ea95002603e3",
		hash: "eb61375c809d766c40a858fc045e65c05f3fac2db632b13ff9cd7c98f09ff570"
	},
	{
		account: "6DStudent11",
		name: "6D 11號",
		salt: "fe9d0535a584f5a5",
		hash: "63d05aec7a632fa497d867856bbe16426d3b2a49c98169462bf46dfb777ee1e2"
	},
	{
		account: "6DStudent12",
		name: "6D 12號",
		salt: "c86b655e516e59c4",
		hash: "81225bf94af1be291f0b431f1a6a80e805319db3ccb15f7fa9402ca10c6334dd"
	},
	{
		account: "6DStudent13",
		name: "6D 13號",
		salt: "da33ff88b36221c2",
		hash: "ab466c9c07dc61bdb9422244051691745dac43e3187b0d7b49d02b53faf477fd"
	},
	{
		account: "6DStudent14",
		name: "6D 14號",
		salt: "a1ad00c41a7cb5f0",
		hash: "80ef84cdcf0dcd94076cecb399554267e07da4ff2a583ebf93cf201490dd856e"
	},
	{
		account: "6DStudent15",
		name: "6D 15號",
		salt: "0f45e22bb1aac84e",
		hash: "61705ea81515714f83732f1541e0e46f9f09e07ac142ba49c81e4c96361e7517"
	},
	{
		account: "6DStudent16",
		name: "6D 16號",
		salt: "20199d42bfa1e82a",
		hash: "a53f8fbc88ba6037863b58ad4419c7276dca788bce06c5aa3bedb07df9bac7c4"
	},
	{
		account: "6DStudent17",
		name: "6D 17號",
		salt: "08b191dc2bbb75b7",
		hash: "a686d6bc66b4fd2c66a82046298690667d0d849a6b4a0d62ac106d90bc894b93"
	},
	{
		account: "6DStudent18",
		name: "6D 18號",
		salt: "0c8544ac79317d97",
		hash: "e987c6afd4231a8b850240ad89409d70350582d89e5872eb03dfa0b047cce254"
	},
	{
		account: "6DStudent19",
		name: "6D 19號",
		salt: "103aa75c351e7469",
		hash: "e81edd7988681d216dcc1a24ade5b36c589d23b246319c4f629941393934db59"
	},
	{
		account: "6DStudent20",
		name: "6D 20號",
		salt: "e427612112aa395a",
		hash: "c03be5519a213f5776fa460c2bccd0f06cfd4410e8cd53ddceb9f3b004ac4a97"
	},
	{
		account: "6DStudent21",
		name: "6D 21號",
		salt: "bedb5f557abc6d85",
		hash: "0cbf6bcd8dd9644c69cde33fb3cff28e929b256a90492ef94e855d594851a325"
	},
	{
		account: "6DStudent22",
		name: "6D 22號",
		salt: "f3be40ec62776a82",
		hash: "df899f5a1446de5f9cb28e66f76913303cfb8b6ad27ec88ac2d0d967da5d68d8"
	},
	{
		account: "6DStudent23",
		name: "6D 23號",
		salt: "b52fd036910e8443",
		hash: "229151904b32e7b423b0e90a2d72ef8fb9de67c75b9a26dd6ae2380ddfb58017"
	},
	{
		account: "6DStudent24",
		name: "6D 24號",
		salt: "955ad997a69e133e",
		hash: "a94d52aed4e87941e9a5a7cce4a9fc8579122f2e4174b83ce82eb848b5e8673f"
	},
	{
		account: "6DStudent25",
		name: "6D 25號",
		salt: "d504533102795ea4",
		hash: "66211a7a1205746f0616bf8a36c81a0afdaded44f12c508f2f66d8d86e50282c"
	},
	{
		account: "6DStudent26",
		name: "6D 26號",
		salt: "d37d1b1ac68d7171",
		hash: "4dbbc90334ebf16c360d5f4d86a86157454bc96f2bb3a7ee42464f062b1533f7"
	},
	{
		account: "6DStudent27",
		name: "6D 27號",
		salt: "84d08b591fb67a23",
		hash: "50f2fb7bad0c60b197e3c3f498677800f56ac1f20b08fab3428b1a682f5f4c7d"
	},
	{
		account: "6DStudent28",
		name: "6D 28號",
		salt: "2e92d84d5b8ec951",
		hash: "06e6aa3096face789801bfcc9d7eb77347a9810cb58e183e2dd42944523d9316"
	},
	{
		account: "6DStudent29",
		name: "6D 29號",
		salt: "9909c168d3b0cd02",
		hash: "a0cbef547856f7b2cc5cb63ff9d1515cc3e16c9e6eb6a0df306d9872de5f6c55"
	},
	{
		account: "6DStudent30",
		name: "6D 30號",
		salt: "76ab5e1c359e7d64",
		hash: "c930c6888b6b8242612e2d68a1329aea1539899b57bf22911f3c1528a7108916"
	},
	{
		account: "6DStudent31",
		name: "6D 31號",
		salt: "dbe6fdc2412273a8",
		hash: "77396c82a80274945fc9875eff2fbf7b363e745431fb19e22198e3a2d238de9b"
	},
	{
		account: "6DStudent32",
		name: "6D 32號",
		salt: "8a53dbf01f33bef6",
		hash: "4a22bf2267d92395b8c7504726890e40c5867ef281b643e137526dae6dedf0ad"
	},
	{
		account: "6DStudent33",
		name: "6D 33號",
		salt: "969f030330f258a2",
		hash: "c22e94d53e2657eef2975abb62bb9da6e493f4194d50b71b664ed62774b513d8"
	},
	{
		account: "6DStudent34",
		name: "6D 34號",
		salt: "3e623748e39c663f",
		hash: "a5fc2a7a1fbb49a711efb2dc2cba06d19a6df3cc45222224353f058773e3db13"
	},
	{
		account: "6DStudent35",
		name: "6D 35號",
		salt: "c49f0f0dfa2407f6",
		hash: "1a1c37c692975ae8d73cc45c49471a6a6870837bc5985253d7e81058d212c288"
	}
];
var TEACHER = {
	account: TEACHER_ACCOUNT,
	name: "6D 老師",
	salt: "06a5e66077f98980",
	hash: "996f8feaab9a04c177820de8ef088485a99723ad240d7787a60898e6f9cceaa3"
};
function normalize(account) {
	const key = account.trim().toUpperCase().replace(/\s+/g, "");
	const digits = key.match(/^(?:6D)?STUDENT(\d{1,2})$/)?.[1] ?? (/^\d{1,2}$/.test(key) ? key : "");
	if (digits) {
		const n = Number(digits);
		if (n >= 1 && n <= 35) return `6DStudent${String(n).padStart(2, "0")}`;
	}
	if (key === "LLTEACHER01") return "llteacher01";
	return key;
}
function rosterAll() {
	return STUDENTS.map((student) => ({
		account: student.account,
		name: student.name
	}));
}
function rosterStudent(account) {
	const student = STUDENTS.find((item) => item.account === normalize(account));
	if (!student) return null;
	return {
		account: student.account,
		name: student.name
	};
}
function rosterPerson(account) {
	const student = rosterStudent(account);
	if (student) return student;
	if (normalize(account) === TEACHER.account) return {
		account: TEACHER.account,
		name: TEACHER.name
	};
	return null;
}
function rosterChat() {
	return [{
		account: TEACHER.account,
		name: TEACHER.name
	}, ...rosterAll()];
}
function matches(password, salt, hash) {
	const got = scryptSync(password, salt, 32);
	const expect = Buffer.from(hash, "hex");
	return got.length === expect.length && timingSafeEqual(got, expect);
}
async function savedPassword(account) {
	return (await (await getSql())`
    SELECT salt, hash FROM class_passwords WHERE account = ${account} LIMIT 1
  `)[0] ?? null;
}
async function verifyStudent(account, password) {
	const student = rosterStudent(account);
	if (!student || !password) return null;
	const row = STUDENTS.find((item) => item.account === student.account);
	if (!row) return null;
	const saved = await savedPassword(student.account);
	if (!matches(password, saved?.salt ?? row.salt, saved?.hash ?? row.hash)) return null;
	return {
		account: student.account,
		name: student.name
	};
}
async function verifyTeacher(account, password) {
	if (account.trim().toLowerCase().replace(/\s+/g, "") !== TEACHER.account || !password) return null;
	const saved = await savedPassword(TEACHER.account);
	if (!matches(password, saved?.salt ?? TEACHER.salt, saved?.hash ?? TEACHER.hash)) return null;
	return {
		account: TEACHER.account,
		name: TEACHER.name
	};
}
async function changeClassPassword(account, current, next) {
	const person = rosterPerson(account);
	if (!person) return {
		ok: false,
		error: "找不到這個帳號。"
	};
	const now = current;
	const fresh = next;
	if (!now) return {
		ok: false,
		error: "請先輸入現在的密碼。"
	};
	if (fresh.length < 4) return {
		ok: false,
		error: "新密碼最少 4 個字。"
	};
	if (fresh.length > 20) return {
		ok: false,
		error: "新密碼最多 20 個字。"
	};
	if (fresh === now) return {
		ok: false,
		error: "新密碼要和現在的密碼不同。"
	};
	if (hasProfanity(fresh)) return {
		ok: false,
		error: "密碼含有不雅用語，請改一個。"
	};
	if (!(person.account === TEACHER.account ? await verifyTeacher(person.account, now) : await verifyStudent(person.account, now))) return {
		ok: false,
		error: "現在的密碼不正確。"
	};
	const salt = randomBytes(8).toString("hex");
	const hash = scryptSync(fresh, salt, 32).toString("hex");
	await (await getSql())`
    INSERT INTO class_passwords (account, salt, hash)
    VALUES (${person.account}, ${salt}, ${hash})
    ON CONFLICT (account) DO UPDATE SET salt = EXCLUDED.salt, hash = EXCLUDED.hash, updated_at = now()
  `;
	return { ok: true };
}
//#endregion
export { changeClassPassword, rosterAll, rosterChat, rosterPerson, verifyStudent, verifyTeacher };

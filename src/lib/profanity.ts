export const PROFANITY_ERROR = "這句有不雅用語，發送不到。請改寫。";

const CHINESE = [
  "屌你老母",
  "屌那媽",
  "屌那星",
  "屌你",
  "吊你老母",
  "吊你",
  "叼你老母",
  "叼你",
  "仆你個街",
  "仆街",
  "僕街",
  "冚家鏟",
  "含家鏟",
  "戇鳩",
  "食屎",
  "臭閪",
  "死仆街",
  "你老母",
  "狗屎",
  "屎忽",
  "屎窟",
  "撚樣",
  "柒頭",
  "傻逼",
  "傻屄",
  "傻比",
  "煞筆",
  "煞笔",
  "沙雕",
  "腦殘",
  "脑残",
  "操你媽",
  "操你妈",
  "草泥馬",
  "草泥马",
  "肏你",
  "賤人",
  "贱人",
  "婊子",
  "王八蛋",
  "狗娘",
  "去死",
  "騷貨",
  "骚货",
  "靠夭",
  "靠腰",
  "靠北",
  "靠杯",
  "機掰",
  "机掰",
  "雞掰",
  "雞八",
  "機八",
  "塞妳娘",
  "塞你娘",
  "幹你娘",
  "干你娘",
  "哭爸",
  "三小",
];

const CHINESE_CHARS = ["屌", "閪", "撚", "柒", "鳩", "𨳒", "𨳊", "肏"];

const ENGLISH = [
  "fuck",
  "shit",
  "bitch",
  "cunt",
  "dick",
  "cock",
  "pussy",
  "bastard",
  "slut",
  "whore",
  "nigger",
  "nigga",
  "faggot",
  "retard",
  "bullshit",
  "asshole",
  "motherfucker",
  "wtf",
  "stfu",
];

function foldLatin(input: string) {
  return input
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[@4]/g, "a")
    .replace(/3/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/0/g, "o")
    .replace(/[$5]/g, "s")
    .replace(/7/g, "t");
}

function hasChinese(flat: string) {
  if (CHINESE.some((word) => flat.includes(word))) return true;
  return CHINESE_CHARS.some((word) => flat.includes(word));
}

function hasLatin(raw: string) {
  const folded = foldLatin(raw);
  for (const word of ENGLISH) {
    const pattern = word.split("").join("[^a-z]{0,2}");
    if (new RegExp(`(?:^|[^a-z])${pattern}s?(?:[^a-z]|$)`, "i").test(folded)) return true;
  }
  if (/(?:^|[^a-z0-9])on9+(?:[^a-z0-9]|$)/i.test(raw.normalize("NFKC"))) return true;
  if (/(?:^|[^a-z0-9])(?:diu|dllm|dnlm)(?:[^a-z0-9]|$)/i.test(folded)) return true;
  if (/(?:^|[^a-z])f[^a-z]{0,3}ck(?:[^a-z]|$)/i.test(folded)) return true;
  if (/(?:^|[^a-z])f[^a-z]{1,3}k(?:[^a-z]|$)/i.test(folded)) return true;
  if (/(?:^|[^a-z])sh[^a-z]{1,2}t(?:[^a-z]|$)/i.test(folded)) return true;
  if (/(?:^|[^a-z])b[^a-z]{1,2}tch(?:[^a-z]|$)/i.test(folded)) return true;
  if (/(?:^|[^a-z0-9])pk(?:[^a-z0-9]|$)/i.test(folded)) return true;
  return false;
}

export function hasProfanity(raw: string) {
  const text = raw.normalize("NFKC").replace(/[\u200b-\u200d\ufeff]/g, "");
  if (text.includes("𨳒") || text.includes("𨳊")) return true;
  const chinese = text.replace(/[^\u3400-\u9FFF\uF900-\uFAFF]/g, "");
  return hasChinese(chinese) || hasLatin(text);
}

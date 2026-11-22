export const COIN_PER_STAMP = 40;
export const EVOLVE_AT = 8;

export const SPECIES = [
  { id: "kitten", name: "小貓", blurb: "奶油色小虎斑" },
  { id: "puppy", name: "小狗", blurb: "垂耳小黃狗" },
  { id: "raccoon", name: "小浣熊", blurb: "黑眼罩、環紋尾巴" },
  { id: "dino", name: "小恐龍", blurb: "薄荷綠色的小朋友" },
  { id: "bear", name: "小熊", blurb: "圓耳朵蜜糖熊" },
] as const;

export type SpeciesId = (typeof SPECIES)[number]["id"];

export const WEARS = [
  { id: "wear-scarf", name: "紅領巾", price: 40 },
  { id: "wear-cap", name: "黃太陽帽", price: 50 },
  { id: "wear-bow", name: "藍蝴蝶結", price: 50 },
  { id: "wear-cape", name: "小披風", price: 80 },
  { id: "wear-vest", name: "條紋背心", price: 70 },
] as const;

export const FOODS = [
  { id: "food-apple", name: "蘋果", price: 20, feed: 1 },
  { id: "food-fish", name: "小魚乾", price: 24, feed: 1 },
  { id: "food-bun", name: "肉包", price: 36, feed: 2 },
  { id: "food-honey", name: "蜂蜜", price: 44, feed: 2 },
  { id: "food-berry", name: "能量果", price: 50, feed: 3 },
] as const;

export type WearId = (typeof WEARS)[number]["id"];
export type FoodId = (typeof FOODS)[number]["id"];

export function speciesOf(id: string | null) {
  return SPECIES.find((item) => item.id === id) ?? null;
}

export function wearOf(id: string | null) {
  return WEARS.find((item) => item.id === id) ?? null;
}

export function foodOf(id: string) {
  return FOODS.find((item) => item.id === id) ?? null;
}

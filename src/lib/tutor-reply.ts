import { guideFor, speakGuide } from "@/data/tutor-faq";
import { UNITS, type Unit } from "@/data/units";

export type TutorReply = { text: string; topic: string };
export type TutorContext = { stem?: string };

function detect(text: string): string | null {
  const t = text.replace(/\s+/g, "");
  if (!t) return null;
  if (t.includes("圓形圖") || t.includes("圓心角")) return "6D3";
  if (t.includes("旋轉對稱")) return "enrich-turn";
  if ((t.includes("周界") || t.includes("圓周")) && t.includes("面積") && t.includes("圓")) return "circle-both";
  if (t.includes("圓面積") || t.includes("圓形面積") || t.includes("圓的面積") || t.includes("半圓面積")) return "6M5";
  if (t.includes("面積") && /圓|半徑|直徑|半圓/.test(t)) return "6M5";
  if (t.includes("圓周") || t.includes("周界")) return "6M3";
  if (t.includes("折線") && (t.includes("棒形") || t.includes("圓形") || t.includes("分別"))) return "6D4";
  if (t.includes("折線")) return "6D2";
  if (t.includes("棒形") || t.includes("誤導") || t.includes("統計")) return "6D4";
  if (t.includes("對稱")) return "6S1";
  if (t.includes("一打") || t.includes("非十進")) return "enrich-base";
  if (t.includes("方程") || t.includes("未知數")) return "6A1";
  if (t.includes("速率") || t.includes("公里每小時") || (t.includes("路程") && t.includes("時間"))) return "6M4";
  if (/體積|容量|立方|毫升|排水/.test(t)) return "6M2";
  if (/銳角|鈍角|平角|周角|反角|量角器|度數|角度|直角/.test(t)) return "6M1";
  if (t.includes("平均")) return "6D1";
  if (t.includes("小數") && t.includes("分數")) return "6N2";
  if (/百分之幾|增加百|減少百|原數的|的60%|的百分之/.test(t)) return "6N4";
  if (t.includes("百分")) return "6N3";
  if (/小數點|除以10|除以十|除以100|除以0\.|小數除/.test(t) || t.includes("小數")) return "6N1";
  return null;
}

function guideUnit(unit: Unit, message: string) {
  return speakGuide(guideFor(unit.id, message));
}

export function tutorReply(message: string, topicId: string, context?: TutorContext): TutorReply {
  const compact = `${context?.stem ?? ""} ${message}`.replace(/\s+/g, "");
  const detected = detect(compact);
  if (detected === "circle-both") {
    const peri = UNITS.find((unit) => unit.id === "6M3");
    const area = UNITS.find((unit) => unit.id === "6M5");
    if (peri && area) {
      return {
        topic: "圓的周界和面積",
        text: `圓的周界和圓面積不要混在一起。\n\n周界\n${guideUnit(peri, message)}\n\n面積\n${guideUnit(area, message)}`,
      };
    }
  }
  const unitId = detected && detected !== "circle-both" ? detected : topicId !== "all" ? topicId : null;
  const unit = UNITS.find((item) => item.id === unitId);
  if (!unit) return { topic: "未定課題", text: "你把題目再打清楚一點，例如「圓形面積點計」或者「36 除以 10」。我會一步步引導你，不會直接給答案。" };
  const guard = compact.includes("圓形") && compact.includes("面積") && !compact.includes("圓形圖") ? "你問的是圓面積，不是圓形圖。\n\n" : "";
  const stem = context?.stem ? `這題是：${context.stem}\n\n` : "";
  return {
    topic: unit.name,
    text: `${stem}${guard}${guideUnit(unit, context?.stem ? `${context.stem} ${message}` : message)}`,
  };
}

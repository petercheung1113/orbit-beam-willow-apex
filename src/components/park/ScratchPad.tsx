import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Stroke = { points: Point[]; erase: boolean };

const INK = "#2a251c";

export function ScratchPad({ title = "算草紙", fill = false }: { title?: string; fill?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const drawing = useRef(new Map<number, Stroke>());
  const redraw = useRef<() => void>(() => {});
  const [erase, setErase] = useState(false);
  const eraseRef = useRef(false);
  eraseRef.current = erase;

  useEffect(() => {
    const box = wrap.current;
    const el = canvas.current;
    if (!box || !el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const paintAll = () => {
      const width = box.clientWidth;
      const height = box.clientHeight;
      if (width < 2 || height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.floor(width * dpr);
      el.height = Math.floor(height * dpr);
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#fffdf8";
      ctx.fillRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const stroke of strokes.current) drawStroke(ctx, stroke);
    };

    const pointOf = (event: PointerEvent): Point => {
      const rect = el.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const down = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      event.preventDefault();
      el.setPointerCapture(event.pointerId);
      const stroke: Stroke = { points: [pointOf(event)], erase: eraseRef.current };
      drawing.current.set(event.pointerId, stroke);
      strokes.current.push(stroke);
    };

    const move = (event: PointerEvent) => {
      const stroke = drawing.current.get(event.pointerId);
      if (!stroke) return;
      event.preventDefault();
      const events = typeof event.getCoalescedEvents === "function" ? event.getCoalescedEvents() : [event];
      for (const item of events) stroke.points.push(pointOf(item));
      const last = stroke.points.at(-2);
      const next = stroke.points.at(-1);
      if (!last || !next) return;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = stroke.erase ? "destination-out" : "source-over";
      ctx.strokeStyle = INK;
      ctx.lineWidth = stroke.erase ? 22 : event.pointerType === "pen" ? 2.2 : 2.6;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
      ctx.restore();
    };

    const up = (event: PointerEvent) => {
      const stroke = drawing.current.get(event.pointerId);
      drawing.current.delete(event.pointerId);
      if (!stroke) return;
      if (stroke.points.length === 1) {
        const dot = stroke.points[0]!;
        ctx.save();
        ctx.globalCompositeOperation = stroke.erase ? "destination-out" : "source-over";
        ctx.fillStyle = INK;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, stroke.erase ? 11 : 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        stroke.points.push({ x: dot.x + 0.2, y: dot.y });
      }
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    };

    redraw.current = paintAll;
    const blockMenu = (event: Event) => event.preventDefault();
    paintAll();
    const observer = new ResizeObserver(() => paintAll());
    observer.observe(box);
    el.addEventListener("pointerdown", down, { passive: false });
    el.addEventListener("pointermove", move, { passive: false });
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("contextmenu", blockMenu);
    return () => {
      observer.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("contextmenu", blockMenu);
    };
  }, []);

  return (
    <aside className={"flex h-full flex-col rounded-3xl border-2 border-ink bg-[#fffdf8] " + (fill ? "min-h-0" : "min-h-[70vh]")}>
      <div className={"flex items-center gap-1 border-b border-line " + (fill ? "px-1.5 py-1" : "gap-2 px-3 py-2")}>
        <p className={"font-bold text-ink " + (fill ? "truncate text-xs" : "text-sm")}>{title}</p>
        <button type="button" onClick={() => setErase(false)} className={"ml-auto rounded-full font-bold " + (fill ? "h-8 px-2 text-xs " : "h-9 px-3 text-sm ") + (erase ? "bg-cream text-ink" : "bg-ink text-paper")}>
          筆
        </button>
        <button type="button" onClick={() => setErase(true)} className={"rounded-full font-bold " + (fill ? "h-8 px-2 text-xs " : "h-9 px-3 text-sm ") + (erase ? "bg-ink text-paper" : "bg-cream text-ink")}>
          擦
        </button>
        <button
          type="button"
          onClick={() => {
            strokes.current = [];
            drawing.current.clear();
            redraw.current();
          }}
          className={"rounded-full bg-cream font-bold text-coral " + (fill ? "h-8 px-2 text-xs" : "h-9 px-3 text-sm")}
        >
          清空
        </button>
      </div>
      <div ref={wrap} className="relative min-h-0 flex-1">
        <canvas
          ref={canvas}
          className="absolute inset-0 h-full w-full touch-none"
          style={{ touchAction: "none" }}
          aria-label="算草紙，可用手指、Apple Pencil 或滑鼠書寫"
        />
      </div>
    </aside>
  );
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  if (stroke.points.length < 2) return;
  ctx.save();
  ctx.globalCompositeOperation = stroke.erase ? "destination-out" : "source-over";
  ctx.strokeStyle = INK;
  ctx.lineWidth = stroke.erase ? 22 : 2.6;
  ctx.beginPath();
  ctx.moveTo(stroke.points[0]!.x, stroke.points[0]!.y);
  for (const point of stroke.points.slice(1)) ctx.lineTo(point.x, point.y);
  ctx.stroke();
  ctx.restore();
}

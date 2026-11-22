import { createFileRoute } from "@tanstack/react-router";
import { storedFileSize, streamStoredFile } from "@/lib/chat-file-store.server";

const RASTER = new Set(["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/avif"]);

export const Route = createFileRoute("/api/chat-file/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const url = new URL(request.url);
        const token = url.searchParams.get("token") ?? "";
        const { openChatFile } = await import("@/lib/chat.server");
        const opened = await openChatFile(token, params.id);
        if (!opened.ok) return new Response(opened.error, { status: opened.error === "expired" ? 401 : 404 });
        const size = await storedFileSize(params.id);
        const stream = await streamStoredFile(params.id);
        if (size == null || !stream) return new Response("找不到檔案。", { status: 404 });
        const raster = RASTER.has(opened.mime);
        const ascii = opened.name.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
        return new Response(stream, {
          headers: {
            "content-type": raster ? opened.mime : "application/octet-stream",
            "content-length": String(size),
            "content-disposition": `${raster ? "inline" : "attachment"}; filename="${ascii || "file"}"; filename*=UTF-8''${encodeURIComponent(opened.name)}`,
            "x-content-type-options": "nosniff",
            "cache-control": "private, max-age=3600",
          },
        });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { appendChatChunk, cleanFileName, rememberPublished, sealUpload } from "@/lib/chat-file-store.server";

export const Route = createFileRoute("/api/chat-file")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const header = (name: string) => request.headers.get(name) ?? "";
        const token = header("x-chat-token");
        const roomId = header("x-room-id") || "hall";
        const size = Number(header("x-file-size"));
        const index = Number(header("x-chunk-index"));
        const total = Number(header("x-chunk-total"));
        const name = cleanFileName(decodeURIComponent(header("x-file-name") || "檔案"));
        const mime = (header("x-file-mime") || "application/octet-stream").slice(0, 80);
        const { accountForChat } = await import("@/lib/chat.server");
        const account = await accountForChat(token, roomId);
        if (!account) return Response.json({ ok: false, error: "請再進入一次。" }, { status: 401 });
        const bytes = Buffer.from(await request.arrayBuffer());
        const saved = await appendChatChunk({
          uploadId: header("x-upload-id"),
          account,
          roomId,
          name,
          mime,
          size,
          index,
          total,
          bytes,
        });
        if (!saved.ok) return Response.json(saved, { status: 400 });
        if (!saved.done) return Response.json({ ok: true, uploadId: saved.uploadId });
        if (saved.published) {
          await sealUpload(saved.uploadId);
          return Response.json({ ok: true, uploadId: saved.uploadId, message: saved.published });
        }
        const { publishFileMessage } = await import("@/lib/chat.server");
        const published = await publishFileMessage(token, roomId, { id: saved.uploadId, name, mime, size });
        if (!published.ok) return Response.json(published, { status: 400 });
        await rememberPublished(saved.uploadId, published.message);
        return Response.json({ ok: true, uploadId: saved.uploadId, message: published.message });
      },
    },
  },
});

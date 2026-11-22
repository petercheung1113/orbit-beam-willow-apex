import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/park/Shell";
import { ParkChat } from "@/components/park/ParkChat";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "聊天室 · 數學遊樂場" }] }),
});

function ChatPage() {
  return (
    <Shell>
      <main className="mx-auto h-[calc(100dvh-5.5rem)] max-w-3xl px-4 py-4">
        <ParkChat />
      </main>
    </Shell>
  );
}

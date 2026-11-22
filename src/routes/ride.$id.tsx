import { createFileRoute, Link } from "@tanstack/react-router";
import { getUnit } from "@/data/units";
import { Shell } from "@/components/park/Shell";
import { RideView } from "@/components/park/RideView";

export const Route = createFileRoute("/ride/$id")({
  component: RidePage,
  head: ({ params }) => {
    const unit = getUnit(params.id);
    return {
      meta: [{ title: unit ? `${unit.ride} · 數學遊樂場` : "數學遊樂場" }],
    };
  },
});

function RidePage() {
  const { id } = Route.useParams();
  const unit = getUnit(id);
  return (
    <Shell>
      {unit ? (
        <RideView unit={unit} />
      ) : (
        <main className="mx-auto max-w-xl px-4 py-16">
          <h1 className="text-3xl text-ink">找不到這座設施</h1>
          <Link to="/" className="mt-4 inline-flex min-h-11 items-center text-grass">
            返回遊樂場
          </Link>
        </main>
      )}
    </Shell>
  );
}

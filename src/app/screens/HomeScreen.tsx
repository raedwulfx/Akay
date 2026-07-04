import { ArrowRight, Package, Send, Sparkles } from "lucide-react";

type RouteName = "home" | "feed" | "create" | "chat";

type HomeScreenProps = {
  onNavigate: (route: RouteName) => void;
};

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const cards = [
    {
      title: "Browse errands",
      description: "Review nearby requests and accept the ones that fit your route.",
      action: () => onNavigate("feed"),
      icon: Package,
    },
    {
      title: "Create request",
      description: "Add a photo, item details, store, and tip in a few taps.",
      action: () => onNavigate("create"),
      icon: Sparkles,
    },
    {
      title: "Track delivery",
      description: "Chat with the runner, approve substitutions, and keep things moving.",
      action: () => onNavigate("chat"),
      icon: Send,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Akay web app</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">A faster neighborhood errand experience.</h2>
        <p className="mt-4 max-w-2xl text-sm text-zinc-300">
          The original single-screen prototype has been expanded into a functional web experience with separate screens for discovery, request creation, and live coordination.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("feed")}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
          >
            Open feed
          </button>
          <button
            onClick={() => onNavigate("create")}
            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-zinc-500"
          >
            Create request
          </button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ title, description, action, icon: Icon }) => (
          <button
            key={title}
            onClick={action}
            className="rounded-[24px] border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white">
              <Icon size={18} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">{title}</h3>
            <p className="mt-2 text-sm text-zinc-600">{description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-zinc-900">
              Continue
              <ArrowRight size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

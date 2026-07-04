import { Bell, CheckCheck, ChevronDown, Clock, Home, MapPin, Package, Search, ShoppingBag, Star, User } from "lucide-react";
import type { Errand } from "../data/errands";

type RouteName = "home" | "feed" | "create" | "chat";

type FeedScreenProps = {
  errands: Errand[];
  acceptedErrandId: number | null;
  onAccept: (errandId: number) => void;
  onNavigate: (route: RouteName) => void;
};

export function FeedScreen({ errands, acceptedErrandId, onAccept, onNavigate }: FeedScreenProps) {
  return (
    <div className="flex h-full flex-col rounded-[32px] border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">Runner mode</p>
          <div className="mt-1 flex items-center gap-1.5">
            <MapPin size={14} className="text-zinc-900" />
            <span className="text-sm font-semibold text-zinc-900">Katipunan, QC</span>
            <ChevronDown size={14} className="text-zinc-500" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200">
            <Bell size={15} className="text-zinc-900" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
            RK
          </div>
        </div>
      </div>

      <div className="px-5 pb-3">
        <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3.5 py-3">
          <Search size={15} className="text-zinc-400" />
          <span className="text-sm text-zinc-400">Search requests near you...</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-900">Nearby requests</p>
        <p className="text-[10px] text-zinc-400">{errands.length} active</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-4">
        {errands.map((card) => {
          const isAccepted = acceptedErrandId === card.id;
          return (
            <div key={card.id} className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
                    {card.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{card.requester}</p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <Star size={10} fill="#0a0a0a" strokeWidth={0} />
                      <span className="text-[11px] text-zinc-500">{card.rating} · {card.trips} trips</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-900">
                  {card.tag}
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-100 pt-4">
                <p className="text-sm font-semibold text-zinc-900">{card.item}</p>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <MapPin size={10} />
                  {card.store}
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">Item cost</p>
                    <p className="text-sm font-semibold text-zinc-900">₱{card.cost}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">Tip</p>
                    <p className="text-sm font-semibold text-zinc-900">₱{card.tip}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">Distance</p>
                    <p className="text-sm font-semibold text-zinc-900">{card.distance}</p>
                  </div>
                </div>

                <button
                  onClick={() => onAccept(card.id)}
                  className="mt-4 w-full rounded-2xl border border-zinc-950 px-3 py-2.5 text-sm font-semibold transition hover:opacity-90"
                  style={{ background: isAccepted ? "#f5f5f5" : "#0a0a0a", color: isAccepted ? "#0a0a0a" : "#ffffff" }}
                >
                  {isAccepted ? "Errand accepted" : "Accept"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden sm:flex items-center justify-around border-t border-zinc-200 px-4 py-3">
        {[
          { label: "Home", icon: Home, route: "home" as const },
          { label: "Feed", icon: Package, route: "feed" as const },
          { label: "Create", icon: ShoppingBag, route: "create" as const },
          { label: "Chat", icon: User, route: "chat" as const },
        ].map(({ label, icon: Icon, route }) => (
          <button key={label} onClick={() => onNavigate(route)} className="flex flex-col items-center gap-1 text-zinc-500">
            <Icon size={18} />
            <span className="text-[10px] uppercase tracking-[0.2em]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

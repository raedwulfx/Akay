import { ArrowLeft, CheckCheck, ChevronRight, Package, Send, ShoppingBag, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Errand } from "../data/errands";

type RouteName = "home" | "feed" | "create" | "chat";

type ChatScreenProps = {
  errand: Errand;
  onNavigate: (route: RouteName) => void;
};

const initialMessages = [
  { id: 1, side: "runner", text: "On my way to Red Ribbon now!", time: "2:14 PM" },
  { id: 2, side: "requestor", text: "Thanks Jun! The cake is for tonight, no rush.", time: "2:15 PM" },
  { id: 3, side: "runner", text: "Hey, the Buko Pandan 6-inch is out of stock today.", time: "2:31 PM" },
];

export function ChatScreen({ errand, onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [approved, setApproved] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    if (!draft.trim()) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), side: "requestor", text: draft.trim(), time: "Now" },
    ]);
    setDraft("");
  };

  const badge = useMemo(() => {
    if (approved) {
      return "Sub approved";
    }
    if (cancelled) {
      return "Item cancelled";
    }
    return "Active";
  }, [approved, cancelled]);

  return (
    <div className="flex h-full flex-col rounded-[32px] border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("feed")} className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200">
            <ArrowLeft size={14} className="text-zinc-900" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
            JD
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900">Jun dela Cruz</p>
            <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              At Red Ribbon Cubao
            </div>
          </div>
          <div className="rounded-full bg-zinc-950 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-white">
            {badge}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
          <ShoppingBag size={14} />
          <span className="font-semibold text-zinc-900">{errand.item}</span>
          <span>· {errand.store} · ₱{errand.cost}</span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.side === "runner" ? "justify-start" : "justify-end"}`}>
            {message.side === "runner" && (
              <div className="mr-2 mt-auto flex h-7 w-7 items-center justify-center rounded-full bg-zinc-600 text-[9px] font-semibold text-white">
                JD
              </div>
            )}
            <div className="max-w-[75%] rounded-[18px] bg-zinc-100 px-3 py-2 text-sm text-zinc-900">
              {message.text}
              <div className={`mt-1 text-[10px] ${message.side === "runner" ? "text-zinc-400" : "text-zinc-500"}`}>
                {message.time}
              </div>
            </div>
          </div>
        ))}

        {!approved && !cancelled && (
          <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-zinc-950">
                <Package size={10} className="text-white" />
              </div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-zinc-900">Substitution suggested</p>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-2xl bg-zinc-200 p-3">
                <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-500">Original</p>
                <div className="mt-2 flex h-14 items-center justify-center rounded-2xl bg-zinc-300">
                  <X size={14} className="text-zinc-500" />
                </div>
                <p className="mt-2 text-sm font-semibold text-zinc-700">Buko Pandan 6-inch</p>
                <p className="text-[11px] text-zinc-500">₱499 · Out of stock</p>
              </div>

              <div className="flex items-center justify-center">
                <ChevronRight size={18} className="text-zinc-400" />
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-3">
                <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-900">Substitute</p>
                <div className="mt-2 flex h-14 items-center justify-center rounded-2xl bg-zinc-50">
                  <ShoppingBag size={14} className="text-zinc-900" />
                </div>
                <p className="mt-2 text-sm font-semibold text-zinc-900">Ube Macapuno 6-inch</p>
                <p className="text-[11px] text-zinc-600">₱519 · In stock</p>
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-600">Same size, similar flavor. ₱20 difference — I will cover it.</p>

            <div className="mt-3 flex gap-2">
              <button onClick={() => setApproved(true)} className="flex-1 rounded-2xl bg-zinc-950 px-3 py-2 text-sm font-semibold text-white">
                Approve sub
              </button>
              <button onClick={() => setCancelled(true)} className="flex-1 rounded-2xl border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800">
                Cancel item
              </button>
            </div>
          </div>
        )}

        {(approved || cancelled) && (
          <div className="flex items-center gap-2 rounded-2xl bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
            <CheckCheck size={14} className="text-zinc-900" />
            {approved ? "Substitution approved. Heading to checkout now." : "Item cancelled. The request will be updated shortly."}
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 px-4 py-4">
        <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button onClick={handleSend} className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-950 text-white">
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

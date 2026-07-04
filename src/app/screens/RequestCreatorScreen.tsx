import { Camera, CheckCheck, MapPin, Package, Send, Star } from "lucide-react";
import { useState } from "react";
import type { Errand } from "../data/errands";

type RouteName = "home" | "feed" | "create" | "chat";

type RequestCreatorScreenProps = {
  onCreateRequest: (request: Errand) => void;
  onNavigate: (route: RouteName) => void;
};

export function RequestCreatorScreen({ onCreateRequest, onNavigate }: RequestCreatorScreenProps) {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [posted, setPosted] = useState(false);
  const [itemName, setItemName] = useState("");
  const [store, setStore] = useState("");
  const [cost, setCost] = useState("");
  const [tip, setTip] = useState(30);

  const handleSubmit = () => {
    if (!itemName || !store || !cost) {
      return;
    }

    onCreateRequest({
      id: Date.now(),
      requester: "You",
      avatar: "YO",
      distance: "0.2 km",
      item: itemName,
      store,
      cost,
      tip: tip.toString(),
      tag: "New",
      rating: 5,
      trips: 1,
    });
    setPosted(true);
    onNavigate("chat");
  };

  return (
    <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">New request</p>
          <h2 className="text-xl font-semibold text-zinc-900">What do you need?</h2>
        </div>
        <div className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-700">
          {posted ? "Posted" : "Draft"}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">Item photo</p>
          <button
            onClick={() => setPhotoUploaded((value) => !value)}
            className="flex h-28 w-full items-center justify-center rounded-[24px] border border-dashed border-zinc-300 bg-zinc-50 transition hover:border-zinc-500"
          >
            {photoUploaded ? (
              <div className="flex flex-col items-center gap-1 text-zinc-900">
                <CheckCheck size={18} />
                <span className="text-sm font-semibold">Photo attached</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-zinc-500">
                <Camera size={18} />
                <span className="text-sm">Tap to attach photo</span>
              </div>
            )}
          </button>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">Item name</p>
          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-3">
            <Package size={15} className="text-zinc-400" />
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Nescafe 3-in-1 x 12 sachets"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">Store location</p>
          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-3">
            <MapPin size={15} className="text-zinc-400" />
            <input
              value={store}
              onChange={(e) => setStore(e.target.value)}
              placeholder="e.g. 7-Eleven Katipunan Ave"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">Estimated item cost</p>
          <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-3">
            <span className="text-sm font-semibold text-zinc-400">₱</span>
            <input
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              type="number"
              placeholder="0.00"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="rounded-[24px] border border-zinc-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-900">Handling fee / tip</p>
            <div className="rounded-full bg-zinc-950 px-3 py-1 text-sm font-semibold text-white">₱{tip}</div>
          </div>
          <p className="mt-2 text-sm text-zinc-500">Set a fair rate. Runners see this before accepting.</p>
          <input
            type="range"
            min={10}
            max={200}
            step={5}
            value={tip}
            onChange={(e) => setTip(Number(e.target.value))}
            className="mt-4 w-full accent-zinc-950"
          />
          <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400">
            <span>₱10</span>
            <span>₱200</span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-zinc-50 px-3 py-2">
            <Star size={12} fill="#0a0a0a" strokeWidth={0} />
            <p className="text-sm text-zinc-600">
              {tip >= 80 ? "Great tip — runners will prioritize this request." : tip >= 40 ? "Fair rate. Your request will show up in the feed." : "Low tip may mean slower acceptance."}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-3 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Send size={15} />
          {posted ? "Posted to feed" : "Post request"}
        </button>
      </div>
    </div>
  );
}

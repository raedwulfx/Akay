import React from "react";
import type { Errand } from "../../data/errands";

type Props = {
  errands: Errand[];
  acceptedErrandId: number | null;
  route: string;
  selectedErrand?: Errand | null;
  className?: string;
};

export function LiveOverview({ errands, acceptedErrandId, route, selectedErrand, className = "" }: Props) {
  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">Live overview</p>
      <h2 className="mt-3 text-xl font-semibold text-zinc-950">Your errands, now in motion.</h2>
      <p className="mt-3 text-sm text-zinc-600">
        The app now supports a complete loop: discover a task, create one, and coordinate in chat without leaving the experience.
      </p>

      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Open requests</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-950">{errands.length}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Accepted</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-950">{acceptedErrandId ? 1 : 0}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Current route</p>
          <p className="mt-2 text-sm font-semibold text-zinc-950">{route === "chat" ? selectedErrand?.item : "Ready for a new task"}</p>
        </div>
      </div>
    </div>
  );
}

export default LiveOverview;

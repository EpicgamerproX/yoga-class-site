import { Flower2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-yuj-purple text-white">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 border border-white/20 animate-pulse">
          <Flower2 className="h-12 w-12 text-yuj-gold animate-spin" />
        </div>
        <p className="font-heading text-4xl font-bold">YUJ</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.34em] text-white/70">School of Yoga</p>
      </div>
    </div>
  );
}

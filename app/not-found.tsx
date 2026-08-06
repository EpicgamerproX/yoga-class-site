import Link from "next/link";
import { ArrowLeft, Flower2 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="aurora grid min-h-screen place-items-center px-6 py-24 text-center">
      <div className="max-w-md rounded-[32px] bg-white/80 p-8 shadow-2xl backdrop-blur-xl border border-white/60">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yuj-purple text-yuj-gold shadow-gold">
          <Flower2 className="h-10 w-10" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-yuj-gold">404 Page Not Found</p>
        <h1 className="mt-3 font-heading text-5xl font-bold text-yuj-purple">Peace Begins Here</h1>
        <p className="mt-4 text-sm leading-6 text-yuj-ink/75">
          The page you are looking for does not exist or has been moved. Return to practice on our homepage.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-yuj-purple px-7 py-3.5 font-bold text-white shadow-gold transition hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </main>
  );
}

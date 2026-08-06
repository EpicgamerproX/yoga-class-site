"use client";

import { Flower2, RefreshCw } from "lucide-react";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="aurora grid min-h-screen place-items-center px-6 py-24 text-center font-sans text-yuj-ink">
        <div className="max-w-md rounded-[32px] bg-white/90 p-8 shadow-2xl backdrop-blur-xl border border-white/70">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yuj-purple text-yuj-gold shadow-gold">
            <Flower2 className="h-10 w-10" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-yuj-purple">Something Went Wrong</h1>
          <p className="mt-4 text-sm leading-6 text-yuj-ink/75">
            An unexpected error occurred while loading this page. Please try refreshing to restore the connection.
          </p>
          <button
            onClick={() => reset()}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-yuj-purple px-7 py-3.5 font-bold text-white shadow-gold transition hover:scale-105"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

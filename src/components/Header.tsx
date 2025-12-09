'use client';

import { cn } from '@/lib/utils';

export function Header({ onPlacePin }: { onPlacePin: () => void }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-6 pb-3 bg-gradient-to-b from-blue-500/80 to-transparent">
      <div>
        <h1 className="text-white text-xl font-semibold tracking-tight">
          Global Profile Map
        </h1>
        <p className="text-sm text-white/70">
          Discover and follow Farcaster users worldwide
        </p>
      </div>
      <button
        onClick={onPlacePin}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium',
          'bg-white text-black shadow-lg shadow-black/40',
          'active:scale-95 transition-transform'
        )}
      >
        Place pin
      </button>
    </header>
  );
}

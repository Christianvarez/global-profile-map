'use client';

import { UserPin } from '@/types';

type Props = {
  onPinClick: (pin: UserPin) => void;
};

export function GlobalMap({ onPinClick }: Props) {
  // Placeholder map - will be replaced with real map using Mapbox/Leaflet
  return (
    <div className="h-full w-full">
      <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="inline-block p-4 bg-white/10 rounded-2xl backdrop-blur-sm mb-4">
            <svg className="w-12 h-12 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white/60 text-sm font-medium">
            Global map coming soon
          </p>
          <p className="text-white/40 text-xs mt-2">
            Interactive world map with user pins
          </p>
        </div>
      </div>
    </div>
  );
}

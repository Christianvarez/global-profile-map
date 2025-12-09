'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  onClose: () => void;
};

export function PlacePinModal({ onClose }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlacePin = async () => {
    setIsProcessing(true);
    // TODO: Implement USDC payment (1 USDC to 0x0b4244568b58dd0ffcb30ee4f9a6652feab06a8b)
    // TODO: After payment, save pin to database
    await new Promise((r) => setTimeout(r, 2000)); // Simulate
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-t-3xl bg-slate-900 text-white p-6 pb-8 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Place your pin</h2>
          <button
            onClick={onClose}
            className="text-sm text-white/60 hover:text-white transition"
          >
            Cancel
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-white/80 mb-2">
              Place your profile on the global map for <span className="font-semibold text-white">1 USDC</span>
            </p>
            <p className="text-xs text-white/50">
              Your pin will be visible to all users. They can click it to view your Farcaster profile and follow you.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/40">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Payment on Base network</span>
          </div>

          <button
            onClick={handlePlacePin}
            disabled={isProcessing}
            className={cn(
              'w-full py-3 rounded-full text-sm font-medium transition-all',
              'bg-white text-black shadow-lg',
              'active:scale-95',
              isProcessing && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isProcessing ? 'Processing...' : 'Pay 1 USDC & Place Pin'}
          </button>
        </div>
      </div>
    </div>
  );
}

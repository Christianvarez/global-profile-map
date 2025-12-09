'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { useFarcasterIdentity } from '@farcaster/miniapp-sdk/react';
import { cn } from '@/lib/utils';
import { USDC_CONTRACT_ADDRESS, RECEIVER_WALLET_ADDRESS, USDC_AMOUNT, ERC20_ABI } from '@/lib/contracts';

type Props = {
  onClose: () => void;
  location: { lat: number; lng: number };
};

export function PlacePinModal({ onClose, location }: Props) {
  const { address, isConnected } = useAccount();
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: farcasterUser } = useFarcasterIdentity();

  const { writeContract, data: hash, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handlePlacePin = async () => {
    if (!isConnected || !address) {
      alert('Please connect your Farcaster wallet first');
      return;
    }

    if (!farcasterUser) {
      alert('Unable to load your Farcaster profile');
      return;
    }

    try {
      setIsProcessing(true);

      // Execute USDC transfer
      writeContract({
        address: USDC_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [RECEIVER_WALLET_ADDRESS, USDC_AMOUNT],
      });

      // TODO: After successful payment, save pin data to database/API
      // Pin data should include:
      // - farcasterUser.fid (Farcaster ID)
      // - farcasterUser.username
      // - farcasterUser.displayName
      // - farcasterUser.pfpUrl (profile picture)
      // - location.lat, location.lng
      
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Error placing pin:', err);
      alert('Error placing pin. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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

        {!isConnected ? (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <p className="text-sm text-yellow-200">
              Please connect your Farcaster wallet to place a pin.
            </p>
          </div>
        ) : farcasterUser ? (
          <>
            {/* User Profile Preview */}
            <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                {farcasterUser.pfpUrl && (
                  <img 
                    src={farcasterUser.pfpUrl} 
                    alt={farcasterUser.displayName || farcasterUser.username}
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                )}
                <div>
                  <p className="font-semibold">{farcasterUser.displayName || farcasterUser.username}</p>
                  <p className="text-sm text-white/60">@{farcasterUser.username}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-white/80 bg-slate-900/50 px-3 py-2 rounded-lg">
                <span className="text-blue-400">📍</span>
                <span>Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
              <p className="text-sm text-white/80 mb-2">
                Place your profile on the global map for <span className="font-semibold text-white">1 USDC</span>
              </p>
              <p className="text-xs text-white/50">
                Your pin will be visible to all users. They can click it to view your Farcaster profile and follow you.
              </p>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePlacePin}
              disabled={isProcessing || isConfirming}
              className={cn(
                'w-full py-3 px-4 rounded-xl font-medium text-white transition-all',
                'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400',
                'shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
                isProcessing || isConfirming ? 'animate-pulse' : ''
              )}
            >
              {isProcessing || isConfirming ? '⏳ Processing...' : isSuccess ? '✓ Pin Placed!' : '💰 Pay 1 USDC & Place Pin'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-300">
                  Error: {error.message}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { cn } from '@/lib/utils';
import { USDC_CONTRACT_ADDRESS, RECEIVER_WALLET_ADDRESS, USDC_AMOUNT, ERC20_ABI } from '@/lib/contracts';

type Props = {
  onClose: () => void;
};

export function PlacePinModal({ onClose }: Props) {
  const { address, isConnected } = useAccount();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { writeContract, data: hash, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handlePlacePin = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      
      // Execute USDC transfer
      writeContract({
        address: USDC_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [RECEIVER_WALLET_ADDRESS, BigInt(USDC_AMOUNT)],
      });
    } catch (err) {
      console.error('Payment error:', err);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  // When transaction is successful
  if (isSuccess) {
    // TODO: Save pin to database via API
    // For now just close modal
    setTimeout(() => {
      onClose();
    }, 1000);
  }

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
          {!isConnected ? (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="text-sm text-yellow-200">
                Please connect your Farcaster wallet to place a pin.
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-white/80 mb-2">
                  Place your profile on the global map for <span className="font-semibold text-white">1 USDC</span>
                </p>
                <p className="text-xs text-white/50">
                  Your pin will be visible to all users. They can click it to view your Farcaster profile and follow you.
                </p>
              </div>

              {isSuccess && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <p className="text-sm text-green-200">
                    ✓ Payment successful! Your pin is being placed...
                  </p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm text-red-200">
                    Payment failed. Please try again.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-white/40">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Payment on Base network</span>
              </div>

              <button
                onClick={handlePlacePin}
                disabled={isProcessing || isConfirming || isSuccess}
                className={cn(
                  'w-full py-3 rounded-full text-sm font-medium transition-all',
                  'bg-white text-black shadow-lg',
                  'active:scale-95',
                  (isProcessing || isConfirming || isSuccess) && 'opacity-50 cursor-not-allowed'
                )}
              >
                {isConfirming ? 'Confirming...' : isSuccess ? 'Success!' : 'Pay 1 USDC & Place Pin'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

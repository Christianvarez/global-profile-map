'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { sdk } from '@farcaster/miniapp-sdk';
import { cn } from '@/lib/utils';
import { USDC_CONTRACT_ADDRESS, RECEIVER_WALLET_ADDRESS, USDC_AMOUNT, ERC20_ABI } from '@/lib/contracts';

type Props = {
  onClose: () => void;
  location: { lat: number; lng: number };
};

export function PlacePinModal({ onClose, location }: Props) {
  const { address, isConnected } = useAccount();
  const [isProcessing, setIsProcessing] = useState(false);
  const [farcasterUser, setFarcasterUser] = useState<any>(null);
  
  const { writeContract, data: hash, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Get Farcaster context when modal opens
  useEffect(() => {
    async function loadFarcasterContext() {
      try {
        const context = await sdk.context;
        if (context?.user) {
          setFarcasterUser(context.user);
        }
      } catch (err) {
        console.error('Failed to load Farcaster context:', err);
      }
    }
    loadFarcasterContext();
  }, []);

  const handlePlacePin = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!farcasterUser) {
      alert('Unable to load your Farcaster profile');
      return;
    }

    setIsProcessing(true);
    try {
      // Execute USDC transfer
      writeContract({
        address: USDC_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [RECEIVER_WALLET_ADDRESS, USDC_AMOUNT],
      });
    } catch (err) {
      console.error('Error placing pin:', err);
      alert('Failed to place pin. Please try again.');
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert('Pin placed successfully!');
      // TODO: Save pin to database
      onClose();
    }
  }, [isSuccess, onClose]);

  if (error) {
    console.error('Transaction error:', error);
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Place Your Pin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {farcasterUser ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                {farcasterUser.pfpUrl && (
                  <img
                    src={farcasterUser.pfpUrl}
                    alt={farcasterUser.username}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {farcasterUser.displayName || farcasterUser.username}
                  </p>
                  <p className="text-sm text-gray-600">@{farcasterUser.username}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="font-mono text-sm text-gray-800">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                💰 Placing a pin costs <span className="font-bold">1 USDC</span>
              </p>
            </div>

            <button
              onClick={handlePlacePin}
              disabled={isProcessing || isConfirming}
              className={cn(
                'w-full py-3 px-6 rounded-xl font-semibold text-white',
                'bg-gradient-to-r from-blue-600 to-indigo-600',
                'hover:from-blue-700 hover:to-indigo-700',
                'transition-all duration-200 shadow-lg',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {isProcessing || isConfirming
                ? 'Processing...'
                : 'Pay 1 USDC & Place Pin'}
            </button>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { cn } from '@/lib/utils';

type Props = {
  onPlacePin: () => void;
};

export function Header({ onPlacePin }: Props) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-blue-600/90 via-blue-500/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
          <span className="text-2xl">🌍</span>
        </div>
        <div>
          <h1 className="text-white text-lg font-bold tracking-tight">
            Global Base Profile
          </h1>
          <p className="text-xs text-white/80 font-medium">
            Discover Farcaster users worldwide
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isConnected ? (
          <>
            <button
              onClick={onPlacePin}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm font-semibold',
                'bg-white text-blue-600 shadow-lg shadow-blue-900/30',
                'hover:bg-blue-50 active:scale-95 transition-all duration-200',
                'border border-blue-100'
              )}
            >
              📍 Place Pin
            </button>
            <button
              onClick={() => disconnect()}
              className={cn(
                'px-3 py-2.5 rounded-xl text-xs font-medium',
                'bg-white/10 text-white backdrop-blur-sm',
                'hover:bg-white/20 active:scale-95 transition-all duration-200',
                'border border-white/20'
              )}
            >
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </button>
          </>
        ) : (
          <button
            onClick={handleConnect}
            className={cn(
              'px-5 py-2.5 rounded-xl text-sm font-semibold',
              'bg-white text-blue-600 shadow-lg shadow-blue-900/30',
              'hover:bg-blue-50 active:scale-95 transition-all duration-200',
              'border border-blue-100'
            )}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}

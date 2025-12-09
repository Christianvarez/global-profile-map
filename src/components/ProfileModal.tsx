'use client';

import { UserPin } from '@/types';
import { cn } from '@/lib/utils';

type Props = {
  profile: UserPin;
  onClose: () => void;
};

export function ProfileModal({ profile, onClose }: Props) {
  const warpcastUrl = `https://warpcast.com/${profile.username}`;

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-t-3xl bg-slate-900 text-white p-6 pb-8 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <button
            onClick={onClose}
            className="text-sm text-white/60 hover:text-white transition"
          >
            Close
          </button>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-4 flex items-center justify-center overflow-hidden">
            {profile.pfpUrl ? (
              <img src={profile.pfpUrl} alt={profile.displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-white">
                {profile.displayName.charAt(0)}
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-1">{profile.displayName}</h3>
          <p className="text-sm text-white/60 mb-4">@{profile.username}</p>
          
          <div className="w-full space-y-2">
            <a
              href={warpcastUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'block w-full py-3 rounded-full text-sm font-medium transition-all',
                'bg-purple-600 text-white hover:bg-purple-700',
                'active:scale-95'
              )}
            >
              View on Warpcast
            </a>
            
            <button
              onClick={onClose}
              className={cn(
                'block w-full py-3 rounded-full text-sm font-medium transition-all',
                'bg-white/10 text-white hover:bg-white/20',
                'active:scale-95'
              )}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

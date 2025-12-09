'use client';

import { GlobalMap } from '@/components/GlobalMap';
import { Header } from '@/components/Header';
import { PlacePinModal } from '@/components/PlacePinModal';
import { ProfileModal } from '@/components/ProfileModal';
import { useState } from 'react';
import type { UserPin } from '@/types';

export default function Home() {
  const [showPlacePin, setShowPlacePin] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<UserPin | null>(null);

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header onPlacePin={() => setShowPlacePin(true)} />
      <GlobalMap onPinClick={(pin) => setSelectedProfile(pin)} />
      {showPlacePin && <PlacePinModal onClose={() => setShowPlacePin(false)} />}
      {selectedProfile && (
        <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </main>
  );
}
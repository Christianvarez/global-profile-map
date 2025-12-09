export interface UserPin {
  id: string;
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  bio?: string;
  followerCount?: number;
  followingCount?: number;
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}
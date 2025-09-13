import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { LatLngExpression } from "leaflet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 2点間の距離をメートル単位で計算する（Haversine公式）
export function calculateDistance(p1: LatLngExpression, p2: LatLngExpression): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const lat1 = Array.isArray(p1) ? p1[0] : p1.lat;
  const lng1 = Array.isArray(p1) ? p1[1] : p1.lng;
  const lat2 = Array.isArray(p2) ? p2[0] : p2.lat;
  const lng2 = Array.isArray(p2) ? p2[1] : p2.lng;

  const R = 6371e3; // 地球の半径 (メートル)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 距離 (メートル)
}


"use client";

import { useState, useRef, useCallback } from 'react';
import { LatLngExpression } from 'leaflet';

type GeolocationError = {
  code: number;
  message: string;
};

export const useGeolocation = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const watchId = useRef<number | null>(null);

  const startWatching = useCallback(() => {
    if (!navigator.geolocation) {
      setError({ code: 0, message: 'Geolocation is not supported by your browser' });
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setError(null);
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        setError({ code: err.code, message: err.message });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const stopWatching = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  return { position, error, startWatching, stopWatching };
};

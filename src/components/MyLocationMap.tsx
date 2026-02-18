"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "./ThemeProvider"; 
import { useLanguage } from "./LanguageContext";


const greenDotIcon = typeof window !== "undefined" ? L.divIcon({
  className: "custom-location-icon",
  html: `<div class="dot-wrapper">
           <div class="pulse"></div>
           <div class="dot"></div>
         </div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
}) : null;

export default function MyLocationMap() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const {t}=useLanguage();

  const position: [number, number] = [28.6139, 77.2090];

  useEffect(() => {
    setMounted(true);
 
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

 
  const tileUrl = theme === "dark" 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  if (!mounted) return <div className="h-[450px] w-full bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-3xl" />;

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {t("current")}
          </h3>
          
        </div>

        <div className="h-[450px] w-full rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-xl relative z-0 group">
          <MapContainer
            center={position}
            zoom={11}
            scrollWheelZoom={true}
            className="h-full w-full transition-all duration-700"
           
            key={theme} 
          >
            <TileLayer
              attribution='&copy; CARTO'
              url={tileUrl}
            />
            
            {greenDotIcon && <Marker position={position} icon={greenDotIcon} />}
          </MapContainer>
        </div>
      </div>

      <style>{`
        
        .dot-wrapper {
          position: relative;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dot {
          width: 12px;
          height: 12px;
          background: #22c55e;
          border: 2px solid ${theme === 'dark' ? '#18181b' : '#ffffff'};
          border-radius: 50%;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.6);
        }
        .pulse {
          position: absolute;
          width: 35px;
          height: 35px;
          background: rgba(34, 197, 94, 0.3);
          border-radius: 50%;
          animation: pulse-ring 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.2); opacity: 0.8; }
          80%, 100% { transform: scale(1.5); opacity: 0; }
        }

        /* Leaflet UI Overrides */
        .leaflet-bar {
          border: none !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom-in, .leaflet-control-zoom-out {
          background: ${theme === 'dark' ? '#27272a' : '#ffffff'} !important;
          color: ${theme === 'dark' ? '#ffffff' : '#000000'} !important;
          border: 1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} !important;
        }
        .leaflet-container {
          background: ${theme === 'dark' ? '#18181b' : '#f4f4f5'} !important;
        }
        .leaflet-vignette {
          pointer-events: none;
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.2);
          z-index: 1000;
        }
      `}</style>
    </section>
  );
}
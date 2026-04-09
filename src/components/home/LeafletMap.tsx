"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon, LatLngBounds, Map, tileLayer, geoJSON, marker } from "leaflet";
import type { Map as LeafletMapType, LeafletMouseEvent } from "leaflet";

interface Feature {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
}

interface BidukBidukData {
  type: "FeatureCollection";
  features: Feature[];
}

interface MarkerData {
  id: string;
  coordinates: [number, number];
  title: string;
  type: string;
  description: string;
  image: string;
}

interface LeafletMapProps {
  mapData: BidukBidukData;
  markerData: MarkerData[];
  center: [number, number];
  hoveredMarker: string | null;
  onMarkerHover: (id: string) => void;
  onMarkerLeave: () => void;
  onMarkerClick: (id: string) => void;
  clickedMarker?: string | null;
  onMapClick?: () => void;
}

// Coordinate offset untuk marker (dalam derajat)
// Nilai negatif = ke kiri (longitude) dan ke bawah (latitude)
const MARKER_OFFSET = {
  latitude: -0.001,  // Ke bawah (minus = south)
  longitude: -0.001, // Ke kiri (minus = west)
};

// Custom marker icon
const createCustomIcon = (isHovered: boolean) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
          fill="${isHovered ? '#FFA726' : '#FFD485'}" 
          stroke="#825400" 
          stroke-width="1"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const LeafletMap: React.FC<LeafletMapProps> = ({
  mapData,
  markerData,
  center: _center, // Keep for interface but use responsive center instead
  hoveredMarker,
  onMarkerHover,
  onMarkerLeave,
  onMarkerClick,
  clickedMarker,
  onMapClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMapType | null>(null);
  const markersRef = useRef<ReturnType<typeof marker>[]>([]);
  const geoJsonLayerRef = useRef<ReturnType<typeof geoJSON> | null>(null);
  const mapDataRef = useRef(mapData);
  const isZoomingRef = useRef(false);
  const hasUserInteractedRef = useRef(false); // Track if user has interacted with map
  const isInitializedRef = useRef(false); // Track if map has been initialized
  const [isMounted, setIsMounted] = useState(false);

  // Keep mapDataRef in sync
  useEffect(() => {
    mapDataRef.current = mapData;
  }, [mapData]);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) {
      return;
    }

    // Prevent multiple initializations
      if (mapInstanceRef.current || isInitializedRef.current) {
        return; // Don't reinitialize if already initialized
      }

    const container = mapContainerRef.current;
    let resizeObserver: ResizeObserver | null = null;
    let initTimer: NodeJS.Timeout | null = null;

    function tryInitialize() {
      if (!mapContainerRef.current || mapInstanceRef.current) {
        return;
      }

      const currentContainer = mapContainerRef.current;
      const hasDimensions = currentContainer.offsetWidth > 0 && currentContainer.offsetHeight > 0;
      
      if (hasDimensions) {
        initializeMap();
        // Cleanup observer once initialized
        if (resizeObserver) {
          resizeObserver.disconnect();
          resizeObserver = null;
        }
        if (initTimer) {
          clearTimeout(initTimer);
          initTimer = null;
        }
      } else {
        console.warn('[LeafletMap] Container has no dimensions, waiting...', {
          width: currentContainer.offsetWidth,
          height: currentContainer.offsetHeight
        });
      }
    }

    // Try to initialize immediately
    tryInitialize();

    // If container doesn't have dimensions, use ResizeObserver to detect when it gets them
    if (!container.offsetWidth || !container.offsetHeight) {
      // Observe parent element as well, since container width depends on parent
      const parent = container.parentElement;
      if (parent) {
        resizeObserver = new ResizeObserver(() => {
          const currentContainer = mapContainerRef.current;
          if (currentContainer && currentContainer.offsetWidth > 0 && currentContainer.offsetHeight > 0) {
            tryInitialize();
          }
        });
        resizeObserver.observe(container);
        resizeObserver.observe(parent);
      } else {
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
              tryInitialize();
            }
          }
        });
        resizeObserver.observe(container);
      }

      // Also set multiple fallback timers with increasing delays
      initTimer = setTimeout(() => {
        tryInitialize();
      }, 500);
      
      setTimeout(() => {
        tryInitialize();
      }, 1000);
      
      setTimeout(() => {
        tryInitialize();
      }, 2000);
    }

    function initializeMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) {
        return;
      }

      try {
        // Responsive center for mobile/tablet - center on Biduk-Biduk area
        const getMapCenter = (): [number, number] => {
          if (typeof window !== "undefined") {
            const screenWidth = window.innerWidth;
            if (screenWidth < 1024) {
              // Mobile and tablet: center on Biduk-Biduk area
              return [1.22, 118.674]; // Biduk-Biduk center
            }
          }
          // Desktop: show whole island
          return [0.5, 115.0]; // Kalimantan center
        };

        const mapCenter = getMapCenter();

        // Initialize map - start with zoom out to show whole island
        const map = new Map(mapContainerRef.current, {
          center: mapCenter,
          zoom: 6, // Zoom out to show whole island
          scrollWheelZoom: true,
        });

        mapInstanceRef.current = map;
        isInitializedRef.current = true;

        // Track zoom state to prevent tooltip conflicts
        map.on('zoomstart', () => {
          isZoomingRef.current = true;
          hasUserInteractedRef.current = true; // User is interacting with map
        });
        map.on('zoomend', () => {
          isZoomingRef.current = false;
        });
        
        // Track user interactions (drag, zoom, etc.)
        map.on('dragstart', () => {
          hasUserInteractedRef.current = true;
        });
        map.on('moveend', () => {
          hasUserInteractedRef.current = true;
        });

        // Clear clicked marker when user clicks on map background
        map.on('click', () => {
          try {
            if (onMapClick) onMapClick();
          } catch {
            // Ignore
          }
        });

        // Add tile layer
        tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        console.log('[LeafletMap] Map initialized successfully', {
          center: mapCenter,
          zoom: 6
        });

        // Keep map at zoom out level (no auto zoom in)

        // Force map to invalidate size to ensure tiles load
        // Wait for map to be fully ready before invalidating
        // Use whenReady to ensure map is fully initialized
        map.whenReady(() => {
          try {
            if (map && mapContainerRef.current && !hasUserInteractedRef.current) {
              // Only invalidate size on initial load, not after user interaction
              // Small delay to ensure DOM is ready
              setTimeout(() => {
                if (!hasUserInteractedRef.current) {
                  map.invalidateSize();
                  console.log('[LeafletMap] Map size invalidated (initial load)');
                }
              }, 100);
            }
          } catch (error) {
            console.warn('[LeafletMap] Error invalidating size:', error);
          }
        });
      } catch (error) {
        console.error('[LeafletMap] Error initializing map:', error);
      }
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (initTimer) {
        clearTimeout(initTimer);
      }
      if (mapInstanceRef.current) {
        try {
          // Remove all markers
          markersRef.current.forEach((m) => {
            mapInstanceRef.current?.removeLayer(m);
          });
          markersRef.current = [];

          // Remove GeoJSON layer if exists
          if (geoJsonLayerRef.current) {
            mapInstanceRef.current.removeLayer(geoJsonLayerRef.current);
            geoJsonLayerRef.current = null;
          }

          // Remove map
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
          isInitializedRef.current = false;
          hasUserInteractedRef.current = false; // Reset on cleanup
        } catch (error) {
          console.error('[LeafletMap] Error during cleanup:', error);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]); // onMapClick intentionally omitted to prevent map re-initialization

  // Update GeoJSON layer when mapData changes
  useEffect(() => {
    if (!mapInstanceRef.current || !mapData || !mapData.features || mapData.features.length === 0) {
      return;
    }

    const map = mapInstanceRef.current;

    // Remove existing GeoJSON layer
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
      geoJsonLayerRef.current = null;
    }

    // Add new GeoJSON layer - remove white fill, only show border
    const geoJsonLayer = geoJSON(mapData as unknown as GeoJSON.FeatureCollection, {
      style: () => ({
        fillColor: "transparent", // No fill
        fillOpacity: 0, // Transparent fill
        color: "#FFFFFF", // White border
        weight: 2,
        opacity: 1,
      }),
    }).addTo(map);

    geoJsonLayerRef.current = geoJsonLayer;

    // Fit bounds to GeoJSON
    const bounds = new LatLngBounds([]);
    mapData.features.forEach((feature) => {
      if (feature.geometry.type === "MultiPolygon") {
        feature.geometry.coordinates.forEach((polygon) => {
          polygon.forEach((ring) => {
            ring.forEach((coord) => {
              bounds.extend([coord[1], coord[0]]);
            });
          });
        });
      }
    });

    // Don't auto-fit bounds, keep at zoom out level
    // User can manually zoom in if needed
  }, [mapData]);

  // Update markers with debounce to prevent errors during zoom
  useEffect(() => {
    if (!mapInstanceRef.current || !isMounted) {
      return;
    }

    // Debounce marker updates to prevent errors during zoom
    const updateTimer = setTimeout(() => {
      const map = mapInstanceRef.current;
      if (!map) {
        return;
      }

      try {
        // Remove existing markers safely
        markersRef.current.forEach((m) => {
          try {
            if (m && map.hasLayer(m)) {
              map.removeLayer(m);
            }
          } catch {
            // Ignore errors during marker removal
          }
        });
        markersRef.current = [];

        // Add new markers with coordinate offset
        markerData.forEach((markerDataItem) => {
          if (!markerDataItem.coordinates[0] || !markerDataItem.coordinates[1]) {
            return;
          }

          // Apply offset: x minus (ke kiri), y minus (ke bawah)
          // Offset dalam derajat untuk menyesuaikan koordinat dari Google Maps
          const adjustedCoordinates: [number, number] = [
            markerDataItem.coordinates[0] + MARKER_OFFSET.latitude,  // Latitude offset (ke bawah)
            markerDataItem.coordinates[1] + MARKER_OFFSET.longitude, // Longitude offset (ke kiri)
          ];

          const isActive = hoveredMarker === markerDataItem.id || clickedMarker === markerDataItem.id;
          const customIcon = createCustomIcon(isActive);
          const markerInstance = marker(adjustedCoordinates, {
            icon: customIcon,
          });

          // Create tooltip content for hover (image + title)
          const tooltipContent = `
            <div style="padding: 0; margin: 0; max-width: 200px;">
              <div style="width: 100%; height: 80px; background: #e5e7eb; border-radius: 4px 4px 0 0; overflow: hidden; position: relative;">
                <img src="${markerDataItem.image}" alt="${markerDataItem.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'width: 100%; height: 100%; background: linear-gradient(to bottom right, #dbeafe, #bfdbfe); display: flex; align-items: center; justify-center;\\'><span style=\\'color: #2563eb; font-size: 10px;\\'>No Image</span></div>';" />
              </div>
              <div style="padding: 6px 8px; background: white;">
                <h4 style="font-weight: bold; color: #1f2937; font-size: 12px; margin: 0; line-height: 1.2;">
                  ${markerDataItem.title}
                </h4>
              </div>
            </div>
          `;

          // Create popup content for click
          const popupContent = `
            <div style="padding: 8px;">
              <div style="width: 100%; height: 96px; background: #e5e7eb; border-radius: 4px; margin-bottom: 8px; overflow: hidden; position: relative;">
                <img src="${markerDataItem.image}" alt="${markerDataItem.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'width: 100%; height: 100%; background: linear-gradient(to bottom right, #dbeafe, #bfdbfe); display: flex; align-items: center; justify-content: center;\\'><span style=\\'color: #2563eb; font-size: 12px;\\'>No Image</span></div>';" />
              </div>
              <h4 style="font-weight: bold; color: #1f2937; font-size: 14px; margin-bottom: 4px;">
                ${markerDataItem.title}
              </h4>
              <p style="color: #4b5563; font-size: 12px;">
                ${markerDataItem.type}
              </p>
            </div>
          `;

          markerInstance
            .bindTooltip(tooltipContent, {
              permanent: false,
              direction: 'top',
              offset: [0, -10],
              className: 'custom-tooltip',
              opacity: 0.95,
              interactive: false, // Prevent tooltip from interfering with zoom
            })
            .bindPopup(popupContent)
            .on("popupclose", () => {
              try {
                if (onMapClick) onMapClick();
              } catch {
                // Ignore
              }
            })
            .on("mouseover", () => {
              // Prevent tooltip update during zoom
              if (mapInstanceRef.current && !isZoomingRef.current) {
                try {
                  onMarkerHover(markerDataItem.id);
                } catch {
                  // Ignore errors during hover
                }
              }
            })
            .on("mouseout", () => {
              try {
                onMarkerLeave();
              } catch {
                // Ignore errors during mouseout
              }
            })
            .on("click", (e: LeafletMouseEvent) => {
              // Stop event from bubbling to the map
              if (e && e.originalEvent) {
                e.originalEvent.stopPropagation();
              }
              try {
                onMarkerClick(markerDataItem.id);
                // Zoom in to the marker location with smooth animation
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo(adjustedCoordinates, 16, {
                    duration: 1.2,
                    easeLinearity: 0.25,
                  });
                }
              } catch {
                // Ignore errors during click
              }
            })
            .addTo(map);

          markersRef.current.push(markerInstance);
        });
      } catch (error) {
        console.error('[LeafletMap] Error updating markers:', error);
      }
    }, 100); // 100ms debounce to prevent errors during zoom

    return () => {
      clearTimeout(updateTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerData, hoveredMarker, isMounted, onMarkerHover, onMarkerLeave, onMarkerClick]);

  // Update marker icons when hoveredMarker changes
  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    // Debounce icon updates to prevent errors during zoom
    const iconUpdateTimer = setTimeout(() => {
      try {
        const map = mapInstanceRef.current;
        if (!map) {
          return;
        }

        markersRef.current.forEach((markerInstance, index) => {
          try {
            const markerDataItem = markerData[index];
            if (markerDataItem && markerInstance && map.hasLayer(markerInstance)) {
              const isActive =
                hoveredMarker === markerDataItem.id ||
                clickedMarker === markerDataItem.id;
              const newIcon = createCustomIcon(isActive);
              markerInstance.setIcon(newIcon);
            }
          } catch {
            // Ignore errors for individual markers
          }
        });
      } catch (error) {
        console.error('[LeafletMap] Error updating marker icons:', error);
      }
    }, 50); // 50ms debounce

    return () => {
      clearTimeout(iconUpdateTimer);
    };
  }, [hoveredMarker, clickedMarker, markerData]);

  if (!isMounted) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      style={{ 
        width: "100%", 
        height: "100%", 
        minHeight: "320px",
        zIndex: 0,
        position: "relative"
      }}
      className="leaflet-container"
      data-testid="leaflet-map-container"
    />
  );
};

export default LeafletMap;

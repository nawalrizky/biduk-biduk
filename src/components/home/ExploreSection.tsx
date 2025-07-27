'use client'

import React, { useEffect, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { Group } from '@visx/group'
import Image from 'next/image'

interface Feature {
  type: 'Feature'
  properties: {
    GID_0: string
    NAME_0: string
    GID_1: string
    NAME_1: string
    NL_NAME_1: string
    GID_2: string
    NAME_2: string
    NL_NAME_2: string
    GID_3: string
    NAME_3: string
    NL_NAME_3: string
    GID_4: string
    NAME_4: string
    VARNAME_4: string
    TYPE_4: string
    ENGTYPE_4: string
    CC_4: string
  }
  geometry: {
    type: 'MultiPolygon'
    coordinates: number[][][][]
  }
}

interface BidukBidukData {
  type: 'FeatureCollection'
  features: Feature[]
}

const ExploreSection: React.FC = () => {
  const [mapData, setMapData] = useState<BidukBidukData | null>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null)
  const [clickedMarker, setClickedMarker] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{x: number, y: number} | null>(null)
  const [clickPosition, setClickPosition] = useState<{x: number, y: number} | null>(null)

  const center: [number, number] = [118.674, 1.22] // Koordinat pusat Biduk-Biduk yang sebenarnya

  // Responsive dimensions
  const getMapDimensions = () => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth
      if (screenWidth < 640) { // mobile
        return { width: 320, height: 320, scale: 65000 }
      } else if (screenWidth < 1024) { // tablet
        return { width: 400, height: 400, scale: 87000 }
      } else if (screenWidth < 1536) { // desktop
        return { width: 500, height: 500, scale: 115000 }
      } else { // 3xl
        return { width: 600, height: 600, scale: 125000 }
      }
    }
    return { width: 600, height: 600, scale: 125000 }
  }

  const [mapDimensions, setMapDimensions] = useState(getMapDimensions())

  useEffect(() => {
    const handleResize = () => {
      setMapDimensions(getMapDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await fetch('/biduk_biduk.json')
        const data = await response.json()
        setMapData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error loading map data:', error)
        setLoading(false)
      }
    }

    loadMapData()
  }, [])

  useEffect(() => {
    // Hide click content on scroll or click outside
    const handleHideClickContent = () => {
      setClickedMarker(null)
      setClickPosition(null)
    }
    window.addEventListener('scroll', handleHideClickContent)
    window.addEventListener('mousedown', handleHideClickContent)
    return () => {
      window.removeEventListener('scroll', handleHideClickContent)
      window.removeEventListener('mousedown', handleHideClickContent)
    }
  }, [])

  if (loading) {
    return (
      <section 
        className="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/home/explore.png')"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      </section>
    )
  }

  if (!mapData || !mapData.features || mapData.features.length === 0) {
    return (
      <section 
        className="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/home/explore.png')"
        }}
      >
        
        <div className="relative z-10">
          <p className="text-white font-semibold">Failed to load map data</p>
        </div>
      </section>
    )
  }

  // Setup projections
  const projection = geoMercator()
    .scale(mapDimensions.scale)
    .center(center)
    .translate([mapDimensions.width / 2, mapDimensions.height / 2])

  const pathGenerator = geoPath().projection(projection)

  const feature = mapData.features[0]

  // Marker data
    const markerData = [
    {
      id: 'pantai-biduk',
      coordinates: [118.68365837631133, 1.2552809003754883] as [number, number],
      title: 'Pantai Biduk-Biduk',
      type: 'Pantai Wisata',
      description: 'Pantai dengan pasir putih yang eksotis dan view sunset menawan',
      image: '/images/home/destination/image1.png'
    },
    {
      id: 'dermaga-nelayan',
      coordinates: [118.73299248841035, 1.2288381386994967] as [number, number],
      title: 'Dermaga Nelayan',
      type: 'Pelabuhan Tradisional',
      description: 'Tempat berlabuh perahu-perahu nelayan lokal dengan aktivitas harian yang menarik',
      image: '/images/home/destination/image2.png'
    }
  ]

  const handleMarkerHover = (markerId: string, event: React.MouseEvent) => {
    setHoveredMarker(markerId)
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }

  const handleMarkerLeave = () => {
    setHoveredMarker(null)
    setTooltipPosition(null)
  }

  const handleMarkerClick = (markerId: string, event: React.MouseEvent) => {
    setClickedMarker(clickedMarker === markerId ? null : markerId)
    setClickPosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <section 
      className="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/home/explore.png')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#027DB9] opacity-50"></div>
      <div className="relative flex flex-col z-10 container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-plant text-white mb-2 lg:mb-4">
            Know Before You Go
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Explore Biduk-Biduk
          </p>
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:-mt-20  lg:gap-10 w-full'>

      {/* Map Content */}
      <div className="relative z-10 flex justify-center lg:-ml-28">
        <svg width={mapDimensions.width} height={mapDimensions.height} className="max-w-full h-auto">
          <Group>
            {/* Village boundaries */}
            {feature.geometry.type === 'MultiPolygon' && feature.geometry.coordinates.map((polygon, polygonIndex) => (
              polygon.map((ring, ringIndex) => {
                const polygonFeature = {
                  type: 'Polygon' as const,
                  coordinates: [ring]
                }
                const pathData = pathGenerator(polygonFeature)
                
                return pathData ? (
                  <path
                    key={`${polygonIndex}-${ringIndex}`}
                    d={pathData}
                    fill="#FFFFFF"
                    fillOpacity={1}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    className="hover:fill-opacity-90 transition-all duration-300 cursor-pointer"
                  />
                ) : null
              })
            ))}
            
            {/* Interactive Markers */}
            {markerData.map((marker) => {
              const markerCoords = projection(marker.coordinates)
              const markerSize = mapDimensions.width < 400 ? 20 : 24
              const hitAreaSize = mapDimensions.width < 400 ? 16 : 20
              return markerCoords ? (
                <g key={marker.id}>
                  {/* Invisible hit area for stable hover */}
                  <circle
                    cx={markerCoords[0]}
                    cy={markerCoords[1] - (markerSize/2)}
                    r={hitAreaSize}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={(e) => handleMarkerHover(marker.id, e)}
                    onMouseLeave={handleMarkerLeave}
                    onClick={(e) => handleMarkerClick(marker.id, e)}
                  />
                  
                  {/* Location SVG Icon - positioned so the bottom point is exactly at the coordinate */}
                  <svg 
                    x={markerCoords[0] - (markerSize/2)} 
                    y={markerCoords[1] - markerSize + 2} 
                    width={markerSize} 
                    height={markerSize} 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className="pointer-events-none"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill={hoveredMarker === marker.id ? "#FFA726" : "#FFD485"}
                      stroke="#825400"
                      strokeWidth="1"
                      className="transition-colors duration-200"
                    />
                  </svg>
                  
                  {/* Debug point to show exact coordinate */}
                  <circle
                    cx={markerCoords[0]}
                    cy={markerCoords[1]}
                    r={mapDimensions.width < 400 ? "1.5" : "2"}
                    fill="#825400"
                    opacity="0.8"
                    className="pointer-events-none"
                  />

                  {/* Click Info Box */}
                  {/* Tidak perlu info klik di dalam SVG, hanya versi fixed di luar SVG */}
                </g>
              ) : null
            })}
          </Group>
        </svg>
      </div>

      {/* Hover Tooltip */}
      {hoveredMarker && tooltipPosition && (() => {
        // Tooltip hanya aktif di desktop/3xl
        if (typeof window !== 'undefined' && window.innerWidth < 1024) return null
        const marker = markerData.find(m => m.id === hoveredMarker)
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
        const tooltipWidth = isMobile ? 160 : 200
        const tooltipHeight = isMobile ? 80 : 110
        let left = tooltipPosition.x - tooltipWidth / 2
        let top = tooltipPosition.y - tooltipHeight - 24
        // Hindari terpotong di kiri/kanan
        if (typeof window !== 'undefined') {
          if (left < 8) left = 8
          if (left + tooltipWidth > window.innerWidth - 8) left = window.innerWidth - tooltipWidth - 8
          if (top < 8) top = tooltipPosition.y + 24 // jika terlalu atas, tampil di bawah point
        }
        return (
          <div
            className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 pointer-events-none overflow-hidden"
            style={{
              left,
              top,
              width: tooltipWidth
            }}
          >
            {/* Image Preview */}
            <div className={`w-full ${isMobile ? 'h-16' : 'h-24'} bg-gray-200 relative overflow-hidden`}>
              <Image
                src={marker?.image || ''}
                alt={marker?.title || ''}
                fill
                className="object-cover"
                sizes={isMobile ? '160px' : '200px'}
                onError={(e) => {
                  // Fallback jika gambar tidak ditemukan
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class=\"w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center\">
                      <span class=\"text-blue-600 text-xs\">No Image</span>
                    </div>
                  `
                }}
              />
            </div>
            {/* Text Content */}
            <div className={`${isMobile ? 'p-2' : 'p-3'}`}>
              <h4 className={`font-bold text-gray-800 ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>{marker?.title}</h4>
              <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-xs'}`}>{marker?.type}</p>
            </div>
          </div>
        )
      })()}
      {/* Click Info Box */}
      {clickedMarker && clickPosition && (() => {
        const marker = markerData.find(m => m.id === clickedMarker)
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
        const tooltipWidth = isMobile ? 160 : 200
        const tooltipHeight = isMobile ? 80 : 110
        let left = clickPosition.x - tooltipWidth / 2
        let top = clickPosition.y - tooltipHeight - 24
        if (typeof window !== 'undefined') {
          if (left < 8) left = 8
          if (left + tooltipWidth > window.innerWidth - 8) left = window.innerWidth - tooltipWidth - 8
          if (top < 8) top = clickPosition.y + 24
        }
        return (
          <div
            className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
            style={{ left, top, width: tooltipWidth }}
          >
            {/* Image Preview */}
            <div className={`w-full ${isMobile ? 'h-16' : 'h-24'} bg-gray-200 relative overflow-hidden`}>
              <Image
                src={marker?.image || ''}
                alt={marker?.title || ''}
                fill
                className="object-cover"
                sizes={isMobile ? '160px' : '200px'}
                onError={(e) => {
                  // Fallback jika gambar tidak ditemukan
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class=\"w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center\">
                      <span class=\"text-blue-600 text-xs\">No Image</span>
                    </div>
                  `
                }}
              />
            </div>
            {/* Text Content */}
            <div className={`${isMobile ? 'p-2' : 'p-3'}`}>
              <h4 className={`font-bold text-gray-800 ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>{marker?.title}</h4>
              <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-xs'}`}>{marker?.type}</p>
            </div>
          </div>
        )
      })()}
      {/* Statistics */}
      <div className="flex flex-col sm:flex-row mx-auto sm:mx-0 px-32 sm:px-0 lg:flex-col gap-6 sm:gap-8 lg:gap-12 lg:mt-36 w-full lg:w-auto justify-center lg:justify-start items-start sm:items-center lg:items-start">
        <div className="flex items-start sm:items-center gap-3 lg:gap-4 justify-start sm:justify-center lg:justify-start w-full">
          <Image 
            src="/images/home/icon1.png" 
            alt="Facilities Icon" 
            width={48} 
            height={48} 
            loading='lazy'
            className="w-10 h-10 sm:w-12 sm:h-12" 
          />
          <div className="flex flex-col items-start">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">14+</h1>
            <h2 className="text-xs sm:text-sm lg:text-base font-plant text-white">Facilities</h2>
          </div>
        </div>
        <div className="flex items-start sm:items-center gap-3 lg:gap-4 justify-start sm:justify-center lg:justify-start w-full">
          <Image 
            src="/images/home/icon2.png" 
            alt="Destinations Icon" 
            width={48} 
            height={48}
            loading='lazy' 
            className="w-10 h-10 sm:w-12 sm:h-12" 
          />
          <div className="flex flex-col items-start">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">4+</h1>
            <h2 className="text-xs sm:text-sm lg:text-base font-plant text-white">Destinations</h2>
          </div>
        </div>
        <div className="flex items-start sm:items-center gap-3 lg:gap-4 justify-start sm:justify-center lg:justify-start w-full">
          <Image 
            src="/images/home/icon3.png" 
            alt="Hotels Icon" 
            width={48} 
            height={48} 
            loading='lazy'
            className="w-10 h-10 sm:w-12 sm:h-12" 
          />
          <div className="flex flex-col items-start">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">33+</h1>
            <h2 className="text-xs sm:text-sm lg:text-base font-plant text-white">Hotel & Resort</h2>
          </div>
        </div>
        <div className="flex items-start sm:items-center gap-3 lg:gap-4 justify-start sm:justify-center lg:justify-start w-full">
          <Image 
            src="/images/home/icon4.png" 
            alt="Tour Package Icon" 
            width={48} 
            height={48} 
            loading='lazy'
            className="w-10 h-10 sm:w-12 sm:h-12" 
          />
          <div className="flex flex-col items-start">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">9+</h1>
            <h2 className="text-xs sm:text-sm lg:text-base font-plant text-white">Tour Package</h2>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}

export default ExploreSection

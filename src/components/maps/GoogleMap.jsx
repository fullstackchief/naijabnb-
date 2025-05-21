import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%'
}

function Map({ center, zoom = 15, markers = [], onClick, className = '' }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (loadError) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-lg">
        Failed to load Google Maps
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className={`${className} bg-neutral-100 animate-pulse flex items-center justify-center`}>
        <div className="text-neutral-500">Loading map...</div>
      </div>
    )
  }

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          gestureHandling: 'cooperative'
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            onClick={() => marker.onClick?.(marker)}
            animation={window.google.maps.Animation.DROP}
          />
        ))}
      </GoogleMap>
    </div>
  )
}

export default React.memo(Map)
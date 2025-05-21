import React from 'react'

function StaticMap({ 
  center, 
  zoom = 15,
  width = 600,
  height = 300,
  className = ''
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=${width}x${height}&markers=color:red%7C${center.lat},${center.lng}&key=${apiKey}`

  return (
    <div className={className}>
      <img 
        src={mapUrl} 
        alt="Location map"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  )
}

export default StaticMap
import React, { useState } from 'react'
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import Map from './GoogleMap'

function LocationPicker({ 
  defaultLocation = { lat: 6.5244, lng: 3.3792 }, // Lagos
  onLocationSelect,
  className = '',
  isLoading = false
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsSearching(true)
    setError('')

    try {
      const geocoder = new window.google.maps.Geocoder()
      const results = await geocoder.geocode({ 
        address: searchQuery + ' Nigeria'
      })

      if (results.results.length > 0) {
        setSearchResults(results.results.slice(0, 5))
      } else {
        setSearchResults([])
        setError('No locations found')
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      setError('Failed to search location')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleLocationSelect = (location) => {
    const { lat, lng } = location.geometry.location
    const newLocation = { 
      lat: lat(), 
      lng: lng(),
      address: location.formatted_address
    }
    setSelectedLocation(newLocation)
    onLocationSelect?.(newLocation)
    setSearchResults([])
  }

  const handleMapClick = (e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }

    // Reverse geocode to get address
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ location: newLocation }, (results, status) => {
      if (status === 'OK' && results[0]) {
        newLocation.address = results[0].formatted_address
        setSelectedLocation(newLocation)
        onLocationSelect?.(newLocation)
      } else {
        setError('Failed to get address for selected location')
      }
    })
  }

  return (
    <div className={className}>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location..."
            className="input pl-10 pr-4 w-full"
            disabled={isLoading}
            aria-label="Location search"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-sm btn-primary"
            disabled={isSearching || isLoading}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
          {error}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg border border-neutral-200 mb-4">
          {searchResults.map((result, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2 border-b last:border-b-0"
              onClick={() => handleLocationSelect(result)}
            >
              <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
              <span className="truncate">{result.formatted_address}</span>
            </button>
          ))}
        </div>
      )}

      <div className="h-[400px] rounded-lg overflow-hidden">
        <Map
          center={selectedLocation}
          markers={[{ position: selectedLocation }]}
          onClick={handleMapClick}
          className="w-full h-full"
        />
      </div>

      {selectedLocation.address && (
        <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium">Selected Location</p>
              <p className="text-sm text-neutral-600">{selectedLocation.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationPicker
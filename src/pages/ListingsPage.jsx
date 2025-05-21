import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaHeart, FaFilter, FaMapMarkerAlt, FaSearch, FaSort, FaBed, FaBath, FaUsers, FaWifi, FaSwimmingPool, FaParking } from 'react-icons/fa'
import { format } from 'date-fns'
import Map from '../components/maps/GoogleMap'

// Sample listing data - in a real app, this would come from an API
const allListings = [
  {
    id: 1,
    title: 'Luxury Villa with Ocean View',
    location: 'Lagos, Nigeria',
    coordinates: { lat: 6.4698, lng: 3.5852 },
    price: 35000,
    rating: 4.95,
    reviewCount: 128,
    image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true,
    category: 'luxury',
    amenities: ['Pool', 'WiFi', 'Kitchen', 'Beach Access'],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8
  },
  {
    id: 2,
    title: 'Modern Apartment in City Center',
    location: 'Abuja, Nigeria',
    coordinates: { lat: 9.0765, lng: 7.3986 },
    price: 22000,
    rating: 4.82,
    reviewCount: 74,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false,
    category: 'city',
    amenities: ['WiFi', 'Gym', 'Parking'],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4
  },
  {
    id: 3,
    title: 'Traditional Home with Garden',
    location: 'Calabar, Nigeria',
    coordinates: { lat: 4.9517, lng: 8.3387 },
    price: 18500,
    rating: 4.91,
    reviewCount: 213,
    image: 'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true,
    category: 'culture',
    amenities: ['Garden', 'WiFi', 'Kitchen'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6
  },
  {
    id: 4,
    title: 'Beachfront Cottage',
    location: 'Port Harcourt, Nigeria',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    price: 28000,
    rating: 4.88,
    reviewCount: 95,
    image: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false,
    category: 'beach',
    amenities: ['Beach Access', 'WiFi', 'Kitchen'],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4
  },
  {
    id: 5,
    title: 'Mountain View Retreat',
    location: 'Jos, Nigeria',
    coordinates: { lat: 9.8965, lng: 8.8583 },
    price: 15000,
    rating: 4.79,
    reviewCount: 63,
    image: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false,
    category: 'eco',
    amenities: ['Mountain View', 'WiFi', 'Hiking Trails'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2
  },
  {
    id: 6,
    title: 'Penthouse with City Skyline View',
    location: 'Lagos, Nigeria',
    coordinates: { lat: 6.4550, lng: 3.3841 },
    price: 42000,
    rating: 4.97,
    reviewCount: 152,
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true,
    category: 'luxury',
    amenities: ['City View', 'Pool', 'Gym', 'WiFi'],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6
  },
  {
    id: 7,
    title: 'Cozy Studio in Lekki',
    location: 'Lagos, Nigeria',
    coordinates: { lat: 6.4698, lng: 3.5852 },
    price: 19500,
    rating: 4.84,
    reviewCount: 47,
    image: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false,
    category: 'city',
    amenities: ['WiFi', 'Kitchen', 'Workspace'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2
  },
  {
    id: 8,
    title: 'Riverside Cabin',
    location: 'Calabar, Nigeria',
    coordinates: { lat: 4.9517, lng: 8.3387 },
    price: 23000,
    rating: 4.89,
    reviewCount: 78,
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true,
    category: 'eco',
    amenities: ['River View', 'WiFi', 'Kitchen'],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4
  },
  {
    id: 9,
    title: 'Historic Colonial House',
    location: 'Enugu, Nigeria',
    coordinates: { lat: 6.4550, lng: 7.5102 },
    price: 31500,
    rating: 4.92,
    reviewCount: 103,
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true,
    category: 'culture',
    amenities: ['Garden', 'WiFi', 'Historic Features'],
    bedrooms: 4,
    bathrooms: 2,
    maxGuests: 8
  },
  {
    id: 10,
    title: 'Beach House with Private Access',
    location: 'Lagos, Nigeria',
    coordinates: { lat: 6.4698, lng: 3.5852 },
    price: 38000,
    rating: 4.96,
    reviewCount: 87,
    image: 'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false,
    category: 'beach',
    amenities: ['Beach Access', 'Pool', 'WiFi'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6
  },
  {
    id: 11,
    title: 'Modern Villa with Pool',
    location: 'Abuja, Nigeria',
    coordinates: { lat: 9.0765, lng: 7.3986 },
    price: 45000,
    rating: 4.98,
    reviewCount: 132,
    image: 'https://images.pexels.com/photos/262405/pexels-photo-262405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true,
    category: 'luxury',
    amenities: ['Pool', 'Gym', 'WiFi', 'Garden'],
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8
  },
  {
    id: 12,
    title: 'Eco-friendly Bamboo House',
    location: 'Uyo, Nigeria',
    coordinates: { lat: 5.0333, lng: 7.9333 },
    price: 17000,
    rating: 4.85,
    reviewCount: 56,
    image: 'https://images.pexels.com/photos/6969867/pexels-photo-6969867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false,
    category: 'eco',
    amenities: ['Sustainable', 'Garden', 'WiFi'],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4
  }
]

function ListingsPage() {
  const [searchParams] = useSearchParams()
  const [filteredListings, setFilteredListings] = useState(allListings)
  const [favorites, setFavorites] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')
  const [showMap, setShowMap] = useState(false)
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    rating: '',
    category: searchParams.get('category') || '',
    amenities: [],
    bedrooms: '',
    bathrooms: '',
    maxGuests: ''
  })

  // Get search params
  const locationParam = searchParams.get('location')
  const checkInParam = searchParams.get('checkIn') 
  const checkOutParam = searchParams.get('checkOut')
  const guestsParam = searchParams.get('guests')
  const categoryParam = searchParams.get('category')

  // Format dates for display
  const checkInFormatted = checkInParam ? format(new Date(checkInParam), 'MMM d, yyyy') : null
  const checkOutFormatted = checkOutParam ? format(new Date(checkOutParam), 'MMM d, yyyy') : null

  // Filter and sort listings
  useEffect(() => {
    let results = [...allListings]
    
    // Apply filters
    if (categoryParam || filters.category) {
      const category = categoryParam || filters.category
      results = results.filter(listing => listing.category === category)
    }
    
    if (locationParam) {
      results = results.filter(listing => 
        listing.location.toLowerCase().includes(locationParam.toLowerCase())
      )
    }
    
    if (filters.priceMin) {
      results = results.filter(listing => listing.price >= Number(filters.priceMin))
    }
    
    if (filters.priceMax) {
      results = results.filter(listing => listing.price <= Number(filters.priceMax))
    }
    
    if (filters.rating) {
      results = results.filter(listing => listing.rating >= Number(filters.rating))
    }

    if (filters.bedrooms) {
      results = results.filter(listing => listing.bedrooms >= Number(filters.bedrooms))
    }

    if (filters.bathrooms) {
      results = results.filter(listing => listing.bathrooms >= Number(filters.bathrooms))
    }

    if (filters.maxGuests) {
      results = results.filter(listing => listing.maxGuests >= Number(filters.maxGuests))
    }

    if (filters.amenities.length > 0) {
      results = results.filter(listing => 
        filters.amenities.every(amenity => listing.amenities.includes(amenity))
      )
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        results.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      default:
        // 'recommended' - no specific sorting
        break
    }
    
    setFilteredListings(results)
  }, [locationParam, categoryParam, filters, sortBy])

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      const amenities = checked
        ? [...filters.amenities, value]
        : filters.amenities.filter(amenity => amenity !== value)
      
      setFilters({
        ...filters,
        amenities
      })
    } else {
      setFilters({
        ...filters,
        [name]: value
      })
    }
  }

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      rating: '',
      category: '',
      amenities: [],
      bedrooms: '',
      bathrooms: '',
      maxGuests: ''
    })
    setSortBy('recommended')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-neutral-50"
    >
      {/* Search Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20 pt-16">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by location..."
                className="input pl-10 w-full rounded-xl"
              />
            </div>
            
            <button
              onClick={() => setShowMap(!showMap)}
              className="btn btn-outline rounded-xl"
            >
              {showMap ? 'Show List' : 'Show Map'}
            </button>
          </div>

          {/* Active Filters */}
          {(locationParam || checkInParam || checkOutParam || guestsParam || filters.amenities.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {locationParam && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  {locationParam}
                </div>
              )}
              
              {(checkInParam && checkOutParam) && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                  {checkInFormatted} — {checkOutFormatted}
                </div>
              )}
              
              {guestsParam && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <FaUsers className="mr-1" />
                  {guestsParam} Guest{guestsParam > 1 ? 's' : ''}
                </div>
              )}

              {filters.amenities.map(amenity => (
                <div key={amenity} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                  {amenity}
                </div>
              ))}

              <button
                onClick={clearFilters}
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear all
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range (₦)</h4>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="input flex-1 rounded-lg"
                  />
                  <span className="text-neutral-400">to</span>
                  <input
                    type="number"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="input flex-1 rounded-lg"
                  />
                </div>
              </div>

              {/* Rooms & Guests */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Rooms & Guests</h4>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center justify-between text-sm mb-1">
                      <span>Bedrooms</span>
                      <span className="text-neutral-500">{filters.bedrooms || 'Any'}</span>
                    </label>
                    <input
                      type="range"
                      name="bedrooms"
                      min="1"
                      max="8"
                      value={filters.bedrooms || 1}
                      onChange={handleFilterChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="flex items-center justify-between text-sm mb-1">
                      <span>Bathrooms</span>
                      <span className="text-neutral-500">{filters.bathrooms || 'Any'}</span>
                    </label>
                    <input
                      type="range"
                      name="bathrooms"
                      min="1"
                      max="6"
                      value={filters.bathrooms || 1}
                      onChange={handleFilterChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="flex items-center justify-between text-sm mb-1">
                      <span>Guests</span>
                      <span className="text-neutral-500">{filters.maxGuests || 'Any'}</span>
                    </label>
                    <input
                      type="range"
                      name="maxGuests"
                      min="1"
                      max="16"
                      value={filters.maxGuests || 1}
                      onChange={handleFilterChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="input w-full rounded-lg"
                >
                  <option value="">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-medium mb-3">Amenities</h4>
                <div className="space-y-2">
                  {[
                    { name: 'WiFi', icon: FaWifi },
                    { name: 'Pool', icon: FaSwimmingPool },
                    { name: 'Parking', icon: FaParking }
                  ].map(amenity => (
                    <label key={amenity.name} className="flex items-center">
                      <input
                        type="checkbox"
                        name="amenities"
                        value={amenity.name}
                        checked={filters.amenities.includes(amenity.name)}
                        onChange={handleFilterChange}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 flex items-center">
                        <amenity.icon className="mr-2" />
                        {amenity.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-neutral-600">
                <span className="font-semibold text-neutral-900">{filteredListings.length}</span> accommodations found
              </p>
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input border-none focus:ring-1 rounded-lg"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden btn btn-outline rounded-lg flex items-center"
                >
                  <FaFilter className="mr-2" />
                  Filters
                  {(filters.priceMin || filters.priceMax || filters.rating || filters.category || filters.amenities.length > 0) && (
                    <span className="ml-2 bg-primary-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                      {Object.values(filters).filter(value => 
                        Array.isArray(value) ? value.length > 0 : Boolean(value)
                      ).length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {showMap ? (
              <div className="h-[calc(100vh-12rem)] rounded-xl overflow-hidden">
                <Map
                  center={{ lat: 6.5244, lng: 3.3792 }} // Lagos
                  zoom={12}
                  markers={filteredListings.map(listing => ({
                    position: listing.coordinates,
                    title: listing.title
                  }))}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing, index) => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    isFavorite={favorites.includes(listing.id)}
                    onToggleFavorite={() => toggleFavorite(listing.id)}
                    index={index}
                  />
                ))}
              </div>
            )}

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-neutral-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">No listings found</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-neutral-500">
                  ✕
                </button>
              </div>

              {/* Filter content - same as sidebar */}
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range (₦)</h4>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="input flex-1 rounded-lg"
                  />
                  <span className="text-neutral-400">to</span>
                  <input
                    type="number"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="input flex-1 rounded-lg"
                  />
                </div>
              </div>

              {/* Rooms & Guests */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Rooms & Guests</h4>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center justify-between text-sm mb-1">
                      <span>Bedrooms</span>
                      <span className="text-neutral-500">{filters.bedrooms || 'Any'}</span>
                    </label>
                    <input
                      type="range"
                      name="bedrooms"
                      min="1"
                      max="8"
                      value={filters.bedrooms || 1}
                      onChange={handleFilterChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="flex items-center justify-between text-sm mb-1">
                      <span>Bathrooms</span>
                      <span className="text-neutral-500">{filters.bathrooms || 'Any'}</span>
                    </label>
                    <input
                      type="range"
                      name="bathrooms"
                      min="1"
                      max="6"
                      value={filters.bathrooms || 1}
                      onChange={handleFilterChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="flex items-center justify-between text-sm mb-1">
                      <span>Guests</span>
                      <span className="text-neutral-500">{filters.maxGuests || 'Any'}</span>
                    </label>
                    <input
                      type="range"
                      name="maxGuests"
                      min="1"
                      max="16"
                      value={filters.maxGuests || 1}
                      onChange={handleFilterChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="input w-full rounded-lg"
                >
                  <option value="">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-medium mb-3">Amenities</h4>
                <div className="space-y-2">
                  {[
                    { name: 'WiFi', icon: FaWifi },
                    { name: 'Pool', icon: FaSwimmingPool },
                    { name: 'Parking', icon: FaParking }
                  ].map(amenity => (
                    <label key={amenity.name} className="flex items-center">
                      <input
                        type="checkbox"
                        name="amenities"
                        value={amenity.name}
                        checked={filters.amenities.includes(amenity.name)}
                        onChange={handleFilterChange}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 flex items-center">
                        <amenity.icon className="mr-2" />
                        {amenity.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function ListingCard({ listing, isFavorite, onToggleFavorite, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="relative rounded-xl overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button 
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isFavorite ? 'bg-white text-error' : 'bg-white/70 text-neutral-500 hover:bg-white hover:text-neutral-700'
          } transition-colors`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaHeart className={isFavorite ? 'fill-current' : 'stroke-current'} />
        </button>
        {listing.isSuperhost && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium">
            Superhost
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-truncate max-w-[80%]">
            {listing.title}
          </h3>
          <div className="flex items-center text-sm">
            <FaStar className="text-accent-500 mr-1" />
            <span>{listing.rating}</span>
          </div>
        </div>
        
        <p className="text-neutral-600 mb-3 text-truncate">{listing.location}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full flex items-center">
            <FaBed className="mr-1" />
            {listing.bedrooms} {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </div>
          <div className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full flex items-center">
            <FaBath className="mr-1" />
            {listing.bathrooms} {listing.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
          </div>
          <div className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full flex items-center">
            <FaUsers className="mr-1" />
            Up to {listing.maxGuests} guests
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-truncate">
            <span className="font-semibold text-lg">₦{listing.price.toLocaleString()}</span>
            <span className="text-neutral-600"> / night</span>
          </div>
          <span className="text-sm text-neutral-500">{listing.reviewCount} reviews</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ListingsPage
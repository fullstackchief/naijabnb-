import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaStar, FaHeart, FaShare, FaMapMarkerAlt, FaWifi, FaTv, FaSnowflake, FaSwimmingPool, FaUtensils, FaParking, FaLock, FaShower, FaUser, FaCalendarAlt } from 'react-icons/fa'
import PaymentForm from '../components/payments/PaymentForm'
import RefundPolicySelector from '../components/payments/RefundPolicySelector'
import PaymentReceipt from '../components/payments/PaymentReceipt'

// Sample refund policies
const refundPolicies = [
  {
    id: 1,
    name: 'Flexible',
    description: 'Full refund if cancelled 24 hours before check-in',
    cancellation_deadline_hours: 24,
    refund_percentage: 100
  },
  {
    id: 2,
    name: 'Moderate',
    description: 'Full refund if cancelled 5 days before check-in',
    cancellation_deadline_hours: 120,
    refund_percentage: 100
  },
  {
    id: 3,
    name: 'Strict',
    description: 'Full refund if cancelled 7 days before check-in, 50% refund afterwards',
    cancellation_deadline_hours: 168,
    refund_percentage: 50
  }
]

// Sample listing data - in a real app, this would come from an API
const allListings = [
  {
    id: 1,
    title: 'Luxury Villa with Ocean View',
    description: 'Experience the beauty of Lagos from this exquisite villa with panoramic ocean views. This spacious property features modern amenities, a private pool, and direct beach access. Perfect for family vacations or special gatherings.',
    location: 'Lagos, Nigeria',
    coordinates: { lat: 6.4698, lng: 3.5852 },
    price: 35000,
    rating: 4.95,
    reviewCount: 128,
    images: [
      'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    isSuperhost: true,
    category: 'luxury',
    amenities: ['Wifi', 'TV', 'Air conditioning', 'Swimming pool', 'Kitchen', 'Free parking', 'Security system', 'Hot water'],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    host: {
      name: 'Emmanuel',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isSuperhost: true,
      responseRate: 98,
      responseTime: 'within an hour',
      joinedDate: 'January 2020'
    },
    reviews: [
      {
        id: 1,
        user: 'Sarah',
        date: '2 weeks ago',
        content: 'This villa exceeded all our expectations! The views were breathtaking and the amenities were top-notch. Emmanuel was a fantastic host who went above and beyond to make our stay comfortable. Will definitely be back!',
        rating: 5,
        userImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: 2,
        user: 'Michael',
        date: '1 month ago',
        content: 'Great location, beautiful villa, attentive host. The villa is just as gorgeous as the pictures show. Pool was perfect and the beach access was a nice bonus. Highly recommend!',
        rating: 5,
        userImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: 3,
        user: 'Chioma',
        date: '2 months ago',
        content: 'Spent a wonderful week at this property. The house is beautifully designed and the ocean view is spectacular. The only minor issue was the WiFi, which was occasionally slow, but Emmanuel was quick to address it.',
        rating: 4,
        userImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  }
]

function ListingDetailPage() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      const foundListing = allListings.find(item => item.id === Number(id))
      setListing(foundListing)
      setIsLoading(false)
    }, 500)
  }, [id])

  useEffect(() => {
    if (checkIn && checkOut && listing) {
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      const subtotal = listing.price * nights
      const serviceFee = subtotal * 0.1
      setTotalPrice(subtotal + serviceFee)
    } else {
      setTotalPrice(0)
    }
  }, [checkIn, checkOut, listing])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const toggleGallery = () => {
    setIsGalleryOpen(!isGalleryOpen)
  }

  const handleBooking = () => {
    if (!checkIn || !checkOut || !guests) {
      alert('Please select dates and number of guests')
      return
    }
    setShowPaymentForm(true)
  }

  const handlePaymentComplete = () => {
    setReceipt({
      receipt_number: 'RCP' + Date.now(),
      subtotal: totalPrice,
      fees: Math.round(totalPrice * 0.1),
      taxes: Math.round(totalPrice * 0.05),
      total: Math.round(totalPrice * 1.15),
      issued_at: new Date().toISOString()
    })
    setPaymentComplete(true)
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  }

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/2 mx-auto mb-6"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/3 mx-auto mb-12"></div>
          <div className="h-96 bg-neutral-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-6 bg-neutral-200 rounded mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded mb-6"></div>
            </div>
            <div className="h-64 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Listing not found</h2>
        <p className="mb-8">The listing you're looking for doesn't exist or has been removed.</p>
        <Link to="/listings" className="btn btn-primary">
          Browse Other Listings
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pb-16"
    >
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button 
            onClick={toggleGallery}
            className="absolute top-4 right-4 text-white text-xl"
            aria-label="Close gallery"
          >
            ✕
          </button>
          
          <div className="w-full max-w-4xl">
            <Slider {...sliderSettings} initialSlide={selectedImageIndex}>
              {listing.images.map((image, index) => (
                <div key={index} className="px-2">
                  <img 
                    src={image} 
                    alt={`${listing.title} - Image ${index + 1}`}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
      
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold mb-2">{listing.title}</h1>
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <FaStar className="text-accent-500 mr-1" />
                <span className="font-medium">{listing.rating}</span>
                <span className="mx-2">·</span>
                <span className="text-neutral-600">{listing.reviewCount} reviews</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-primary-500 mr-2" />
                <span>{listing.location}</span>
              </div>
              {listing.host.isSuperhost && (
                <div className="bg-neutral-100 px-3 py-1 rounded-full text-sm">
                  Superhost
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-2 sm:mt-0">
              <button 
                onClick={toggleFavorite}
                className="flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-300 hover:bg-neutral-50"
              >
                <FaHeart className={isFavorite ? 'text-error' : 'text-neutral-400'} />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-300 hover:bg-neutral-50">
                <FaShare className="text-neutral-600" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 overflow-hidden rounded-xl">
          <div className="md:col-span-2 row-span-2 relative">
            <img 
              src={listing.images[0]} 
              alt={listing.title}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => {
                setSelectedImageIndex(0)
                toggleGallery()
              }}
            />
          </div>
          
          {listing.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image} 
                alt={`${listing.title} - Image ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(index + 1)
                  toggleGallery()
                }}
              />
              
              {index === 3 && (
                <button 
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-neutral-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={toggleGallery}
                >
                  View all photos
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap justify-between items-center pb-6 mb-6 border-b border-neutral-200">
              <div>
                <h2 className="text-2xl font-display font-semibold mb-1">
                  Hosted by {listing.host.name}
                </h2>
                <p className="text-neutral-600">
                  {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''} • {listing.bathrooms} bathroom{listing.bathrooms !== 1 ? 's' : ''} • Up to {listing.maxGuests} guest{listing.maxGuests !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center mt-4 lg:mt-0">
                <img 
                  src={listing.host.image} 
                  alt={listing.host.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                {listing.host.isSuperhost && (
                  <div className="text-sm">
                    <p className="font-medium">Superhost</p>
                    <p className="text-neutral-600">Responds in {listing.host.responseTime}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-display font-semibold mb-4">About this place</h3>
              <p className="text-neutral-600 mb-4">{listing.description}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-display font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    {amenity === 'Wifi' && <FaWifi className="text-neutral-600 mr-3" />}
                    {amenity === 'TV' && <FaTv className="text-neutral-600 mr-3" />}
                    {amenity === 'Air conditioning' && <FaSnowflake className="text-neutral-600 mr-3" />}
                    {amenity === 'Swimming pool' && <FaSwimmingPool className="text-neutral-600 mr-3" />}
                    {amenity === 'Kitchen' && <FaUtensils className="text-neutral-600 mr-3" />}
                    {amenity === 'Free parking' && <FaParking className="text-neutral-600 mr-3" />}
                    {amenity === 'Security system' && <FaLock className="text-neutral-600 mr-3" />}
                    {amenity === 'Hot water' && <FaShower className="text-neutral-600 mr-3" />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <FaStar className="text-accent-500 mr-2" size={24} />
                <span className="text-xl font-semibold mr-2">{listing.rating}</span>
                <span className="text-xl">·</span>
                <span className="text-xl ml-2">{listing.reviewCount} reviews</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {listing.reviews.map(review => (
                  <div key={review.id} className="mb-6">
                    <div className="flex items-center mb-3">
                      <img 
                        src={review.userImage} 
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-semibold">{review.user}</h4>
                        <p className="text-sm text-neutral-500">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-neutral-600">{review.content}</p>
                  </div>
                ))}
              </div>
              
              <button className="btn btn-outline mt-4">
                View all {listing.reviewCount} reviews
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {!showPaymentForm && !paymentComplete && (
                <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-2xl font-semibold">₦{listing.price.toLocaleString()}</span>
                        <span className="text-neutral-600"> / night</span>
                      </div>
                      <div className="flex items-center">
                        <FaStar className="text-accent-500 mr-1" />
                        <span className="font-medium">{listing.rating}</span>
                      </div>
                    </div>
                    
                    <div className="border border-neutral-300 rounded-lg overflow-hidden mb-4">
                      <div className="grid grid-cols-2 border-b border-neutral-300">
                        <div className="border-r border-neutral-300 p-3">
                          <label className="block text-xs font-medium mb-1 flex items-center">
                            <FaCalendarAlt className="mr-2 text-primary-500" />
                            CHECK-IN
                          </label>
                          <DatePicker
                            selected={checkIn}
                            onChange={(date) => setCheckIn(date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={new Date()}
                            placeholderText="Add date"
                            className="w-full border-none p-0 text-sm focus:ring-0"
                          />
                        </div>
                        <div className="p-3">
                          <label className="block text-xs font-medium mb-1 flex items-center">
                            <FaCalendarAlt className="mr-2 text-primary-500" />
                            CHECKOUT
                          </label>
                          <DatePicker
                            selected={checkOut}
                            onChange={(date) => setCheckOut(date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn || new Date()}
                            placeholderText="Add date"
                            className="w-full border-none p-0 text-sm focus:ring-0"
                          />
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <label className="block text-xs font-medium mb-1 flex items-center">
                          <FaUser className="mr-2 text-primary-500" />
                          GUESTS
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full border-none p-0 text-sm focus:ring-0"
                        >
                          {[...Array(listing.maxGuests)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} guest{i !== 0 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleBooking}
                      className="btn btn-primary w-full mb-4"
                      disabled={!checkIn || !checkOut || !guests}
                    >
                      Reserve
                    </button>
                    
                    <p className="text-center text-sm text-neutral-500 mb-4">
                      You won't be charged yet
                    </p>
                    
                    {totalPrice > 0 && (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="underline">
                            ₦{listing.price.toLocaleString()} x {Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))} nights
                          </span>
                          <span>
                            ₦{(listing.price * Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="underline">Service fee</span>
                          <span>
                            ₦{(listing.price * Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) * 0.1).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-neutral-200 font-semibold">
                          <span>Total</span>
                          <span>₦{totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {showPaymentForm && !paymentComplete && (
                <>
                  <RefundPolicySelector
                    policies={refundPolicies}
                    selectedPolicy={selectedPolicy}
                    onSelect={setSelectedPolicy}
                  />
                  
                  {selectedPolicy && (
                    <div className="mt-6">
                      <PaymentForm
                        booking={{
                          totalPrice,
                          checkIn,
                          checkOut,
                          guests
                        }}
                        onPaymentComplete={handlePaymentComplete}
                      />
                    </div>
                  )}
                </>
              )}

              {paymentComplete && receipt && (
                <PaymentReceipt
                  receipt={receipt}
                  booking={{
                    checkIn,
                    checkOut,
                    guests
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ListingDetailPage
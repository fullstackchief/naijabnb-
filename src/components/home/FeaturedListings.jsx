import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaHeart } from 'react-icons/fa'

// Sample data - in a real app, this would come from an API
const featuredListings = [
  {
    id: 1,
    title: 'Luxury Villa with Ocean View',
    location: 'Lagos, Nigeria',
    price: 35000,
    rating: 4.95,
    reviewCount: 128,
    image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true
  },
  {
    id: 2,
    title: 'Modern Apartment in City Center',
    location: 'Abuja, Nigeria',
    price: 22000,
    rating: 4.82,
    reviewCount: 74,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false
  },
  {
    id: 3,
    title: 'Traditional Home with Garden',
    location: 'Calabar, Nigeria',
    price: 18500,
    rating: 4.91,
    reviewCount: 213,
    image: 'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true
  },
  {
    id: 4,
    title: 'Beachfront Cottage',
    location: 'Port Harcourt, Nigeria',
    price: 28000,
    rating: 4.88,
    reviewCount: 95,
    image: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false
  },
  {
    id: 5,
    title: 'Mountain View Retreat',
    location: 'Jos, Nigeria',
    price: 15000,
    rating: 4.79,
    reviewCount: 63,
    image: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: false
  },
  {
    id: 6,
    title: 'Penthouse with City Skyline View',
    location: 'Lagos, Nigeria',
    price: 42000,
    rating: 4.97,
    reviewCount: 152,
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isSuperhost: true
  }
]

function FeaturedListings() {
  return (
    <section className="section bg-neutral-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured Stays
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Discover our top-rated properties with exceptional amenities and locations across Nigeria
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing, index) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              index={index} 
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/listings" 
            className="btn btn-lg btn-outline hover:text-primary-500 hover:border-primary-500"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  )
}

function ListingCard({ listing, index }) {
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card"
    >
      <div className="relative">
        <Link to={`/listings/${listing.id}`}>
          <img 
            src={listing.image} 
            alt={listing.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </Link>
        <button 
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isFavorite ? 'bg-white text-error' : 'bg-white/70 text-neutral-500 hover:bg-white hover:text-neutral-700'
          } transition-colors`}
          onClick={() => setIsFavorite(!isFavorite)}
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
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-truncate max-w-[80%]">
            <Link to={`/listings/${listing.id}`} className="hover:text-primary-500 transition-colors">
              {listing.title}
            </Link>
          </h3>
          <div className="flex items-center text-sm">
            <FaStar className="text-accent-500 mr-1" />
            <span>{listing.rating}</span>
          </div>
        </div>
        
        <p className="text-neutral-600 mb-3 text-truncate">{listing.location}</p>
        
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

export default FeaturedListings
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 'beach',
    name: 'Beach Getaways',
    description: 'Relax by the shore',
    image: 'bg-beach-pattern',
    count: 243
  },
  {
    id: 'city',
    name: 'City Apartments',
    description: 'Experience urban life',
    image: 'bg-city-pattern',
    count: 358
  },
  {
    id: 'luxury',
    name: 'Luxury Stays',
    description: 'Indulge in premium comfort',
    image: 'bg-luxury-pattern',
    count: 124
  },
  {
    id: 'culture',
    name: 'Cultural Experiences',
    description: 'Immerse in local traditions',
    image: 'bg-culture-pattern',
    count: 198
  },
  {
    id: 'eco',
    name: 'Eco Retreats',
    description: 'Stay in harmony with nature',
    image: 'bg-eco-pattern',
    count: 85
  }
]

function Categories() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Explore Nigeria
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Discover accommodations tailored to your preferred travel style across Nigeria's most beautiful destinations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/listings?category=${category.id}`}>
        <div className="relative overflow-hidden rounded-xl h-80 group">
          <div className={`absolute inset-0 ${category.image} bg-cover bg-center transition-transform duration-500 group-hover:scale-110`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-display font-bold mb-1">{category.name}</h3>
            <p className="text-white/90 mb-2">{category.description}</p>
            <p className="text-sm">{category.count} properties</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default Categories
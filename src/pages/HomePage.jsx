import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import FeaturedListings from '../components/home/FeaturedListings'
import HowItWorks from '../components/home/HowItWorks'
import CallToAction from '../components/home/CallToAction'

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Categories />
      <FeaturedListings />
      <HowItWorks />
      <CallToAction />
    </motion.div>
  )
}

export default HomePage
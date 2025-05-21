import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SearchForm from './SearchForm'

function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px] bg-hero-pattern bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      
      <div ref={ref} className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Discover Your Perfect Stay in Nigeria
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Experience authentic Nigerian hospitality in unique accommodations across the country
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl"
        >
          <SearchForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <div className="flex gap-4 text-white/90 text-sm">
            <div className="flex flex-col items-center">
              <span className="font-display font-bold text-2xl text-primary-500">500+</span>
              <span>Unique Places</span>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="font-display font-bold text-2xl text-primary-500">50+</span>
              <span>Cities</span>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="font-display font-bold text-2xl text-primary-500">10k+</span>
              <span>Happy Guests</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
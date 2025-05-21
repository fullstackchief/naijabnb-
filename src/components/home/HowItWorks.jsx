import React from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaHome, FaCalendarCheck, FaSuitcase } from 'react-icons/fa'

const steps = [
  {
    id: 1,
    title: 'Find the Perfect Place',
    description: 'Use our search filters to find accommodations that match your preferences and budget.',
    icon: FaSearch,
    color: 'bg-primary-500'
  },
  {
    id: 2,
    title: 'Book with Confidence',
    description: 'Secure your reservation with our easy booking system. Instant confirmation, no hidden fees.',
    icon: FaCalendarCheck,
    color: 'bg-accent-500'
  },
  {
    id: 3,
    title: 'Enjoy Your Stay',
    description: 'Experience authentic Nigerian hospitality and create unforgettable memories.',
    icon: FaHome,
    color: 'bg-success'
  },
  {
    id: 4,
    title: 'Share Your Experience',
    description: 'Leave a review to help other travelers and contribute to our community.',
    icon: FaSuitcase,
    color: 'bg-primary-600'
  }
]

function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            How NijaBnB Works
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Booking your perfect stay in Nigeria is easy with our simple 4-step process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard 
              key={step.id} 
              step={step} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="mb-6 inline-flex">
        <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white`}>
          <step.icon size={28} />
        </div>
      </div>
      <h3 className="text-xl font-display font-semibold mb-3">{step.title}</h3>
      <p className="text-neutral-600">{step.description}</p>
    </motion.div>
  )
}

export default HowItWorks
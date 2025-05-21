import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function CallToAction() {
  return (
    <section className="py-20 bg-primary-500">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 mb-10 lg:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Become a Host and Earn Extra Income
            </h2>
            <p className="text-primary-50 text-lg mb-8 max-w-lg">
              Share your space, showcase Nigeria's rich cultural heritage, and meet travelers from around the world while earning extra income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/host" 
                className="btn btn-lg bg-white text-primary-500 hover:bg-primary-50"
              >
                Start Hosting
              </Link>
              <Link 
                to="/host/learn-more" 
                className="btn btn-lg border-2 border-white text-white hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-2/5"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-display font-semibold mb-6">Why Host with NijaBnB?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Earn Extra Income</h4>
                    <p className="text-neutral-600">Turn your extra space into a steady source of income</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Host Protection</h4>
                    <p className="text-neutral-600">Property protection and insurance for peace of mind</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Flexible Schedule</h4>
                    <p className="text-neutral-600">You decide when and how often to host</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Local Support</h4>
                    <p className="text-neutral-600">Our team is here to help you succeed every step of the way</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
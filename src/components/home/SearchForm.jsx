import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'

function SearchForm() {
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState(1)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create query parameters
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (checkIn) params.append('checkIn', checkIn.toISOString())
    if (checkOut) params.append('checkOut', checkOut.toISOString())
    if (guests) params.append('guests', guests)
    
    // Navigate to listings page with query params
    navigate(`/listings?${params.toString()}`)
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Location */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="p-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary-500" />
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you going?"
              className="w-full border-none p-0 focus:ring-0 text-neutral-800 placeholder-neutral-400"
            />
          </div>
        </div>
        
        {/* Check-in */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="p-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1 flex items-center">
              <FaCalendarAlt className="mr-2 text-primary-500" />
              Check-in
            </label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Add date"
              className="w-full border-none p-0 focus:ring-0 text-neutral-800 placeholder-neutral-400"
            />
          </div>
        </div>
        
        {/* Check-out */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="p-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1 flex items-center">
              <FaCalendarAlt className="mr-2 text-primary-500" />
              Check-out
            </label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Add date"
              className="w-full border-none p-0 focus:ring-0 text-neutral-800 placeholder-neutral-400"
            />
          </div>
        </div>
        
        {/* Guests */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="p-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1 flex items-center">
              <FaUsers className="mr-2 text-primary-500" />
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border-none p-0 focus:ring-0 text-neutral-800"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Search Button */}
        <div className="p-4 flex items-end">
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
            aria-label="Search"
          >
            <FaSearch className="mr-2" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </motion.form>
  )
}

export default SearchForm
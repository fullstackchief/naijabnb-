import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h4 className="text-xl font-display font-semibold text-white mb-4">NijaBnB</h4>
            <p className="text-neutral-400 mb-4">
              Find your dream stay in Nigeria. We connect travelers with unique accommodations across the country.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Discover */}
          <div>
            <h4 className="text-xl font-display font-semibold text-white mb-4">Discover</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/listings?category=beach" className="text-neutral-400 hover:text-white transition-colors">
                  Beach Homes
                </Link>
              </li>
              <li>
                <Link to="/listings?category=city" className="text-neutral-400 hover:text-white transition-colors">
                  City Apartments
                </Link>
              </li>
              <li>
                <Link to="/listings?category=luxury" className="text-neutral-400 hover:text-white transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link to="/listings?category=cultural" className="text-neutral-400 hover:text-white transition-colors">
                  Cultural Stays
                </Link>
              </li>
              <li>
                <Link to="/listings?category=eco" className="text-neutral-400 hover:text-white transition-colors">
                  Eco Retreats
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Hosting */}
          <div>
            <h4 className="text-xl font-display font-semibold text-white mb-4">Hosting</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/host" className="text-neutral-400 hover:text-white transition-colors">
                  Become a Host
                </Link>
              </li>
              <li>
                <Link to="/host/responsibilities" className="text-neutral-400 hover:text-white transition-colors">
                  Hosting Responsibilities
                </Link>
              </li>
              <li>
                <Link to="/host/resources" className="text-neutral-400 hover:text-white transition-colors">
                  Host Resources
                </Link>
              </li>
              <li>
                <Link to="/host/community" className="text-neutral-400 hover:text-white transition-colors">
                  Host Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Support */}
          <div>
            <h4 className="text-xl font-display font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-neutral-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-neutral-400 hover:text-white transition-colors">
                  Safety Information
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-neutral-400 hover:text-white transition-colors">
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} NijaBnB. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-neutral-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-neutral-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/sitemap" className="text-neutral-500 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
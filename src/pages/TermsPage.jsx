import React from 'react'
import { motion } from 'framer-motion'

function TermsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-neutral-50 pt-24 pb-16"
    >
      <div className="container max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">1. Introduction</h2>
            <p className="text-neutral-600 mb-4">
              Welcome to NijaBnB. By accessing or using our website, mobile application, and services, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
            <p className="text-neutral-600">
              These terms constitute a legally binding agreement between you and NijaBnB regarding your use of the Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">2. Definitions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">"Platform"</h3>
                <p className="text-neutral-600">
                  Refers to the NijaBnB website, mobile applications, and related services.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">"User"</h3>
                <p className="text-neutral-600">
                  Any person who accesses or uses the Platform, including Guests and Hosts.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">"Listing"</h3>
                <p className="text-neutral-600">
                  Any accommodation advertised for rental on the Platform.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">3. Account Registration</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">
                To access certain features of the Platform, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">4. User Responsibilities</h2>
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">As a Guest, you agree to:</h3>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Pay all applicable fees and charges</li>
                <li>Use the accommodation responsibly and respectfully</li>
                <li>Follow house rules and check-in/check-out procedures</li>
                <li>Report any issues promptly</li>
              </ul>

              <h3 className="font-semibold mb-2">As a Host, you agree to:</h3>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Provide accurate listing information</li>
                <li>Maintain clean and safe accommodations</li>
                <li>Respond to booking requests and inquiries promptly</li>
                <li>Honor confirmed bookings</li>
                <li>Comply with local laws and regulations</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">5. Booking and Cancellation</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">
                Bookings are subject to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Host approval and availability</li>
                <li>Payment of all applicable fees</li>
                <li>Agreement to the listing's specific terms</li>
                <li>The Platform's cancellation policies</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">6. Fees and Payments</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">
                All payments are processed through our secure payment system. Fees include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Accommodation fees</li>
                <li>Service fees</li>
                <li>Applicable taxes</li>
                <li>Any additional charges specified in the listing</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">7. Prohibited Activities</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">
                Users are prohibited from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Violating any applicable laws or regulations</li>
                <li>Posting false or misleading information</li>
                <li>Harassing or discriminating against other users</li>
                <li>Interfering with the Platform's operation</li>
                <li>Creating multiple accounts</li>
                <li>Circumventing the Platform's payment system</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">8. Intellectual Property</h2>
            <p className="text-neutral-600">
              All content on the Platform, including but not limited to text, graphics, logos, and software, is the property of NijaBnB or its licensors and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-neutral-600">
              NijaBnB is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform or any accommodations booked through it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">10. Changes to Terms</h2>
            <p className="text-neutral-600">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the Platform. Your continued use of the Platform constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">11. Contact Information</h2>
            <p className="text-neutral-600">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4">
              <p className="text-neutral-600">Email: support@nijabnb.com</p>
              <p className="text-neutral-600">Phone: +234 800 123 4567</p>
              <p className="text-neutral-600">Address: Victoria Island, Lagos, Nigeria</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
}

export default TermsPage
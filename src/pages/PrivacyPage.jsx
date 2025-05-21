import React from 'react'
import { motion } from 'framer-motion'

function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-neutral-50 pt-24 pb-16"
    >
      <div className="container max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">1. Introduction</h2>
            <p className="text-neutral-600 mb-4">
              At NijaBnB, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services.
            </p>
            <p className="text-neutral-600">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">2. Information We Collect</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                  <li>Name and contact information</li>
                  <li>Date of birth</li>
                  <li>Payment information</li>
                  <li>Government-issued identification</li>
                  <li>Profile photos</li>
                  <li>Communication between users</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                  <li>IP addresses</li>
                  <li>Browser and device information</li>
                  <li>Operating system</li>
                  <li>Pages viewed and features used</li>
                  <li>Time spent on the platform</li>
                  <li>Referral sources</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Location Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                  <li>GPS location (with permission)</li>
                  <li>IP-based location</li>
                  <li>Address information provided</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">3. How We Use Your Information</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Facilitate bookings and payments</li>
                <li>Verify user identity</li>
                <li>Provide customer support</li>
                <li>Send service-related communications</li>
                <li>Improve our services</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">4. Information Sharing</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Other users (as necessary for bookings)</li>
                <li>Service providers and business partners</li>
                <li>Law enforcement (when required)</li>
                <li>Professional advisors</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">5. Data Security</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">
                We implement appropriate technical and organizational security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls</li>
                <li>Secure data storage</li>
                <li>Employee training</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">6. Your Rights</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">7. Cookies and Tracking</h2>
            <div className="space-y-4">
              <p className="text-neutral-600">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Remember your preferences</li>
                <li>Analyze usage patterns</li>
                <li>Provide personalized content</li>
                <li>Improve user experience</li>
                <li>Secure your account</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-neutral-600">
              Our Platform is not intended for children under 18. We do not knowingly collect or maintain information from persons under 18 years of age.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">9. Changes to Privacy Policy</h2>
            <p className="text-neutral-600">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">10. Contact Us</h2>
            <p className="text-neutral-600 mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="text-neutral-600">
              <p>Email: privacy@nijabnb.com</p>
              <p>Phone: +234 800 123 4567</p>
              <p>Address: Victoria Island, Lagos, Nigeria</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
}

export default PrivacyPage
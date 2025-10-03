'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for individuals and small businesses',
    features: [
      'Up to 3 social media accounts',
      'Basic analytics',
      '5 scheduled posts per month',
      'Email support',
      'Mobile app access'
    ],
    limitations: [
      'Limited automation',
      'Basic reporting'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    description: 'Ideal for growing businesses and agencies',
    features: [
      'Up to 10 social media accounts',
      'Advanced analytics & reporting',
      'Unlimited scheduled posts',
      'Team collaboration (up to 5 members)',
      'Priority support',
      'Advanced automation',
      'Custom branding',
      'API access'
    ],
    limitations: [],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited social media accounts',
      'White-label solution',
      'Advanced team management',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security features',
      '24/7 phone support',
      'Custom reporting'
    ],
    limitations: [],
    popular: false
  }
]

export default function Pricing() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const toggleWaitlist = () => setIsWaitlistOpen(!isWaitlistOpen)

  return (
    <>
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-8 relative ${
                  plan.popular ? 'ring-2 ring-indigo-500 shadow-lg' : 'shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <li key={limitationIndex} className="flex items-start">
                      <X size={20} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={toggleWaitlist}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Join Waitlist
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <button
              onClick={toggleWaitlist}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Contact Sales for Enterprise Pricing →
            </button>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Waitlist</h2>
            <p className="text-gray-600 mb-6">
              Be the first to know when Zenithly launches and get early access to our platform.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your company name"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={toggleWaitlist}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

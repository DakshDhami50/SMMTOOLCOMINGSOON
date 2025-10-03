'use client'

import { useState } from 'react'
import { Check, Sparkles, Crown, Zap } from 'lucide-react'
import FadeContent from './FadeContent'

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
    popular: false,
    icon: Sparkles
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
    popular: true,
    icon: Crown
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations',
    features: [
      'Unlimited social media accounts',
      'White-label solution',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations',
      'Advanced security features',
      'SLA guarantee',
      'Training & onboarding'
    ],
    popular: false,
    icon: Zap
  }
]

export default function Pricing() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const toggleWaitlist = () => setIsWaitlistOpen(!isWaitlistOpen)

  return (
    <>
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeContent delay={200}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Simple Pricing
              </h2>
            </FadeContent>
            <FadeContent delay={400}>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Choose the plan that fits your needs. No hidden fees, no surprises.
              </p>
            </FadeContent>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <FadeContent key={index} delay={200 + (index * 100)}>
                <div className={`relative bg-black border border-white/10 rounded-2xl p-8 ${
                  plan.popular ? 'border-white/20' : ''
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-sm font-semibold px-4 py-2 rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <plan.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period && (
                        <span className="text-gray-400 text-lg ml-1">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-300">
                        <Check className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={toggleWaitlist}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-white text-black hover:bg-gray-100'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {plan.price === 'Free' ? 'Get Started' : 'Join Waitlist'}
                  </button>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <FadeContent className="bg-black border border-white/20 rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Join Our Waitlist</h2>
              <p className="text-gray-300">
                Be the first to know when Zenithly launches.
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={toggleWaitlist}
                  className="flex-1 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </FadeContent>
        </div>
      )}
    </>
  )
}
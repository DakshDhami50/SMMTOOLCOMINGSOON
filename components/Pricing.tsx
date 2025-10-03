'use client'

import { useState } from 'react'
import { Check, X, Sparkles, Crown, Zap } from 'lucide-react'
import FadeContent from './FadeContent'
import TextPressure from './TextPressure'

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
    popular: false,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-500/10',
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
    limitations: [],
    popular: true,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-500/10',
    icon: Crown
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
    popular: false,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    icon: Zap
  }
]

export default function Pricing() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const toggleWaitlist = () => setIsWaitlistOpen(!isWaitlistOpen)

  return (
    <>
      <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <FadeContent delay={200}>
              <div className="mb-8">
                <TextPressure
                  text="Pricing"
                  flex={true}
                  alpha={true}
                  stroke={true}
                  width={true}
                  weight={true}
                  italic={false}
                  textColor="#ffffff"
                  strokeColor="#f59e0b"
                  minFontSize={36}
                  className="h-20"
                />
              </div>
            </FadeContent>

            <FadeContent delay={400}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Simple, Transparent
                <span className="gradient-text block mt-2">Pricing</span>
              </h2>
            </FadeContent>

            <FadeContent delay={600}>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Choose the plan that fits your needs. All plans include our core features with no hidden fees.
              </p>
            </FadeContent>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <FadeContent key={index} delay={200 + (index * 150)}>
                <div
                  className={`glass-dark rounded-2xl p-8 relative border transition-all duration-500 hover:transform hover:scale-105 glow-hover ${
                    plan.popular 
                      ? 'border-indigo-500/50 glow ring-2 ring-indigo-500/30' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium glow">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 glow`}>
                      <plan.icon size={32} className={`${plan.color.includes('gray') ? 'text-gray-400' : plan.color.includes('indigo') ? 'text-indigo-400' : 'text-yellow-400'}`} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                      {plan.period && (
                        <span className="text-gray-400 text-xl">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check size={16} className="text-green-400" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-start">
                        <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <X size={16} className="text-red-400" />
                        </div>
                        <span className="text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={toggleWaitlist}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'btn-modern glow-hover'
                        : 'glass border border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    Join Waitlist
                  </button>
                </div>
              </FadeContent>
            ))}
          </div>

          <FadeContent delay={1000} className="text-center mt-16">
            <div className="glass-dark rounded-2xl p-8 border border-white/10">
              <p className="text-gray-300 mb-6 text-lg">
                All plans include a 14-day free trial. No credit card required.
              </p>
              <button
                onClick={toggleWaitlist}
                className="text-indigo-400 hover:text-indigo-300 font-semibold text-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
              >
                Contact Sales for Enterprise Pricing
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <FadeContent className="glass-dark rounded-2xl max-w-md w-full p-8 border border-white/20 glow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Join Our Waitlist</h2>
              <p className="text-gray-300">
                Be the first to know when Zenithly launches and get early access to our platform.
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={toggleWaitlist}
                  className="flex-1 px-6 py-3 border border-white/20 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 btn-modern glow-hover"
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

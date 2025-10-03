# Zenithly - Social Media Management Platform

This is the "Coming Soon" version of the Zenithly social media management platform.

## What's Changed

This version has been converted from the full application to a coming soon landing page with the following modifications:

* ✅ **Removed Authentication**: All sign-up, sign-in, and authentication flows have been removed
* ✅ **Waitlist Integration**: All "Get Started" and "Sign Up" buttons now open a waitlist modal
* ✅ **Email Collection**: Simple form to collect user emails, names, and company information
* ✅ **Preserved Design**: All original sections (features, pricing preview, etc.) remain intact
* ✅ **Clean Codebase**: Removed unused authentication libraries and API routes

## Features

* **Landing Page**: Beautiful, responsive landing page showcasing Zenithly's features
* **Waitlist Modal**: Elegant modal for collecting user information
* **Features Page**: Detailed overview of platform capabilities
* **Pricing Preview**: Shows upcoming pricing tiers (with waitlist signup)
* **Mobile Responsive**: Fully responsive design for all devices

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

* **Next.js 15.5.4** - React framework
* **TypeScript** - Type safety
* **Tailwind CSS** - Styling
* **Framer Motion** - Animations
* **Lucide React** - Icons

## Deployment

The application is production-ready and can be deployed to any platform that supports Next.js:

* Vercel (recommended)
* Netlify
* AWS
* Digital Ocean
* Any Node.js hosting provider

## Customization

To customize the waitlist form or add actual email collection functionality:

1. Edit the form submission handler in `components/Navbar.tsx`, `components/Hero.tsx`, and `components/Pricing.tsx`
2. Add your email service integration (e.g., Mailchimp, ConvertKit, etc.)
3. Update the success message and behavior

## License

Private - All rights reserved.

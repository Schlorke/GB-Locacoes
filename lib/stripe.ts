import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-10-29.clover', // Stripe API version supported by current package
})

export default stripe

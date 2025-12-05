/** @type {import('next').NextConfig} */
const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'via.placeholder.com',
  },
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
  {
    protocol: 'https',
    hostname: 'picsum.photos',
  },
]

// Allow Supabase storage (e.g., https://<project>.supabase.co/storage/v1/object/public/...)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (supabaseUrl) {
  try {
    const { hostname } = new URL(supabaseUrl)
    remotePatterns.push({
      protocol: 'https',
      hostname,
    })
  } catch {
    // ignore invalid URL, keep defaults
  }
}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns,
  },
  env: {},
}

export default nextConfig

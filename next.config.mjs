/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Success-story photos uploaded through /admin live in Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  experimental: {
    // Admin photo uploads are resized in the browser first; this is headroom.
    serverActions: { bodySizeLimit: "4mb" },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy Python backend API calls through Next.js API routes
  // The frontend calls /api/predict → Next.js rewrites to PYTHON_API_URL/predict
  // This keeps your Python backend URL server-side only (never exposed to browser)
};

export default nextConfig;

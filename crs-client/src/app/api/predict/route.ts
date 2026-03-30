import { NextRequest, NextResponse } from "next/server";

// ─── Next.js API Route: POST /api/predict ─────────────────────────────────────
// This is a server-side proxy to your Python ML backend.
//
// Why proxy through Next.js?
//   • PYTHON_API_URL stays server-side — never exposed to the browser
//   • CORS is handled automatically (browser calls same-origin /api/predict)
//   • You can add auth checks, rate limiting, or logging here
//
// WIRE UP: Add to .env.local:
//   PYTHON_API_URL=http://localhost:8000
// ─────────────────────────────────────────────────────────────────────────────

const PYTHON_API_URL = process.env.PYTHON_API_URL;

export async function POST(request: NextRequest) {
  if (!PYTHON_API_URL) {
    return NextResponse.json(
      { detail: "PYTHON_API_URL is not configured in .env.local" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(`${PYTHON_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({
      detail: `Backend returned status ${response.status}`,
    }));

    return NextResponse.json(data, { status: response.status });

  } catch {
    return NextResponse.json(
      { detail: "Python backend is unreachable. Is it running at PYTHON_API_URL?" },
      { status: 503 }
    );
  }
}

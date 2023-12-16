'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-black px-5 py-3 text-lg text-white">
        <Link href="/login">Login</Link>
      </div>
    </div>
  )
}

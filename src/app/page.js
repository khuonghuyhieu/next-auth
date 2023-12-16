import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/Button'

export default function RootPage() {
  return (
    <div>
      <div className="flex-center mb-10">
        <Image src="/logo_portfolio.png" alt="abc" width={150} height={150} />
      </div>
      <p className="mb-16 text-center text-[23px]">
        Local hang out of the Bayside High Tigers in sunny Los Angeles, CA
      </p>
      <div className="mb-28 text-[23px]">
        <p>The gang thinks you’ll love...</p>
        <div className="flex-center">
          <Image src="/img01.jpg" alt="abc" width={275} height={238} />
        </div>
      </div>
      <Link href="/home">
        <Button className="w-full">Order Online</Button>
      </Link>
    </div>
  )
}

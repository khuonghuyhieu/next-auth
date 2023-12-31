'use client'

import Button from '@/components/ui/Button'
import { Routes } from '@/constants'

export default function Home() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Button className="w-20" href={Routes.AUTH.LOGIN}>
        Login
      </Button>
    </div>
  )
}

'use client'

import NextLink from 'next/link'
import { cn } from '@/utils'

const Link = ({ disabled, children, className, opacity = false, ...props }) => {
  if (disabled) {
    return children
  }

  return (
    <NextLink className={cn({ 'link-item': opacity }, className)} {...props}>
      {children}
    </NextLink>
  )
}

export default Link

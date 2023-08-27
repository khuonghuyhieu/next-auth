'use client'

import { Pressable } from '@react-aria/interactions'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { cn } from '@/utils'

export default function RouteModal({ children, noPadding, closable = true, className }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      role="presentation"
      ref={overlay}
      className={cn('fixed inset-0 z-[9999] bg-main/60 backdrop-blur-sm', className)}
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className={cn(
          !noPadding && 'p-1.5 md:p-2.5',
          'absolute left-1/2 top-1/2 z-[9999] grid w-full max-w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 gap-4 bg-foreground-2 shadow-drop duration-200 md:w-full md:max-w-[560px]',
          className
        )}
      >
        {closable && (
          <div className="flex justify-end">
            <Pressable onPress={onDismiss}>
              <div className="cursor-pointer text-muted ">
                <IoClose size={28} />
              </div>
            </Pressable>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

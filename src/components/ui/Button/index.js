'use client'

import { Slot } from '@radix-ui/react-slot'
import { useButton } from '@react-aria/button'
import { cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import noop from 'lodash/noop'
import { forwardRef, useRef } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { cn, mergeRefs } from '@/utils'
import Link from '../Link'
import s from './Button.module.css'

export const buttonVariants = cva(s.root, {
  variants: {
    fullWidth: { [true]: 'w-full' },
    size: {
      xsmall: 'h-9 py-2',
      small: 'h-10 px-4 py-2.5',
      base: 'h-10 text-sm lg:h-12 lg:text-base',
      medium: 'h-12 px-4 py-3',
      large: 'h-[72px] px-6 py-[23px]',
    },
    variant: {
      primary: s.primary,
      secondary: s.secondary,
      default: s.default,
      danger: s.danger,
    },
  },
  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
})
const Button = forwardRef((props, ref) => {
  const {
    className,
    onPress,
    loading,
    leftIcon,
    onPressStart,
    disabled,
    onPressEnd,
    children,
    variant,
    fullWidth = false,
    size,
    type = 'button',
    asChild = false,
    href,
    target,
  } = props || {}

  const nativeButtonRef = useRef()

  const { buttonProps, isPressed } = useButton(
    {
      isDisabled: disabled || loading,
      onPress,
      onPressStart,
      onPressEnd,
      ...props,
      type,
    },
    nativeButtonRef
  )
  const rootClassnames = cn(buttonVariants({ isPressed, fullWidth, variant, size, className }))

  const renderChild = (
    <>
      {!loading && leftIcon && <div className="mr-2 shrink-0">{leftIcon}</div>}
      {children}
    </>
  )

  if (href)
    return (
      <Button onPress={noop} {...props} href={false} className={cn('relative', className)}>
        <Link
          className={cn('flex-center rounded-button absolute inset-0', props.linkCln)}
          href={href}
          target={target ?? '_self'}
          {...(props.linkProps || {})}
        >
          {children}
        </Link>
      </Button>
    )

  if (asChild)
    return (
      <Slot className={rootClassnames} ref={ref}>
        {children}
      </Slot>
    )

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{
        scale: 0.95,
        boxShadow: '0px 0px 12px rgb(255, 255,255)',
        transition: {
          duration: 0.3,
          yoyo: Infinity,
        },
      }}
      className={rootClassnames}
      ref={mergeRefs([ref, nativeButtonRef])}
      {...buttonProps}
    >
      {loading && <CgSpinner className="mr-2 animate-spin" size={20} color="white" />}
      {renderChild}
    </motion.button>
  )
})

Button.displayName = 'Matsurika_Button'

export default Button

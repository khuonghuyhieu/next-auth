'use client'

import { forwardRef, memo, useMemo } from 'react'
import { cn } from '@/utils'

// eslint-disable-next-line react/display-name
const Input = forwardRef((props, ref) => {
  const {
    onChange,
    value = '',
    error,
    type = 'text',
    left,
    right,
    className,
    wrapperClassName,
    ...inputProps
  } = props

  const rootClassnames = useMemo(
    () =>
      cn(
        'enabled:hover:border-primary block h-12 w-full rounded-lg border border-black px-4 text-base font-bold text-black outline-none',
        'disabled:bg-table-header disabled:text-white disabled:shadow-none',
        {
          'invalid:text-red-500 focus:border-red-500 enabled:hover:border-red-500': Boolean(error),
          peer: Boolean(error),
        }
      ),
    [error]
  )

  return (
    <div className={cn('relative w-full rounded-lg ease-linear', wrapperClassName)}>
      {left}
      <input
        type={type}
        className={cn(rootClassnames, className)}
        aria-invalid={error ? 'true' : 'false'}
        onChange={onChange}
        value={value}
        ref={ref}
        autoCapitalize="off"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        {...inputProps}
      />
      {right}
    </div>
  )
})

export default memo(Input)

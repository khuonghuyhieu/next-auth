'use client'

import * as Label from '@radix-ui/react-label'
import { Children, cloneElement, useId } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'
import { cn } from '@/utils'

const FormItem = ({
  name,
  required,
  children,
  className,
  label,
  labelClassName,
  wrapperInputClassName,
  inputClassName,
  requiredClassName,
  wrapperClassName,
  textLabelClassName,
  helpComponent,
  textNotice,
  hideErrorMessage = false,
  bordered = true,
  ...inputProps
}) => {
  const formItemId = useId()
  const child = Children.only(children)

  const { control } = useFormContext() || {}

  return (
    <Controller
      rules={{
        ...required,
      }}
      name={name}
      control={control}
      render={({ field, formState }) => {
        const errorMessage = get(formState.errors, `${name}.message`)
        return (
          <div
            className={cn('flex flex-col justify-between lg:flex-row lg:items-center', className)}
          >
            {label && (
              <Label.Root
                className={cn('flex shrink-0 items-center lg:w-1/5', labelClassName)}
                htmlFor={formItemId}
              >
                <span className={cn('text-base font-bold lg:text-lg', textLabelClassName)}>
                  {label}
                </span>
                {required && (
                  <span
                    className={cn(
                      'border-dark-gray bg-secondary ml-3 rounded border px-2 py-0.5 text-[10px] lg:ml-5',
                      requiredClassName
                    )}
                  >
                    Required
                  </span>
                )}
              </Label.Root>
            )}
            <div className={cn(label && 'mt-2 w-full', wrapperInputClassName)}>
              {cloneElement(child, {
                ...field,
                ...inputProps,
                className: cn('w-full p-2', { 'border border-dark': bordered }, inputClassName),
                error: errorMessage ? Boolean(errorMessage) : undefined,
                id: formItemId,
              })}
              {textNotice && (
                <p className="text-muted ml-0 mt-2.5 whitespace-pre-wrap text-xs lg:ml-4">
                  {textNotice}
                </p>
              )}
              {!hideErrorMessage && (
                <p
                  className={cn(
                    'text-danger text-[11px]',
                    !errorMessage ? 'max-h-0' : 'mt-1 max-h-[40px]'
                  )}
                  role="alert"
                  style={{
                    transition: !errorMessage
                      ? 'max-height 0.15s ease-out'
                      : 'max-height 0.25s ease-in',
                  }}
                >
                  {errorMessage}
                </p>
              )}
              {helpComponent}
            </div>
          </div>
        )
      }}
    />
  )
}

export default FormItem

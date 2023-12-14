'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '@/components/form'
import { Button } from '@/components/ui/Button'
import { loginFormSchema } from '@/validations/loginSchema'

export default function LoginView() {
  const methods = useForm({
    resolver: yupResolver(loginFormSchema()),
    mode: 'onChange',
  })

  return (
    <div className="space-y-7 px-5 pb-5 text-white">
      <div className="flex-center">
        <Image src="/logo_portfolio_white.png" alt="abc" width={70} height={70} />
      </div>
      <p className="text-center text-2xl">Sign in or continue as a guest to place your order</p>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit()} className="space-y-4">
            <TextInput name="name" label="User Name" />
            <TextInput name="password" type="password" label="Password" />
            {/* <button className="w-full rounded-lg bg-white py-3 text-lg text-black">Login</button> */}
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

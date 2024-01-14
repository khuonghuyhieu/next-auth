'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '@/components/form'
import Button from '@/components/ui/Button'
import { useLogin } from '@/services/auth'
import { FORM_LOGIN, loginFormSchema, loginValues } from '@/validations/loginSchema'

export default function LoginView() {
  const { doLogin } = useLogin()

  const methods = useForm({
    resolver: yupResolver(loginFormSchema()),
    defaultValues: loginValues,
    mode: 'onChange',
  })

  const onSubmit = (value) => {
    doLogin(value)
  }

  return (
    <div className="space-y-7 px-5 pb-5 text-white">
      <div className="flex-center">
        <Image src="/logo_portfolio_white.png" alt="abc" width={70} height={70} />
      </div>
      <p className="text-center text-2xl">Sign in or continue as a guest to place your order</p>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TextInput name={FORM_LOGIN.USER_NAME} label="User Name" />
            <TextInput name={FORM_LOGIN.PASSWORD} type="password" label="Password" />
            <div className="mt-10 flex w-full justify-center">
              <Button type="submit" fullWidth variant="secondary">
                Login
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

import { signIn } from 'next-auth/react'

export const useLogin = () => {
  const doLogin = async (data) => {
    const response = await signIn('credentials', {
      ...data,
      redirect: false,
    })

    console.log('response', response)
  }

  return { doLogin }
}

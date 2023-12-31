import CredentialsProvider from 'next-auth/providers/credentials'
import { Axios } from '@/configs'
import { API, Routes } from '@/constants'

const login = async (email, password) => {
  try {
    const response = await Axios.post(API.AUTH.LOGIN, {
      email,
      password,
    })
    return response
  } catch (error) {
    return error
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'TestAuth',
      credentials: {
        email: {
          label: 'Email Address',
          type: 'text',
          placeholder: 'john.doe@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your super secure password',
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('INTERNAL_SERVER_ERROR')
        }
        const { email, password } = credentials || {}
        const response = await login(email, password)

        if (response.success) {
          const user = {
            ...response.user,
            accessToken: response.token,
          }
          return user
        }
        throw new Error(JSON.stringify(response))
      },
    }),
  ],
  callbacks: {
    async signIn(response) {
      return response
    },
    jwt: async ({ token, user, session }) => {
      // session updated
      if (session) {
        token.user = {
          ...token.user,
        }
      }

      if (user) {
        token.user = {
          id: user.id,
          accessToken: user.accessToken,
          email: user?.email,
          name: user?.name,
        }
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.user.id,
        accessToken: token.user.accessToken,
        email: token.user.email,
        name: token.user.name,
      }
      return session
    },
  },
  pages: { signIn: Routes.AUTH.LOGIN },
}

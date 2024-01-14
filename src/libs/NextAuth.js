import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'
import { API, API_ROOT, Routes } from '@/constants'

// const login = async (email, password) => {
//   try {
//     const response = await Axios.post(API.AUTH.LOGIN, {
//       email,
//       password,
//     })
//     return response
//   } catch (error) {
//     return error
//   }
// }

const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_ROOT}${API.AUTH.LOGIN}`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response
  } catch (error) {
    return error
  }
}

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'HieuKhuong',
      credentials: {
        username: {
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
        const { username, password } = credentials || {}
        const response = await login(username, password)

        if (response.ok) {
          return response
        }
        throw new Error(JSON.stringify(response.error))
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
  secret: process.env.JWT_SECRET,
}

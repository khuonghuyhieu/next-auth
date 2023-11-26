import CredentialsProvider from "next-auth/providers/credentials";
import { API, Routes, SNS_PROVIDERS } from "@/constants";
import Fetcher from "@/services/fetch";
import { getAppleToken } from "@/utils";

const login = async (email, password) => {
  try {
    const response = await Fetcher.post(API.AUTH.LOGIN, {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Personal",
      credentials: {
        email: {
          label: "Email Address",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("INTERNAL_SERVER_ERROR");
        }
        const { email, password } = credentials || {};
        const response = await login(email, password);

        if (response.success) {
          const user = {
            ...response.user,
            accessToken: response.token,
          };
          return user;
        }
        throw new Error(JSON.stringify(response));
      },
    }),
  ],
  callbacks: {
    async signIn(response) {
      return response;
    },
    jwt: async ({ token, user, account, session }) => {
      // check sns login
      if (SNS_PROVIDERS.includes(account?.provider) && account?.id_token) {
        const res = await snsLogin(account?.provider, account?.id_token);
        token.user = {
          id: res?.user?.id,
          accessToken: res?.token,
          categoryId: res?.user?.main_event_category_id,
          memberType: res?.user?.member_type,
          email: res?.user?.email,
          name: res?.user?.name || user?.name,
        };
        return token;
      }

      // session updated
      if (session) {
        token.user = {
          ...token.user,
          categoryId: session?.categoryId || token.user?.categoryId,
          memberType: session?.memberType || token.user?.memberType,
        };
      }

      if (user) {
        token.user = {
          id: user.id,
          accessToken: user.accessToken,
          categoryId: user.main_event_category_id,
          memberType: user.member_type,
          email: user?.email,
          name: user?.name,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.user.id,
        accessToken: token.user.accessToken,
        categoryId: token.user.categoryId,
        memberType: token.user.memberType,
        email: token.user.email,
        name: token.user.name,
      };
      return session;
    },
  },
  pages: { signIn: Routes.AUTH.LOGIN },
};

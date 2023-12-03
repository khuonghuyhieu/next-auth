import AuthProvider from "@/contexts/AuthProvider";

export default function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

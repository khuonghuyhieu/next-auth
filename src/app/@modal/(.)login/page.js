"use client";

import RouteModal from "@/components/ui/RouteModal";
import LoginView from "@/views/Auth/Login";

export default function Login() {
  return (
    <RouteModal>
      <LoginView />
    </RouteModal>
  );
}

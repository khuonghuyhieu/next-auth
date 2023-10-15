"use client";

import { TextInput } from "@/components/form";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

export default function LoginView() {
  const methods = useForm({
    mode: "onChange",
  });

  return (
    <div className="text-white px-5 space-y-7 pb-5">
      <div className="flex-center">
        <Image
          src="/logo_portfolio_white.png"
          alt="abc"
          width={70}
          height={70}
        />
      </div>
      <p className="text-2xl text-center">
        Sign in or continue as a guest to place your order
      </p>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit()} className="space-y-4">
            <TextInput name="name" label="User Name" />
            <TextInput name="password" type="password" label="Password" />
          </form>
        </FormProvider>
        <Button className="w-full">
          <span>Order Online</span>
        </Button>
      </div>
    </div>
  );
}

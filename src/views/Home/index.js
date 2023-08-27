"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href="/login">
        <button className="p-5 bg-white rounded-3xl cursor-pointer">
          <span className="text-black text-xl">Login</span>
        </button>
      </Link>
    </div>
  );
}

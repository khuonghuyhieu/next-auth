"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2">
        <Link href="/login">
          <div className="p-5 bg-white rounded-3xl cursor-pointer">
            <span className="text-black text-xl">Login</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

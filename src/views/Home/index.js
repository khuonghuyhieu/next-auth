"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="px-5 py-3 bg-black text-white rounded-lg text-lg">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children};
      <div className="auth-asset">
        <Image
          src="/icons/logo.png"
          alt="Auth image"
          width={500}
          height={500}
        />
      </div>
    </main>
  );
}

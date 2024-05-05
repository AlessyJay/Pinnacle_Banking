import SideBar from "@/components/SideBar";
import MobileNav from "@/components/MobileNav";
import React from "react";
import Image from "next/image";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const login = { firstName: "Tony", lastName: "Crimson" };

  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar user={login} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.png" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={login} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default layout;

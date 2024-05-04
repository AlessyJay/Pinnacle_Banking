import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      sidebar
      {children}
    </main>
  );
};

export default layout;

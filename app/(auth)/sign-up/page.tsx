import React from "react";
import AuthForm from "@/components/AuthForm";
import { getLoggedInUser } from "@/lib/actions/user.action";

const Signup = async () => {
  const loginUser = await getLoggedInUser();

  console.log(loginUser);

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="Sign-up" />
    </section>
  );
};

export default Signup;

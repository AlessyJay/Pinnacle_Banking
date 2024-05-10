"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.action";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
      firstName: "",
      lastName: "",
      ssn: "",
      address1: "",
      dateOfBirth: "",
      state: "",
      postalCode: "",
      city: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // console.log(
    //   "Email " + data.Email,
    //   "Pass " + data.Password,
    //   "address1 " + data.address1,
    //   "city " + data.city,
    //   data.dateOfBirth,
    //   data.firstName,
    //   data.lastName,
    //   data.postalCode,
    //   data.ssn,
    //   data.state
    // );

    try {
      // Sign up with Appwrite & create plain token

      if (type === "Sign-up") {
        const newUser = await signUp(data);

        setUser(newUser);
      }

      if (type === "Sign-in") {
        const response = await signIn({
          email: data.Email,
          password: data.Password,
        });
        if (response) router.push("/");
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1 px-4">
          <Image
            src="/icons/logo.png"
            width={34}
            height={34}
            alt="Pinnacle Logo"
          />
          <h1 className="text-26 font-ibm-flex-serif font-bold text-black-1">
            Pinnacle
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "Sign-in" ? "Sign In" : "Sign Up"}

            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started."
                : "Please, enter your details."}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "Sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      name="firstName"
                      control={form.control}
                      label="Name"
                      nameHolder="First Name"
                    />
                    <CustomInput
                      name="lastName"
                      control={form.control}
                      label="Last Name"
                      nameHolder="Last Name"
                    />
                  </div>
                  <CustomInput
                    name="address1"
                    control={form.control}
                    label="Address"
                    nameHolder="Address"
                  />
                  <CustomInput
                    name="city"
                    control={form.control}
                    label="City"
                    nameHolder="City"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      name="state"
                      control={form.control}
                      label="State"
                      nameHolder="State"
                    />
                    <CustomInput
                      name="postalCode"
                      control={form.control}
                      label="Postal Code"
                      nameHolder="Postal Code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      name="dateOfBirth"
                      control={form.control}
                      label="Date of Birth"
                      nameHolder="dd-mm-yyyy"
                    />
                    <CustomInput
                      name="ssn"
                      control={form.control}
                      label="SSN"
                      nameHolder="SSN"
                    />
                  </div>
                </>
              )}
              <CustomInput
                name="Email"
                control={form.control}
                label="Email"
                nameHolder="Email"
              />
              <CustomInput
                name="Password"
                control={form.control}
                label="Password"
                nameHolder="Password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "Sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "Sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "Sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "Sign-in" ? (
                <strong>Sign Up</strong>
              ) : (
                <strong>Sign In</strong>
              )}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;

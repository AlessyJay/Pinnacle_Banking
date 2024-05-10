"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation or Database or Make a fetch
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { Email, Password, firstName, lastName } = userData;

  try {
    // Create a user account (Using Appwrite)
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      Email,
      Password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(Email, Password);

    console.log("This is a newUserAccount " + newUserAccount);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (err) {
    console.log(err);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (err) {
    return null;
  }
};

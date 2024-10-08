"use client";
import React from "react";
import { Session } from "next-auth";
import Image from "next/image";
import UserPic from "@/assets/profile-pic-placeholder.png";
import { signIn, signOut } from "next-auth/react";

type UserProfileButtonProps = {
  session: Session | null;
};

export default function UserProfileButton({ session }: UserProfileButtonProps) {
  const user = session?.user;

  return (
    <div className="navbar-end">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            {user ? (
              <Image
                className=""
                height={40}
                width={40}
                src={user.image || UserPic}
                alt="User Image"
              />
            ) : (
              <Image
                className=""
                height={40}
                width={40}
                src={UserPic}
                alt="User Image"
              />
            )}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            {user ? (
              <button onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </button>
            ) : (
              <button onClick={() => signIn()}>Sign In</button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

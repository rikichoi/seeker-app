import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import UserProfileButton from "./UserProfileButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-base-100">
      <div className="navbar bg-base-100 z-50 max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {session ? (
                <>
                  <li>
                    <Link href={"/add-job"}>Add Job</Link>
                  </li>
                  <li>
                    <Link href={"/add-company"}>Add Company</Link>
                  </li>
                </>
              ) : (
                ""
              )}

              <li>
                <Link href={"/company"}>View Companies</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            <Image alt="Logo Image" src={Logo} height={40} width={120} />
          </Link>
          <div className="navbar-center  hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href={"/listings"}>Search Jobs</Link>
              </li>
              <li>
                <Link href={"/company"}>View Companies</Link>
              </li>
              <li>
                <Link href={"/add-job"}>Add Job</Link>
              </li>
              <li>
                <Link href={"/add-company"}>Add Company</Link>
              </li>
            </ul>
          </div>
        </div>

        <UserProfileButton session={session} />
      </div>
    </div>
  );
}

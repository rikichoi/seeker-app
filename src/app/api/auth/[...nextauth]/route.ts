import { env } from "@/lib/db/env"
import prisma from "@/lib/db/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import { Adapter } from "next-auth/adapters"
import Google from "next-auth/providers/google"
import { authOptions } from "@/lib/authOptions"



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
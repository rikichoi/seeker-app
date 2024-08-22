import { env } from "@/lib/db/env"
import prisma from "@/lib/db/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import { Adapter-auth/adapters"
import Googrs/google"


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { connectToDB } from "@/db/mongodb/connect";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/userSchema.ts";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                 if (credentials === null) return null;

                 try {

                    await connectToDB();

                    const user = await User.findOne({ email: credentials.email });

                    if (user) {
                        const passwordCheck = await bcrypt.compare(credentials.password, user.password);

                        if (passwordCheck) {
                            return user
                        } else {
                            return null;
                        }


                    } else {
                        return null;
                    }
                 } catch(err) {
                    return null;
                 }
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            const name = session.user.email.split('@')[0];
            session.user.username = name;
            session.user.id = sessionUser._id;
            session.user.image = sessionUser.image;

            return session;
        },
        async signIn({ profile, user }) {

            if (profile || user) {
                const selected = profile ? profile : user;
    
                try {
                    await connectToDB();
    
                    const userExists = await User.findOne({
                        email: selected?.email
                    });
    
                    if (!userExists) {
    
                        const name = selected.email.split('@')[0];
                        await User.create({
                            email: selected.email,
                            username: name,
                            image: profile ? profile.picture : "",
                            firstName: selected.given_name,
                            lastName: selected.family_name,
                        })
                    }
    
                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            } else {
                return false;
            }

        }
    }
})

export { handler as GET, handler as POST };
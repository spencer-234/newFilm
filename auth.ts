import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { connectToDB } from "./db/mongodb/connect";
import { signInSchema } from "./lib/zod";
import bcrypt from "bcrypt";
import User from "./db/models/userSchema";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (credentials === null) return null;

                try {
                    await connectToDB();

                    const { username, password } = await signInSchema.parseAsync(credentials);

                    const user = await User.findOne({
                        username: username
                    })

                    if (user) {
                        const passwordCheck = await bcrypt.compare(password, user.password);

                        if (passwordCheck) {
                            return user
                        } else {
                            throw new Error("Invalid password")
                        }


                    } else {
                        throw new Error('User not found');
                    }

                } catch (error) {
                    console.log(error);
                    throw new Error('Something went wrong');
                }
                return null;

            }
        })
    ],
    callbacks: {
        session: async ({ session }) => {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.email = sessionUser.email;
            session.user.id = sessionUser._id;
            session.user.image = sessionUser.image;

            return session;
        },
        signIn: async ({ profile }) => {
            if (profile) {
                try {
                    await connectToDB();

                    const userExists = await User.findOne({
                        email: profile?.email
                    });

                    if (!userExists) {

                        const name = profile.email?.split('@')[0];

                        await User.create({
                            email: profile.email,
                            username: name,
                            image: profile.picture
                        })
                    }

                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
            return true;
        }
    }
})
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
    const userData = await request.json();

    try {
        const emailCheck = await db.user.findUnique({
            where: {
                email: userData.email
            }
        })

        console.log(emailCheck);

        if (emailCheck !== null) {
            return NextResponse.json({ error: "User with that email already exists" }, { status: 409 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const username = userData.email.split('@')[0];

        await db.user.create({
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                username: username,
                password: hashedPassword,
                profilePicture: "",
            }
        })

        return NextResponse.json({ message: 'User Created' }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
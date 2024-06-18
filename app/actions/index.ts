"use server"
import { signIn } from "@/auth";

// action for google auth
export const socialLogin = async (formData: FormData) => {
    const action = formData.get('action')?.toString();
    await signIn(action, { redirectTo: "/" });
};

export const credentialsLogin = async (inputs: {
    username: string,
    password: string
}) => {
    try {
        const response = await signIn("credentials", {
            username: inputs.username,
            password: inputs.password,
            redirect: false
        })

        return response;
    } catch (err) {
        throw new Error("Login failed")
    }
}
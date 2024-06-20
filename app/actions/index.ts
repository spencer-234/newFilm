"use server"
import { signIn } from "@/auth";
import { signOut } from "@/auth";

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
            redirectTo: "/"
        })

        return response;
    } catch (err) {
        throw err;
    }
}

export const logout = async () => {
    try {
        const res = await signOut({ redirect: false });
        return res;
    } catch (err) {
        throw err;
    }
}
"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { socialLogin, credentialsLogin } from "../actions"
import { MouseEvent, useState } from "react"
import { checkEmptyInputs } from "@/utils/checkEmptyInputs"

const Login = () => {

    const router = useRouter();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (checkEmptyInputs(inputs, setErrorMessage)) {
                const response = await credentialsLogin(inputs);
                if (!response) {
                    setErrorMessage("Try Again");
                }
            }
        } catch (err) {
            setErrorMessage("Login Invalid");
        }
    }

    return (
        <section className="w-screen h-[calc(100vh-74px)] center-flex px-5">
            <div className="flex rounded-xl overflow-hidden border border-slate-500">
                <div className="flex-1 hidden lg:flex">
                    <Image
                        src="/assets/login.png"
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[700px] h-auto"
                    />
                </div>
                <div className="flex-1 flex flex-col py-4 px-4 bg-black gap-4 min-w-[250px] sm:w-[60vw] lg:w-fit">
                    <h2 className="text-3xl font-bold">Login</h2>
                    <label htmlFor="username" className="text-lg" >Username</label>
                    <input type="text" id="username" className="form-input" name="username" onChange={handleChange} />
                    <label htmlFor="password" className="text-lg">Password</label>
                    <input type="password" id="password" className="form-input" name="password" onChange={handleChange} />
                    <button
                        className="border border-white px-2 py-1 text-lg rounded-md w-[50%] self-center mt-2 hover:bg-slate-900"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                    <div className="relative border-white border center-flex mt-7 w-[80%] self-center">
                        <span className="absolute bg-black px-2 font-bold text-lg">or</span>
                    </div>
                    <form className="center-flex mt-4 w-full" action={socialLogin}>
                        <button
                            className="bg-[#fc7569] hover:bg-[#ff4e4e] center-flex self-center rounded-lg w-[70%] py-1 gap-2 px-2"
                            name="action"
                            value="google"
                            type="submit"
                        >
                            <Image
                                src="/assets/google.svg"
                                alt="google-login"
                                width={27}
                                height={27}
                            />
                            <span>Sign in with Google</span>
                        </button>
                    </form>
                    {errorMessage && <span className="text-red-500 self-center">{errorMessage}</span>}
                    <span className="text-sm self-center">Don't have an account? <Link href="/sign-up" className="hover:underline">Sign up</Link></span>
                </div>
            </div>
        </section>
    )
}

export default Login
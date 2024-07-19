"use client"

import Image from "next/image"
import Link from "next/link"
import { MouseEvent, useState } from "react"
import { checkEmptyInputs } from "@/utils/checkEmptyInputs"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const Login = () => {

    // redirect if session is authenticated
    const { data: session, status } = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [inputs, setInputs] = useState<{ email: string, password: string }>({
        email: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (checkEmptyInputs(inputs, setErrorMessage)) {
                const res = await signIn("credentials", {
                    email: inputs.email,
                    password: inputs.password,
                    redirect: false,
                });
                if (res?.ok) {
                    setSubmitting(false);
                    router.push("/");
                } else {
                    setSubmitting(false);
                    setErrorMessage("Incorrect email or password");
                }
            }
        } catch (err) {
            setErrorMessage("Login Invalid");
            setSubmitting(false);
        }
    }

    return (
        <>
            {status === 'loading' ? (
                <section className="w-screen h-[calc(100vh-74px)] center-flex px-5">
                    <Image
                        src="/assets/loading.gif"
                        width={50}
                        height={50}
                        alt="loading"
                        priority={true}
                        unoptimized={true}
                    />
                </section>
            )
                : status === 'unauthenticated'
                    ? (
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
                                    <label htmlFor="email" className="text-lg" >Email</label>
                                    <input type="email" id="email" className="form-input" name="email" onChange={handleChange} />
                                    <label htmlFor="password" className="text-lg">Password</label>
                                    <input type="password" id="password" className="form-input" name="password" onChange={handleChange} />
                                    <button
                                        className="border border-white px-2 py-1 text-lg rounded-md w-[50%] self-center mt-2 hover:bg-slate-900"
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Loading...' : "Login"}
                                    </button>
                                    <div className="relative border-white border center-flex mt-7 w-[80%] self-center">
                                        <span className="absolute bg-black px-2 font-bold text-lg">or</span>
                                    </div>
                                    <button
                                        className="bg-[#fc7569] hover:bg-[#ff4e4e] center-flex self-center rounded-lg w-[70%] py-1 gap-2 px-2"
                                        onClick={() => signIn("google")}
                                        disabled={submitting}
                                    >
                                        <Image
                                            src="/assets/google.svg"
                                            alt="google-login"
                                            width={27}
                                            height={27}
                                        />
                                        <span>Sign in with Google</span>
                                    </button>
                                    {errorMessage && <span className="text-red-500 self-center">{errorMessage}</span>}
                                    <span className="text-sm self-center">Don&apos;t have an account? <Link href="/sign-up" className="hover:underline">Sign up</Link></span>
                                </div>
                            </div>
                        </section>
                    )
                    : router.push("/")
            }
        </>
    )
}

export default Login
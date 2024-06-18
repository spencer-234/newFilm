"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { checkEmptyInputs } from "@/utils/checkEmptyInputs"
import { useRouter } from "next/navigation"

interface Inputs {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const SignUp = ({ params }: { params: { email: string } }) => {

    const router = useRouter();

    // state to track when data is submitting to disable button
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [formInputs, setFormInputs] = useState<Inputs>({
        firstName: "",
        lastName: "",
        email: params.email ? params.email.toString().replace('%40', '@') : "",
        password: "",
        confirmPassword: "",
    });

    // function to change state of inputs on input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    // check if passwords are matching
    const checkPasswords = () => {
        if (formInputs.confirmPassword !== formInputs.password) {
            setErrorMessage("Passwords do not match")
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        if (checkPasswords() && checkEmptyInputs(formInputs, setErrorMessage)) {
            setErrorMessage("");
            await fetch('/api/users/create', { method: 'POST', body: JSON.stringify({ ...formInputs }) })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setErrorMessage(data.error)
                    } else {
                        setSubmitting(false);
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    setErrorMessage("Something went wrong");
                });

        }
        setSubmitting(false);
    }

    return (
        <section className="w-screen h-[calc(100vh-74px)] center-flex px-5">
            <div className="flex rounded-xl overflow-hidden border border-slate-500">
                <div className="flex-1 flex flex-col py-4 px-4 bg-black gap-3">
                    <h2 className="font-extrabold text-2xl">Sign up</h2>
                    <div className="flex gap-5">
                        <div className="flex-1 flex flex-col">
                            <label htmlFor="firstName text-lg">First Name</label>
                            <input type="text" id="firstName" className="form-input" name="firstName" onChange={handleChange} />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label htmlFor="lastName text-lg">Last Name</label>
                            <input type="text" id="lastName" className="form-input" name="lastName" onChange={handleChange} />
                        </div>
                    </div>
                    <label htmlFor="email" className="text-lg">Email</label>
                    <input type="email" id="email" className="form-input" name="email" value={formInputs.email} onChange={handleChange} />
                    <label htmlFor="password" className="text-lg">Password</label>
                    <input type="password" id="password" className="form-input" name="password" onChange={handleChange} />
                    <label htmlFor="confirmPassword" className="text-lg">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="form-input" name="confirmPassword" onChange={handleChange} />
                    <button
                        className="border border-white px-2 py-1 text-lg rounded-md w-[50%] self-center my-5 hover:bg-slate-900"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? "Creating User..." : "Sign Up"}
                    </button>
                    <span className="self-center">Already have an account? <Link href="/login" className="hover:underline">Login</Link></span>
                    {errorMessage && <span className="text-red-500 self-center">{errorMessage}</span>}
                </div>
                <div className="flex-1">
                    <Image
                        src="/assets/sign-up.png"
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[700px] h-auto"
                    />
                </div>
            </div>
        </section>
    )
}

export default SignUp
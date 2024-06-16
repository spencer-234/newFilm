"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

interface Inputs {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const SignUp = ({ params }: { params: { email: string } }) => {

    const [formInputs, setFormInputs] = useState<Inputs>({
        firstName: "",
        lastName: "",
        email: params.email ? params.email.toString().replace('%40', '@') : "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
                    <input type="text" id="password" className="form-input" name="password" onChange={handleChange} />
                    <label htmlFor="password" className="text-lg">Confirm Password</label>
                    <input type="text" id="password" className="form-input" />
                    <button className="border border-white px-2 py-1 text-lg rounded-md w-[50%] self-center my-5 hover:bg-slate-900">Sign Up</button>
                    <span className="self-center">Already have an account? <Link href="/login" className="hover:underline">Login</Link></span>
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
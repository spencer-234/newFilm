import Image from "next/image"
import Link from "next/link"

const SignUp = () => {
    return (
        <section className="w-screen h-[calc(100vh-74px)] center-flex px-5">
            <div className="flex rounded-xl overflow-hidden border border-slate-500">
                <div className="flex-1 flex flex-col py-4 px-4 bg-black gap-3">
                    <h2 className="font-extrabold text-2xl">Sign up</h2>
                    <div className="flex gap-5">
                        <div className="flex-1 flex flex-col">
                            <label htmlFor="firstName text-lg">First Name</label>
                            <input type="text" id="firstName" className="form-input" />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label htmlFor="lastName text-lg">Last Name</label>
                            <input type="text" id="lastName" className="form-input" />
                        </div>
                    </div>
                    <label htmlFor="email" className="text-lg">Email</label>
                    <input type="email" id="email" className="form-input" />
                    <label htmlFor="password" className="text-lg">Password</label>
                    <input type="text" id="password" className="form-input" />
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
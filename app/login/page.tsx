import Image from "next/image"
import Link from "next/link"

const Login = () => {
    return (
        <section className="w-screen h-[calc(100vh-74px)] center-flex px-5">
            <div className="flex rounded-xl overflow-hidden border border-slate-500">
                <div className="flex-1">
                    <Image
                        src="/assets/login.png"
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[700px] h-auto"
                    />
                </div>
                <div className="flex-1 flex flex-col py-4 px-4 bg-black gap-4">
                    <h2 className="text-3xl font-bold">Login</h2>
                    <label htmlFor="username" className="text-lg">Username</label>
                    <input type="text" id="username" className="py-1 px-2 bg-gray-800 border-b-2 border-gray-400 text-white" />
                    <label htmlFor="password" className="text-lg">Password</label>
                    <input type="text" id="password" className="py-1 px-2 bg-gray-800 border-b-2 border-gray-400 text-white" />
                    <div className="relative border-white border center-flex mt-7 w-[80%] self-center">
                        <span className="absolute bg-black px-2 font-bold text-lg">or</span>
                    </div>
                    <Link href="#" className="center-flex w-full gap-3 bg-[#fc7569] hover:bg-[#ff4e4e] py-1 rounded-lg mt-4">
                        <Image
                            src="/assets/google.svg"
                            alt="google-login"
                            width={27}
                            height={27}
                        />
                        <span>Sign in with Google</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Login
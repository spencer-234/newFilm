"use client"

import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import Link from "next/link"
import { Session } from "next-auth"
import { logout } from "@/app/actions"
import { useRouter } from "next/navigation"

interface Props {
    menuOpen: boolean
    setMenuOpen: Dispatch<SetStateAction<boolean>>
    session: Session
}

const LoggedInNavbar = ({ menuOpen, setMenuOpen, session }: Props) => {

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            await logout()
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Image
                src={session.user?.image?.startsWith("https://lh3.googleusercontent")
                    ? `${session.user?.image}`
                    : "/assets/default-profile.png"
                }
                width={40}
                height={40}
                priority={true}
                alt="menu-icon"
                className="rounded-[50%] cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
            />
            {menuOpen
                && (
                    <>
                        <ul className="bg-black flex-col flex absolute top-[60px] right-[-15px] w-[100px] animate-growdown origin-top items-end rounded gap-1 p-3">
                            <li><Link href="/home" className="option sm:hidden" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link href="/movies" className="option sm:hidden" onClick={() => setMenuOpen(false)}>Movies</Link></li>
                            <li><Link href="/series" className="option sm:hidden" onClick={() => setMenuOpen(false)}>TV Shows</Link></li>
                            <li>
                                <form onSubmit={handleSubmit}>
                                    <button className="bg-transparent option"
                                        type="submit"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </>
                )
            }
        </>
    )

}

export default LoggedInNavbar
import { SetStateAction, Dispatch } from "react"
import Image from "next/image"
import Link from "next/link"

interface Props {
    menuOpen: boolean
    setMenuOpen: Dispatch<SetStateAction<boolean>>
}

const LoggedOutNavbar = ({ menuOpen, setMenuOpen }: Props) => {

    return (
        <>
            {menuOpen
                ? (
                    <>
                        <Image
                            src="/assets/close.svg"
                            width={35}
                            height={35}
                            priority={true}
                            alt="menu-icon"
                            className="sm:hidden "
                            onClick={() => setMenuOpen(false)}
                        />
                        <ul className="bg-black flex-col flex absolute top-[60px] right-[-15px] w-[100px] animate-growdown origin-top sm:hidden items-end rounded gap-1 p-3">
                            <li><Link href="/login" className="option" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link href="/login" className="option" onClick={() => setMenuOpen(false)}>Movies</Link></li>
                            <li><Link href="/login" className="option" onClick={() => setMenuOpen(false)}>TV Shows</Link></li>
                            <li><Link href="/login" className="option" onClick={() => setMenuOpen(false)}>Login</Link></li>
                        </ul>
                    </>
                )
                : (
                    <Image
                        src="/assets/menu.svg"
                        width={35}
                        height={35}
                        priority={true}
                        alt="menu-icon"
                        className="sm:hidden"
                        onClick={() => setMenuOpen(true)}
                    />
                )
            }
            <ul className=" hidden sm:center-flex">
                <li><Link href="/login" className="option">Login</Link></li>
            </ul>
        </>
    )
}

export default LoggedOutNavbar
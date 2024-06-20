"use client"

import Image from "next/image"
import Search from "../Search"
import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import LoggedOutNavbar from "./LoggedOutNavbar"
import LoggedInNavbar from "./LoggedInNavbar"

const Navbar = () => {

    const { data: session, status } = useSession();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    const handleSearchOpen = () => {
        if (menuOpen) {
            setMenuOpen(false);
        }
        setSearchOpen((prev) => !prev);
    }

    return (
        <header>
            <nav className="center-flex px-4 md:px-[40px] w-screen py-3 bg-black transition-all relative z-[999]">
                <div className="flex items-center max-w-[var(--max-width)] w-full relative">
                    <div className="center-flex">
                        <Link href="/" className="center-flex w-fit">
                            <Image
                                src="/assets/logo.png"
                                width={50}
                                height={50}
                                alt="new-film-logo"
                                priority={true}
                            />
                            <h1 className="ml-1 mr-10 font-bold text-2xl main-gradient bg-clip-text text-transparent pr-[5px]"><i>NewFilm</i></h1>
                        </Link>
                        <ul className="hidden gap-5 sm:center-flex">
                            <li><Link href="#" className="option">Home</Link></li>
                            <li><Link href="#" className="option">Movies</Link></li>
                            <li><Link href="#" className="option">TV Shows</Link></li>
                        </ul>
                    </div>
                    <Image
                        src="/assets/search.svg"
                        width={25}
                        height={25}
                        priority={true}
                        alt="search-icon"
                        className="cursor-pointer ml-auto mr-5 md:mr-7"
                        onClick={() => handleSearchOpen()}
                    />
                    {status !== "authenticated"
                        ? <LoggedOutNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                        : <LoggedInNavbar
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            session={session}
                        />
                    }
                </div>
                {searchOpen && <Search open={searchOpen} />}
            </nav>
        </header>
    )
}

export default Navbar
"use client"

import Image from "next/image"
import Search from "./Search"
import { useState } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import Sidebar from "./Sidebar"

const Navbar = () => {

    const { data: session } = useSession();

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
            <nav className="center-flex px-4 md:px-[40px] w-screen py-2 bg-black transition-all relative z-[999] border-b-2 border-[#07FFFF]">
                <div className="flex items-center max-w-[var(--max-width)] w-full relative">
                    <div className="center-flex">
                        <Link href="/" className="center-flex w-fit">
                            <Image
                                src="/assets/logo.png"
                                width={35}
                                height={35}
                                alt="new-film-logo"
                                priority={true}
                            />
                            <h1 className="ml-1 mr-10 font-bold text-xl main-gradient bg-clip-text text-transparent pr-[5px]"><i>NewFilm</i></h1>
                        </Link>
                        <ul className="hidden gap-5 sm:center-flex">
                            <li><Link href="#" className="option">Home</Link></li>
                            <li><Link href="#" className="option">Movies</Link></li>
                            <li><Link href="#" className="option">TV Shows</Link></li>
                        </ul>
                    </div>
                    <div className="center-flex ml-auto gap-8">
                        <Image
                            src="/assets/search.svg"
                            width={25}
                            height={25}
                            priority={true}
                            alt="search-icon"
                            className="cursor-pointer"
                            onClick={() => handleSearchOpen()}
                        />
                        {session?.user ? (
                            <div className="relative">
                                <Image
                                    src={session.user.image ? session.user.image : "/assets/default-profile.png"}
                                    width={40}
                                    height={40}
                                    alt="user-profile-picture"
                                    onClick={() => setMenuOpen(prev => !prev)}
                                    className="rounded-full cursor-pointer"
                                />
                                {menuOpen && (
                                    <ul className="absolute bg-black py-3 pr-3 pl-5 border-2 border-t-0 border-[#07FFFF] flex items-end flex-col rounded-b-md top-[48px] right-[-20px]">
                                        <li>
                                            <Link href="#" className="option">Profile</Link>
                                        </li>
                                        <li>
                                            <span className="whitespace-nowrap option" onClick={() => signOut()}>Sign Out</span>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )
                            : <>
                                <Image
                                    src={"/assets/menu.svg"}
                                    alt="menu"
                                    width={35}
                                    height={35}
                                    className="sm:hidden cursor-pointer"
                                    onClick={() => setMenuOpen(prev => !prev)}
                                />
                                <Link href="/login" className="option hidden sm:block">Login</Link>
                            </>
                        }
                    </div>
                </div>
                {searchOpen && <Search open={searchOpen} setSearch={setSearchOpen} />}
                {menuOpen && <Sidebar setMenuOpen={setMenuOpen} />}
            </nav>
        </header>
    )
}

export default Navbar
"use client"

import Image from "next/image"
import Search from "./Search"
import { useState } from "react"

const Navbar = () => {

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
            <nav className="center-flex px-4 md:px-[40px] w-screen py-3 bg-black transition-all relative">
                <div className="flex items-center max-w-[var(--max-width)] w-full relative">
                    <div className="center-flex">
                        <Image
                            src="/assets/logo.png"
                            width={50}
                            height={50}
                            alt="new-film-logo"
                            priority={true}
                        />
                        <h1 className="ml-1 mr-10 font-bold text-2xl main-gradient bg-clip-text text-transparent pr-[5px]"><i>NewFilm</i></h1>
                        <ul className="hidden gap-5 sm:center-flex">
                            <li><a href="#" className="nav-link">Home</a></li>
                            <li><a href="#" className="nav-link">Movies</a></li>
                            <li><a href="#" className="nav-link">TV Shows</a></li>
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
                                <ul className="bg-black flex-col flex absolute top-[60px] right-[-15px] w-[100px] mobile-menu sm:hidden items-end rounded gap-1 p-3">
                                    <li><a href="#" className="nav-link">Home</a></li>
                                    <li><a href="#" className="nav-link">Movies</a></li>
                                    <li><a href="#" className="nav-link">TV Shows</a></li>
                                    <li><a href="#" className="nav-link">Login</a></li>
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
                        <li><a href="#" className="nav-link">Login</a></li>
                    </ul>
                </div>
                {searchOpen && <Search open={searchOpen} />}
            </nav>
        </header>
    )
}

export default Navbar
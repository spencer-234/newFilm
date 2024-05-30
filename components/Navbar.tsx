import Image from "next/image"

const Navbar = () => {
    return (
        <nav className="flex-center px-4 md:px-[40px] w-screen py-3 bg-black transition-all">
            <div className="flex items-center justify-between">
                <div className="center-flex max-w-[1200px]">
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
                <ul className="center-flex gap-5">
                    <li>
                        <Image
                            src="/assets/search.svg"
                            width={25}
                            height={25}
                            priority={true}
                            alt="search-icon"
                            className="cursor-pointer"
                        />
                    </li>
                    <li><a href="#" className="nav-link">Login</a></li>
                    <li><a href="#" className="nav-link">Sign Up</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="w-screen flex bg-[#313131] relative pt-32 pb-14 text-sm lg:text-lg">
            <div className="second-wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="flex-1 center-flex flex-col gap-5 px-2">
                <p className="text-center">
                    Movie data is acquired through the use of the <Link href="https://developer.themoviedb.org/docs/getting-started" rel="noopener noreferrer" className="option">TMDB API</Link>
                </p>
                <Image
                    src="/assets/tmdb.svg"
                    alt="tmdb-logo"
                    width={0}
                    height={0}
                    priority={true}
                    sizes="100vw"
                    className="h-auto w-[30vw] max-w-[200px]"
                />
            </div>
            <ul className="flex-1 flex justify-center">
                <li className="center-flex h-fit">
                    <Image
                        src="/assets/github.svg"
                        alt="github-logo"
                        height={40}
                        width={40}
                        priority={true}
                    />
                    <Link href="https://github.com/spencer-234" rel="noopener noreferrer" className="option">spencer-234</Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
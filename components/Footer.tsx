import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="w-screen center-flex flex-col gap-4 py-5">
            <p>&copy; Copyright NewFilm 2024 <Link href="https://github.com/spencer-234" rel="noopener noreferrer" className="option">spencer-234</Link></p>
            <p className="text-center">
                Movie data is acquired through the use of the <Link href="https://developer.themoviedb.org/docs/getting-started" rel="noopener noreferrer" className="option">TMDB API</Link>
            </p>
            <Image
                src="/assets/tmdb.svg"
                alt="tmdb-logo"
                width={50}
                height={50}
            />
        </footer>
    )
}

export default Footer
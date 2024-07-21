import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

interface Props {
    setMenuOpen: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({ setMenuOpen }: Props) => {

    const { data: session } = useSession();

    return (
        <nav className="w-[50%] absolute top-0 bg-black sm:hidden h-screen flex items-end flex-col p-4 pl-5 min-w-[250px] right-[-600px] open-mobile border-l-2 border-[#07FFFF]">
            <Image
                src={"/assets/close.svg"}
                width={40}
                height={40}
                priority={true}
                alt="close-menu"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
            />
            <ul className="w-full flex flex-col items-end text-lg font-semibold gap-6 mt-8">
                <li className="sidebar-link"><Link href="#" className="option" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li className="sidebar-link"><Link href="#" className="option" onClick={() => setMenuOpen(false)}>Movies</Link></li>
                <li className="sidebar-link"><Link href="#" className="option" onClick={() => setMenuOpen(false)}>TV Shows</Link></li>
                {session?.user ? (
                    <>
                        <li className="sidebar-link"><Link href="#" className="option" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                        <li className="sidebar-link"><span onClick={() => signOut()} className="option">Sign Out</span></li>
                    </>
                ) : (
                    <li className="sidebar-link"><Link href="/login" className="option" onClick={() => setMenuOpen(false)}>Login</Link></li>
                )}
            </ul>
        </nav>
    )
}

export default Sidebar
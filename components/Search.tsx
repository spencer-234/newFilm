"use client"

import { useState } from "react"
import { useEffect } from "react"

interface Props {
    open: boolean
}


const Search = ({ open }: Props) => {
    const [input, setInput] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    useEffect(() => {

        const timer = setTimeout(async () => {
            await fetch(`/api/get-media/search?query=${input}`, { cache: 'no-store' })
                .then((res) => res.json())
                .then(data => setSearchResults(data.data));
        }, 600)

        return () => {
            clearTimeout(timer)
        }

    }, [input])

    return (
        <div className={`max-w-[600px] bg-black ${open && "search-open-animation"} top-[70px] 2xl:top-[20px] absolute center-flex flex-col rounded-lg`}>
            <input
                type="text"
                placeholder="Search for movies or tv shows..."
                className="w-full rounded-3xl px-3 py-1"
                onChange={(e) => setInput(e.target.value)}
            />
            {searchResults && searchResults.map((result, i) => (
                <p
                    key={i}
                    className="w-full text-start px-3 py-[6px] cursor-pointer hover:bg-slate-700"
                >
                    {result}
                </p>
            ))}
        </div>
    )
}

export default Search
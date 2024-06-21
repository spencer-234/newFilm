"use client"

import { useDebounce } from "@/hooks/useDebounce"
import { useState, useEffect } from "react"
import { SearchResult } from "@/typings"
import Link from "next/link"
import Image from "next/image"
import { imageUrl } from "@/utils/urlConstants"

interface Props {
    open: boolean
}


const Search = ({ open }: Props) => {
    const [input, setInput] = useState<string>("");
    const debouncedInput = useDebounce(input);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    console.log(searchResults);

    useEffect(() => {
        if (debouncedInput) {
            const fetchSearchResults = async () => {
                await fetch(`/api/get-media/search?query=${debouncedInput}`, { cache: 'no-store' })
                    .then((res) => res.json())
                    .then(data => setSearchResults(data.data));
            }

            fetchSearchResults()
        } else {
            setSearchResults([]);
        }

    }, [debouncedInput])

    return (
        <div className={`max-w-[600px] bg-black ${open && "search-open-animation"} top-[70px] 2xl:top-[20px] absolute center-flex flex-col rounded-lg`}>
            <input
                type="text"
                placeholder="Search for movies or tv shows..."
                className="w-full rounded-3xl px-3 py-1"
                onChange={(e) => setInput(e.target.value)}
            />
            <div className="w-full max-h-[500px] overflow-y-scroll custom-scroll-vertical">
                {searchResults && searchResults.map((result, i) => (
                    <Link
                        key={i}
                        href={`/${result.type}/${result.id}`}
                        className="w-full justify-between px-3 py-[6px] cursor-pointer hover:bg-slate-700 center-flex"
                    >
                        <p className="w-[70%]">
                            {result.title},{" "}
                            <span className=" text-gray-400">{result.release_date?.split('-')[0]}</span>
                        </p>
                        <Image
                            src={`${imageUrl + result.poster_path}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt={`${result.title}-poster`}
                            className="w-[10%] h-auto"
                            priority={true}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Search
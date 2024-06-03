"use client"

import Image from "next/image";
import { imageUrl } from "@/utils/imageUrl";
import { Movie } from "@/typings";
import { useState } from "react";

interface Props {
    media: Movie[]
}

const Trending = ({ media }: Props) => {

    const [currentMovie, setCurrentMovie] = useState<number>(0);

    // function to go to next or previous movie
    const slideMovie = (direction: string) => {
        if (direction === 'next' && currentMovie < 18) {
            setCurrentMovie(currentMovie + 1);
        }
        if (direction === 'prev' && currentMovie > 0) {
            setCurrentMovie(currentMovie - 1);
        }
    }

    return (
        <section className="w-screen h-[500px] relative center-flex">
            <Image
                src={`${imageUrl + media[currentMovie].backdrop_path}`}
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: "0 10%" }}
                alt={`${media[currentMovie].title}-backdrop`}
                priority={true}
            />
            <Image
                src="/assets/arrow.svg"
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: '50px', height: 'auto', position: 'absolute', left: '0', zIndex: "2", cursor: 'pointer' }}
                alt="previous-trending-movie"
                onClick={() => slideMovie("prev")}
            />
            <div className="absolute w-full h-full bg-[#141414] pl-[300px] pt-[30px] bg-opacity-80">
                <h2 className="font-extrabold text-2xl tracking-wider mb-5">Trending</h2>
                <div className="flex gap-8">
                    <Image
                        src={`${imageUrl + media[currentMovie].poster_path}`}
                        width={250}
                        height={450}
                        style={{ borderRadius: '5px' }}
                        alt={`${media[currentMovie].title}-poster`}
                        priority={true}
                    />
                    <div>
                        <h3 className="font-bold text-3xl mb-3">{media[currentMovie].title}</h3>
                        <p className="w-[700px] text-xl">{media[currentMovie].overview}</p>
                    </div>
                </div>
            </div>
            <Image
                src="/assets/arrow.svg"
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: '50px', height: 'auto', position: 'absolute', right: '0', zIndex: "2", cursor: 'pointer', rotate: '180deg' }}
                alt="next-trending-movie"
                onClick={() => slideMovie("next")}
            />
        </section>
    )
}

export default Trending
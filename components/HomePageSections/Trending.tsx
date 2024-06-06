"use client"

import Image from "next/image";
import { imageUrl } from "@/utils/urlConstants";
import { useState } from "react";
import { HomeProps } from "@/typings";

const Trending = ({ media }: HomeProps) => {

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
            <div className="wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
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
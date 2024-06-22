"use client"

import { MediaImage, Movie } from "@/typings";
import { imageUrl } from "@/utils/urlConstants";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { fetchTitleImages } from "@/utils/fetchTitleImages";

interface Props {
    media: Movie[]
}

const Trending = ({ media }: Props) => {

    const [movieImageData, setMovieImageData] = useState<Array<MediaImage[]> | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);

    // initialize variables for slider
    let width: number = 0;
    let translate: string;
    let counter: number = 1;
    let flagforReverse: boolean = false;

    useEffect(() => {
        // fetch all images associated with movies
        const getTitleLogos = async () => {
            const res = await fetchTitleImages(media, "movie");
            setMovieImageData([...res]);
        }

        getTitleLogos();

        // start interval for slideshow of movies
        // have if statements to check if zero or length and translateX + or - depending on each
        const interval = setInterval(() => {
            if (imageRef.current?.offsetWidth && containerRef.current) {
                width = imageRef.current.offsetWidth;
                if (counter === 1) {
                    flagforReverse = false;
                    translate = `translateX(-${width}px)`;
                }
                if (counter === media.length) {
                    flagforReverse = true;
                    translate = `translateX(${width}px)`;
                }
                if (!flagforReverse) {
                    counter++;
                }
                if (flagforReverse) {
                    counter--;
                }

                containerRef.current.style.transform += translate;
            }
        }, 7000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <>
            <section className={`w-screen h-[400px] relative bg-[#161616] ${!movieImageData && 'animate-pulse'} overflow-hidden`}>
                <h2 className="section-title">Trending</h2>
                {movieImageData && (
                    <div className="h-full w-fit flex duration-1000" ref={containerRef}>
                        {media.map((movie, i) => (
                            <div className="relative w-screen h-full" key={i} ref={imageRef}>
                                <Image
                                    src={`${imageUrl + movie.backdrop_path}`}
                                    className="w-full h-full object-cover object-center lg:object-custom-top 2xl:object-custom-lg"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt={`${media[i].title}`}
                                />
                                {movieImageData[i].length > 0 &&
                                    <Image
                                        src={`${imageUrl + movieImageData[i][0].file_path}`}
                                        className="w-[90%] h-[30%] absolute bottom-20 left-5 right-auto sm:w-[60%] lg:left-10 max-w-[600px] rounded-lg"
                                        alt={`${media[i].title}`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                    />
                                }
                            </div>
                        ))}
                    </div>
                )}
                <div className="wave">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section>
        </>
    )
}

export default Trending
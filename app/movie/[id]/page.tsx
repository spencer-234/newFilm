"use client"

import Image from "next/image";
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Movie } from "@/typings";
import { imageUrl } from "@/utils/urlConstants";

const MoviePage = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);

    console.log(movie);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await fetch('/api/get-media', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: id,
                        type: 'movie'
                    })
                }).then(res => res.json());

                setMovie({ ...res.data });
            } catch (err) {
                throw err;
            }
        }

        getMovie();
    }, [])

    return (
        <>
            {movie ?
                (
                    <>
                        <section className="w-screen relative pb-20">
                            <div className="max-h-[400px] overflow-hidden mb-16">
                                <Image
                                    src={imageUrl + movie?.backdrop_path}
                                    alt={`${movie?.title}-backdrop`}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-screen h-auto blur-[2px]"
                                />
                            </div>
                            <Image
                                src={imageUrl + movie?.poster_path}
                                alt={`${movie?.title}-poster`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-[40%] h-auto rounded-lg absolute top-10 left-5 max-w-[300px] md:left-[5vw] 2xl:left-[17vw]"
                            />
                            <div className="w-full px-4 flex flex-col gap-4 max-w-[var(--max-width)] md:m-auto md:mt-[100px] md:text-xl">
                                <h2 className="font-bold text-xl md:text-2xl">{movie?.title}, <span className="text-gray-500 text-sm">{movie.release_date?.split("-")[0]}</span></h2>
                                {movie.tagline && <span className="italic">&quot;{movie.tagline}&quot;</span>}
                                <h3 className="text-lg border-b-2 pb-1 md:text-2xl max-w-[1000px]">Overview</h3>
                                <p className="h-[150px] overflow-y-scroll custom-scroll-vertical">{movie?.overview}</p>
                            </div>
                            <div className="third-wave">
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                                </svg>
                            </div>
                        </section>
                        {/* Cast Section */}
                        <section className="bg-black w-screen p-5 relative pb-10 md:flex flex-col items-center">
                            <div>
                                <h3 className="text-lg border-b-2 pb-1 mb-5 md:text-2xl max-w-[1000px] w-full text-start">Cast</h3>
                                <div className="flex overflow-x-scroll custom-scroll-horizontal gap-5 pb-5 mb-10 max-w-[var(--max-width)]">
                                    {movie.credits?.cast.slice(0, 20).map((actor, i) => (
                                        <div key={i} className="flex-shrink-0 flex flex-col items-center">
                                            <Image
                                                src={imageUrl + actor.profile_path}
                                                alt={`${actor.name}-picture`}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-[100px] h-auto rounded-lg"
                                            />
                                            <p className="text-center w-[90%]">{actor.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="third-wave">
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill-two"></path>
                                </svg>
                            </div>
                        </section>
                        {/* Video Section*/}
                        <section className="w-screen p-5 pb-10">
                            <div className="max-w-[var(--max-width)] md:mx-auto">
                                <h3 className="text-lg border-b-2 pb-1 mb-5 md:text-2xl max-w-[1000px]">Videos</h3>
                                <div className="flex overflow-x-scroll custom-scroll-horizontal gap-5 pb-3">
                                    {movie.videos?.results.map((video, i) => (
                                        <div className="rounded-lg w-[350px] h-fit flex-shrink-0" key={i}>
                                            <iframe
                                                className="w-full h-auto"
                                                src={`https://www.youtube.com/embed/${video.key}?`}
                                                title={`${video.name}`}
                                                allowFullScreen
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                )
                : (
                    <section className="w-screen center-flex h-[500px]">
                        <Image
                            src='/assets/loading.gif'
                            width={50}
                            height={50}
                            alt="loading"
                            unoptimized
                            style={{ alignSelf: 'center' }}
                        />
                    </section>
                )
            }
        </>
    )
}

export default MoviePage
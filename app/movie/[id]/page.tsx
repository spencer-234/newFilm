"use client"

import Image from "next/image";
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Movie } from "@/typings";
import { imageUrl } from "@/utils/urlConstants";
import { useSession } from "next-auth/react";
import CastSlider from "@/components/CastSlider";
import VideoSlider from "@/components/VideoSlider";

const MoviePage = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

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

    console.log(movie);

    return (
        (
            <>
                {status === 'loading' ? (
                    <section className="w-screen h-[300px] animate-pulse bg-zinc-800">
                    </section>
                ) : status === 'authenticated' ? (
                    <>
                        <section className="w-screen">
                            <div className={`${!movie ? 'animate-pulse bg-zinc-800' : 'home-gradient'} w-screen h-[300px] xl:h-[400px] overflow-hidden relative`}>
                                {movie && (
                                    <Image
                                        src={imageUrl + movie.backdrop_path}
                                        alt={`${movie.title}-backdrop`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="h-full w-full sm:w-full sm:h-auto min-w-[200px] absolute top-0 left-0 z-[-1] lg:top-[-40px] 2xl:top-[-200px]"
                                    />
                                )}
                            </div>
                            {movie && (
                                <div className="mt-8 px-6 flex gap-8 max-w-[var(--max-width)] md:ml-auto md:mr-auto">
                                    <div className="flex flex-col gap-3 flex-1">
                                        <h2 className="fade-in text-3xl font-bold md:text-5xl">{movie.title} <span className="font-medium text-base text-gray-500">{movie.release_date?.split("-")[0]}</span></h2>
                                        <div>
                                            {movie.genres.map((genre, i) => (
                                                <span className="italic text-gray-500" key={i}>
                                                    {(movie.genres.length - 1) === i ? `${genre.name}` : `${genre.name}, `}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="pb-2 border-b border-gray-500">
                                            <span className="text-xl md:text-2xl">Overview</span>
                                        </div>
                                        {movie.overview ? (
                                            <p className="max-h-[200px] overflow-y-scroll custom-scroll-vertical md:text-xl">{movie.overview}</p>
                                        ) : (
                                            <span className="text-xl">No information available</span>
                                        )}
                                    </div>
                                    {movie.poster_path && (
                                        <Image
                                            src={imageUrl + movie.poster_path}
                                            alt={`${movie.title}-poster`}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="hidden md:block md:flex-2 w-[250px] h-auto rounded-lg border border-gray-300"
                                        />
                                    )}
                                </div>
                            )}
                        </section>
                        <section className="w-screen px-4 py-10 md:ml-auto md:mr-auto max-w-[var(--max-width)]">
                            {movie?.credits && (
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-semibold pb-2 w-full text-start border-b border-gray-500 mb-8">Cast</h3>
                                    {movie.credits.cast.length > 0 ? (
                                        <CastSlider cast={movie.credits.cast} />
                                    ) : (
                                        <span className="text-xl">No information available</span>
                                    )}
                                </div>
                            )}
                        </section>
                        <section className="w-screen px-4 py-10 md:ml-auto md:mr-auto max-w-[var(--max-width)]">
                            {movie?.videos && (
                                <div>
                                    <h3 className="text-2xl md:text-4xl font-semibold pb-2 w-full text-start border-b border-gray-500 mb-8">Videos</h3>
                                    {movie.videos.results.length > 0 ? (
                                        <VideoSlider videos={movie.videos.results} />
                                    ) : (
                                        <span className="text-xl">No information available</span>
                                    )}
                                </div>
                            )}
                        </section>
                    </>
                )
                    : router.push("/login")
                }
            </>
        )
    )
}

export default MoviePage
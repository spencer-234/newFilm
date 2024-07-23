"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Series } from "@/typings"
import { imageUrl } from "@/utils/urlConstants"
import Image from "next/image"
import { useSession } from "next-auth/react"
import CastSlider from "@/components/CastSlider"
import VideoSlider from "@/components/VideoSlider"

const TvPage = () => {

    const { id } = useParams();
    const [series, setSeries] = useState<Series | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [season, setSeason] = useState<number>(0);

    useEffect(() => {
        const getSeries = async () => {
            try {
                const res = await fetch('/api/get-media', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: id,
                        type: 'tv'
                    })
                }).then(res => res.json());

                setSeries({ ...res.data });
            } catch (err) {
                throw err;
            }
        }

        getSeries();
    }, [])

    useEffect(() => {
        if (series) {
            if (series.seasons[0].name === "Specials") {
                setSeason(1);
            }
        }
    }, [series])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const index = series?.seasons.findIndex(season => season.name === e.target.value);
        if (index) {
            setSeason(index);
        }
    }

    console.log(series);

    return (
        <>
            {status === 'loading' ? (
                <section className="w-screen h-[300px] animate-pulse bg-zinc-800">
                </section>
            ) : status === 'authenticated' ? (
                <>
                    <section className="w-screen">
                        <div className={`${!series ? 'animate-pulse bg-zinc-800' : 'home-gradient'} w-screen h-[300px] xl:h-[400px] overflow-hidden relative`}>
                            {series && (
                                <Image
                                    src={imageUrl + series.backdrop_path}
                                    alt={`${series.name}-backdrop`}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="h-full w-full sm:w-full sm:h-auto min-w-[200px] absolute top-0 left-0 z-[-1] lg:top-[-40px] 2xl:top-[-200px]"
                                />
                            )}
                        </div>
                        {series && (
                            <div className="mt-8 px-6 flex gap-8 max-w-[var(--max-width)] md:ml-auto md:mr-auto">
                                <div className="flex flex-col gap-3 flex-1">
                                    <h2 className="fade-in text-3xl font-bold md:text-5xl">{series.name} <span className="font-medium text-base text-gray-500">{series.first_air_date.split("-")[0]}</span></h2>
                                    <div>
                                        {series.genres.map((genre, i) => (
                                            <span className="italic text-gray-500" key={i}>
                                                {(series.genres.length - 1) === i ? `${genre.name}` : `${genre.name}, `}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="pb-2 border-b border-gray-500 flex gap-3 justify-between">
                                        <span className="text-xl md:text-2xl">Overview</span>
                                        <select className="bg-black border-white border-2 rounded-lg" value={series.seasons[season].name} onChange={(e) => handleChange(e)}>
                                            {series.seasons.map((seriesSeason, i) => (
                                                <option
                                                    key={i}
                                                >
                                                    {seriesSeason.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {series.seasons[season].overview ? (
                                        <p className="max-h-[200px] overflow-y-scroll custom-scroll-vertical md:text-xl">{series.seasons[season].overview}</p>
                                    ) : (
                                        <span className="text-xl">No information available</span>
                                    )}
                                </div>
                                {series.seasons[season].poster_path && (
                                    <Image
                                        src={imageUrl + series.seasons[season].poster_path}
                                        alt={`${series.name}-poster`}
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
                        {series?.credits && (
                            <div>
                                <h3 className="text-2xl md:text-4xl font-semibold pb-2 w-full text-start border-b border-gray-500 mb-8">Cast</h3>
                                {series.credits.cast.length > 0 ? (
                                    <CastSlider cast={series.credits.cast} />
                                ) : (
                                    <span className="text-xl">No information available</span>
                                )}
                            </div>
                        )}
                    </section>
                    <section className="w-screen px-4 py-10 md:ml-auto md:mr-auto max-w-[var(--max-width)]">
                        {series?.videos && (
                            <div>
                                <h3 className="text-2xl md:text-4xl font-semibold pb-2 w-full text-start border-b border-gray-500 mb-8">Videos</h3>
                                {series.videos.results.length > 0 ? (
                                    <VideoSlider videos={series.videos.results} />
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
}

export default TvPage
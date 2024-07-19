import Image from "next/image"
import { Movie, MediaImage, Video } from "@/typings"
import { fetchTitleImages } from "@/utils/fetchTitleImages"
import { useEffect, useState } from "react"
import { imageUrl } from "@/utils/urlConstants"
import Link from "next/link"
import { fetchVideos } from "@/utils/fetchVideos"
import { useDebounce } from "@/hooks/useDebounce"


interface Props {
    media: Movie[]
    type: string
}

// Height is determined by parent div
const Slider = ({ media, type }: Props) => {

    const [movieImageData, setMovieImageData] = useState<Array<MediaImage[]> | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const debouncedId = useDebounce(hovered, 1000);
    const [videoData, setVideoData] = useState<Video[] | null>(null);

    // initial useEffect to fetch title logos
    useEffect(() => {
        const getMovieLogos = async () => {
            const res = await fetchTitleImages(media, type);
            setMovieImageData([...res]);
        }

        getMovieLogos();
    }, [media]);

    // useEffect to fetch videos after hovering for a period of time
    useEffect(() => {
        if (debouncedId !== null) {
            setVideoData(null);
            const fetchTrailer = async (id: number) => {
                const res: Video[] = await fetchVideos(id, type);
                let trailers = res.filter(video => video.type === 'Trailer' && video.official === true);
                setVideoData([...trailers]);
            }
            fetchTrailer(debouncedId);
        }

    }, [debouncedId])

    return (
        <div className="flex gap-4 h-full overflow-x-scroll custom-scroll-horizontal">
            {movieImageData
                ? media.map((movie: Movie, i: number) => (
                    <Link
                        className="shrink-0 relative w-fit"
                        href={`/${type}/${movie.id}`}
                        key={i}
                        onMouseEnter={() => setHovered(movie.id)}
                        onMouseLeave={() => setHovered(null)}>
                        {debouncedId === movie.id && hovered
                            ? (
                                <div className="w-[410px] h-full center-flex">
                                    {!videoData
                                        ? (
                                            <Image
                                                src="/assets/loading.gif"
                                                width={50}
                                                height={50}
                                                alt="loading"
                                                priority={true}
                                                unoptimized={true}
                                            />
                                        )
                                        : (
                                            <iframe
                                                className="w-full h-full z-[-1]"
                                                src={videoData.length > 0 ? `https://www.youtube.com/embed/${videoData[0].key}?autoplay=1&mute=1&controls=0` : "https://giphy.com/embed/l4FGk9V8Re8b3gNVu"}
                                                title={`${movie.title}-trailer`}
                                                allowFullScreen
                                            />
                                        )
                                    }
                                </div>
                            )
                            : (
                                <>
                                    <Image
                                        src={`${imageUrl + movie.backdrop_path}`}
                                        alt={`${movie.title}`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-auto h-full rounded-lg"
                                    />
                                    <Image
                                        src={movieImageData[i][0] && `${imageUrl + movieImageData[i][0].file_path}`}
                                        alt={`${movie.title}`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-[40%] h-auto absolute left-8 bottom-3"
                                    />
                                </>
                            )
                        }
                    </Link>
                ))
                : media.map((movie, i) => (
                    <div key={i} className="w-[360px] h-full animate-pulse bg-[#2f2f2f] flex-shrink-0">
                    </div>
                ))
            }
        </div>
    )
}

export default Slider;
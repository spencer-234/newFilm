import Image from "next/image"
import { Movie, MediaImage, Video } from "@/typings"
import { fetchTitleImages } from "@/utils/fetchTitleImages"
import { useEffect, useState } from "react"
import { imageUrl } from "@/utils/urlConstants"
import Link from "next/link"
import { fetchVideos } from "@/utils/fetchVideos"


interface Props {
    media: Movie[]
    type: string
}

const Slider = ({ media, type }: Props) => {

    const [movieImageData, setMovieImageData] = useState<Array<MediaImage[]> | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const [videoData, setVideoData] = useState<Video[] | null>(null);

    // function to fetch trailer
    const getVideo = async (id?: number | null) => {
        setVideoData(null);
        if (id) {
            setHovered(id);
            const res: Video[] = await fetchVideos(id, type);
            let trailers = res.filter(video => video.type === 'Trailer');
            setVideoData([...trailers]);
        } else {
            setHovered(null);
        }
    }

    useEffect(() => {
        const getMovieLogos = async () => {
            const res = await fetchTitleImages(`/api/get-media/title-logos`, media);
            setMovieImageData([...res]);
        }

        getMovieLogos();
    }, [media]);
    return (
        <div className="flex gap-4 h-full overflow-x-scroll no-scroll-horizontal">
            {movieImageData
                ? media.map((movie: Movie, i: number) => (
                    <Link
                        className="shrink-0 relative w-fit"
                        href={`/media/${movie.id}`}
                        key={i}
                        onMouseEnter={() => getVideo(movie.id)}
                        onMouseLeave={() => setHovered(null)}>
                        {hovered === movie.id
                            ? (
                                <div className="w-[360px] h-full center-flex">
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
                                                className="w=-full h-full"
                                                src={`https://www.youtube.com/embed/${videoData[0].key}`}
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
                                        src={`${imageUrl + movieImageData[i][0].file_path}`}
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
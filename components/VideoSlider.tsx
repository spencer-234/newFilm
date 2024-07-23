import { Video } from "@/typings"

const VideoSlider = ({ videos }: { videos: Video[] }) => {
    return (
        <div className="flex overflow-y-scroll custom-scroll-horizontal gap-3 pb-3">
            {videos.map((video, i) => (
                <div className="rounded-lg w-[300px] md:w-[350px] h-fit flex-shrink-0 overflow-hidden" key={i}>
                    <iframe
                        className="w-full h-auto"
                        src={`https://www.youtube.com/embed/${video.key}?`}
                        title={`${video.name}`}
                        allowFullScreen
                    />
                </div>
            ))}
        </div>
    )
}

export default VideoSlider
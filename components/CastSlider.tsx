import { Person } from "@/typings"
import Image from "next/image"
import { imageUrl } from "@/utils/urlConstants"

const CastSlider = ({ cast }: { cast: Person[] }) => {
    return (
        <div className="flex overflow-y-scroll custom-scroll-horizontal gap-3">
            {cast.map((person, i) => (
                <div className="w-[200px] flex-shrink-0 items-center flex flex-col text-center" key={i}>
                    <Image
                        src={imageUrl + person.profile_path}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[150px] h-auto rounded-lg"
                        alt={`${person.name}-profile-photo`}
                    />
                    <span className="font-semibold">{person.name}</span>
                    {person.character && (
                        <>
                            <span>as</span>
                            <span className="font-semibold">{person.character}</span>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CastSlider
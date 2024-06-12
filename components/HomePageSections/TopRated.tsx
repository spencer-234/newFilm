import Image from "next/image"
import { Movie } from "@/typings"

interface Props {
    media: Movie[]
}

const TopRated = ({ media }: Props) => {
    return (
        <div>TopRated</div>
    )
}

export default TopRated
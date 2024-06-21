import { Movie } from "@/typings";
import { imageUrl } from "@/utils/urlConstants";
import Image from "next/image";

interface Props {
    movies: Movie[] | undefined,
}

const MainSlider = ({ movies }: Props) => {
    const randomInts: number[] = [];

    for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * (20));
        while (randomInts.includes(random)) {
            random = Math.floor(Math.random() * (20));
        }
        randomInts.push(random);
    }

    return (
        <section className="flex items-center justify-center">
            {movies ? (
                randomInts.map((i) => (
                    <Image
                        src={`${imageUrl}${movies[i].poster_path}`} key={i}
                        width={300}
                        height={500}
                        alt={`${movies[i].name}-poster`}
                    />
                ))
            ) :
                <span>Loading...</span>
            }
        </section>
    )
}

export default MainSlider
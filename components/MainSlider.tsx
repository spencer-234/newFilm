import { Movie } from "@/typings";
import { baseUrl } from "@/utils/baseUrl";
import Image from "next/image";

interface Props {
    movies: Movie[] | undefined,
}

const MainSlider = ({ movies }: Props) => {
    const randomInts: number[] = [];
    console.log(movies);

    for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * (20));
        while (randomInts.includes(random)) {
            random = Math.floor(Math.random() * (20));
        }
        randomInts.push(random);
    }
    console.log(randomInts);

    return (
        <section className="flex items-center justify-center">
            {movies ? (
                randomInts.map((i) => (
                    <Image
                        src={`${baseUrl}${movies[i].poster_path}`} key={i}
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
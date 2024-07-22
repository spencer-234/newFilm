import { Movie } from "@/typings"
import { imageUrl } from "@/utils/urlConstants"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const Slider = ({ movies, type }: { movies: Movie[], type: string }) => {

    // varibale for active movie in list
    const [active, setActive] = useState<number>(Math.floor(movies.length / 2));

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [children, setChildren] = useState<HTMLElement[] | null>(null);

    // function to convert childnodes of container ref to html elements
    const convertNodes = (container: NodeListOf<ChildNode>) => {
        let i = container?.length - 1;
        const children: ChildNode[] = [];

        while (i >= 0) {
            if (container[i].nodeType == 1) {
                children.unshift(container[i]);
            }
            i--;
        }
        return children as HTMLElement[];
    }

    // function to slide movies using styles applied dynamically
    const styleMovies = (children: HTMLElement[]) => {
        children[active].style.transform = 'none';
        children[active].style.zIndex = '1';
        children[active].style.filter = 'none';
        children[active].style.opacity = '1';

        let stt = 0;
        for (let i = active + 1; i < children.length; i++) {
            stt++;
            children[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
            children[i].style.zIndex = `-${stt}`;
            children[i].style.filter = 'blur(5px)';
            children[i].style.opacity = `${stt > 2 ? 0 : 0.6}`;
        }
        stt = 0;
        for (let i = active - 1; i >= 0; i--) {
            stt++;
            children[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
            children[i].style.zIndex = `-${stt}`;
            children[i].style.filter = 'blur(5px)';
            children[i].style.opacity = `${stt > 2 ? 0 : 0.6}`;
        }
    }

    // function to determine wich direction to slide movies
    const handleSlide = (direction: string) => {
        if (children) {
            if (direction === 'next' && (active + 1 < movies.length)) {
                setActive(active + 1);
            } else if (direction === 'prev' && (active - 1 >= 0)) {
                setActive(active - 1);
            }
            styleMovies(children);
        }
    }

    useEffect(() => {
        const getChildren = () => {
            if (containerRef.current?.childNodes) {
                let children = convertNodes(containerRef.current.childNodes);
                setChildren([...children]);
                styleMovies([...children]);
            }
        }

        getChildren();

    }, [])

    return (
        <>
            <div className="flex overflow-hidden h-full relative" ref={containerRef}>
                {movies.map((movie, i) => (
                    <div className="flex-shrink-0 duration-500 rounded-lg overflow-hidden absolute left-[calc(50%-110px)]" key={i}>
                        <Image
                            src={imageUrl + movie.poster_path}
                            height={370}
                            width={200}
                            alt={`${type === 'movie' ? movie.title : movie.name}-poster`}
                        />
                    </div>
                ))}
            </div>
            <button className="slider-btn right-[50px]" onClick={() => handleSlide("next")}>{">"}</button>
            <button className="slider-btn left-[50px]" onClick={() => handleSlide("prev")}>{"<"}</button>
        </>
    )
}

export default Slider
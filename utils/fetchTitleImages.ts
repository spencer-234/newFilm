import { Movie } from "@/typings";

export const fetchTitleImages = async (media: Movie[], type: string) => {
    const movieIds = media.map(movie => movie.id);
    const res = await fetch('/api/get-media/title-logos', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            ids: movieIds,
            type: type
        })
    })
        .then(res => res.json())
        .then(data => data.data)
        .catch(err => {
            throw new Error('Failed to fetch movie images');
        })

    return res;
}
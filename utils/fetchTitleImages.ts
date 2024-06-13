import { Movie } from "@/typings";

export const fetchTitleImages = async (url: string, media: Movie[]) => {
    const movieIds = media.map(movie => movie.id);
    const res = await fetch(url, { method: 'POST', cache: 'no-store', body: JSON.stringify(movieIds) })
        .then(res => res.json())
        .then(data => data.data)
        .catch(err => {
            throw new Error('Failed to fetch movie images');
        })

    return res;
}
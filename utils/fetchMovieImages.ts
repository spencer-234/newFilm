export const fetchMovieImages = async (url: string, ids: number[]) => {
    const res = await fetch(url, { method: 'POST', cache: 'no-store', body: JSON.stringify(ids) })
        .then(res => res.json())
        .then(data => data.data)
        .catch(err => {
            throw new Error('Failed to fetch movie images');
        })

    return res;
}
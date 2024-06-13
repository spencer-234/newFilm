// type must be 'movie' or 'tv'

export const fetchVideos = async (id: number, type: string) => {
    const res = await fetch('/api/get-media/videos', {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            type: type
        })
    })
        .then(res => res.json())
        .then(data => data.data.results)
        .catch(err => {
            throw new Error('Failed to fetch videos');
        })

    return res;
}
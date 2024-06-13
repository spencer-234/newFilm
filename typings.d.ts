export interface Movie {
    title: string
    backdrop_path: string
    media_type?: string
    release_date?: string
    first_air_date: string
    genre_ids: number[]
    id: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
    name: string
}

export interface MediaImageObject {
    backdrops: MediaImage[]
    id: number
    logos: MediaImage[]
    posters: MediaImage[]
}

export interface MediaImage {
    aspect_ratio: number
    height: number
    iso_639_1?: string
    file_path: string
}

export interface Video {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}
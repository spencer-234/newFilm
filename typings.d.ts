export interface Movie {
    title: string
    backdrop_path: string
    media_type?: string
    release_date?: string
    first_air_date: string
    genres: Genre[]
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
    videos?: {
        results: Video[]
    }
    tagline?: string
    credits?: {
        cast: Person[]
        crew: Person[]
    }
}

export interface Series extends Movie {
    seasons: Season[]
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

export interface HomeMedia {
    trending: Movie[]
    topRated: Movie[]
    topRatedTv: Movie[]
}

export interface User {
    id: number
    email: string
    profilePicture?: string
    firstName: string
    lastName: string
    password: string
}

export interface SearchResult {
    id: number
    title: string
    poster_path: string
    release_date: string | undefined
    type: string
}

export interface Person {
    id: number
    name: string
    profile_path: string
    known_for_department: string
}

interface Genre {
    id: number
    name: string
}

interface Company {
    id: number
    logo_path: string
    name: string
}

interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
}
"use client"

import { Movie } from "@/typings";
import { useState, useEffect } from "react";
import { fetchHomeData } from "@/utils/home-page-fetch/fetchHomeData";
import Image from "next/image";
import Trending from "@/components/HomePageSections/Trending";

interface MediaList {
  trending: Movie[],
  topRated: Movie[],
  upcoming: Movie[],
}

export default function Home() {

  const [homeMedia, setHomeMedia] = useState<MediaList | null>(null);

  useEffect(() => {
    const getHomeMedia = async () => {
      const data = await fetchHomeData();
      setHomeMedia({ ...data });
    }

    getHomeMedia();
  }, [])

  return (
    <>
      <section className="w-screen h-[500px] center-flex flex-col overflow-hidden relative">
        <h2 className="font-extrabold text-2xl">Welcome to <i className="main-gradient bg-clip-text text-transparent pr-1">NewFilm</i></h2>
        <p>Your unique media experience to rate and favorite movies</p>
        <div>
          <a href="#">Login</a>
          <a href="#">Sign Up</a>
        </div>
      </section>

      {/* {homeMedia
        ? (
          <>
            <Trending media={homeMedia.trending} />
          </>
        )
        : (
          <section className="w-screen center-flex h-[500px]">
            <Image
              src='/assets/loading.gif'
              width={50}
              height={50}
              alt="loading"
              unoptimized
              style={{ alignSelf: 'center' }}
            />
          </section>
        )
      } */}
    </>
  );
} 
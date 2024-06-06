"use client"

import { Movie } from "@/typings";
import { useState, useEffect } from "react";
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
      const data = await fetch("/api/get-media/home", { method: 'GET', cache: 'no-store' })
        .then(res => res.json());

      setHomeMedia({ ...data.data });
    }

    getHomeMedia();
  }, [])

  return (
    <>
      <section className="w-screen h-[500px] center-flex flex-col gap-3 text-center">
        <h2 className="font-extrabold text-2xl">Welcome to <i className="main-gradient bg-clip-text text-transparent pr-1">NewFilm</i></h2>
        <p className="text-xl">Your unique media experience to rate and favorite movies</p>
        <div className="flex gap-5">
          <a href="#" className="bg-white">Login</a>
          <a href="#">Sign Up</a>
        </div>
      </section>

      {homeMedia
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
      }
    </>
  );
} 
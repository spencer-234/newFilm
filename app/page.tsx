"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Trending from "@/components/HomePageSections/Trending";
import Link from "next/link";
import { Movie } from "@/typings";
import { HeroHighlight } from "@/components/Aceternity/Hero-Highlight";
import TopRated from "@/components/HomePageSections/TopRated";

interface MediaList {
  trending: Movie[],
  topRated: Movie[],
  upcoming: Movie[],
}

export default function Home() {

  const [homeMedia, setHomeMedia] = useState<MediaList | null>(null);
  const [email, setEmail] = useState<string>("");

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
      <section className="w-screen h-[400px] center-flex text-center relative">
        <HeroHighlight className="center-flex flex-col gap-3">
          <h2 className="font-extrabold text-2xl">Welcome to <i className="main-gradient bg-clip-text text-transparent pr-1">NewFilm</i></h2>
          <p className="text-xl">Sign up now to watch your favorite movies and tv shows!</p>
          <div className="flex w-full px-3">
            <input type="email" onChange={(e) => setEmail(e.target.value)} className="rounded-s-md flex-1 pl-1" placeholder="Email Address" />
            <Link href="#" className="rounded-e-md bg-red-600 px-3 flex-5 font-semibold">Get Started</Link>
          </div>
          <span>Already have an account? <Link href="#" className="hover:underline">Login</Link></span>
        </HeroHighlight>
      </section>

      {homeMedia
        ? (
          <>
            <Trending media={homeMedia.trending} />
            <div>
              <TopRated media={homeMedia.topRated} />
            </div>
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
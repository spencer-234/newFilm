"use client"

import { Movie } from "@/typings";
import { useState, useEffect } from "react";
import { fetchHomeData } from "@/utils/home-page-fetch/fetchHomeData";
import Image from "next/image";

import Trending from "@/components/HomePageSections/Trending";

interface MediaList {
  trending: Movie[],
  popular: Movie[],
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
      {homeMedia
        ? (
          <>
            <Trending media={homeMedia?.trending} />
            <div className="flex">

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
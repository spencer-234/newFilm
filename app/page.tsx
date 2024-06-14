"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Trending from "@/components/Trending";
import Link from "next/link";
import { HomeMedia } from "@/typings";
import { HeroHighlight } from "@/components/Aceternity/Hero-Highlight";
import Slider from "@/components/Slider";
import Footer from "@/components/Footer";


export default function Home() {

  const [homeMedia, setHomeMedia] = useState<HomeMedia | null>(null);
  const [email, setEmail] = useState<string>("");

  // state for currently selected category in slider
  const [tv, setTv] = useState<boolean>(false);

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
            <section className="w-screen py-8 px-4">
              <div className="center-flex w-fit gap-4 text-lg mb-5">
                <h2 className="font-bold text-xl">Top Rated</h2>
                <span className={`option ${!tv && 'text-[#07FFFF]'}`} onClick={() => setTv(false)}>Movies</span>
                <span className={`option ${tv && 'text-[#07FFFF]'}`} onClick={() => setTv(true)}>TV Series</span>
              </div>
              {!tv && (
                <div className="h-[250px]">
                  <Slider media={homeMedia.topRated} type="movie" />
                </div>
              )}
              {tv && (
                <div className="h-[250px]">
                  <Slider media={homeMedia.topRatedTv} type="tv" />
                </div>
              )}
            </section>
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
      <Footer />
    </>
  );
} 
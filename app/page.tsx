"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/utils/urlConstants";
import { HomeMedia, MediaImageObject } from "@/typings";
import Footer from "@/components/Footer";
import { fetchTitleImages } from "@/utils/fetchTitleImages";
import { useRouter } from "next/navigation";
import Slider from "@/components/Slider";


export default function Home() {

  const [homeMedia, setHomeMedia] = useState<HomeMedia | null>(null);
  const [trendingLogos, setTrendingLogos] = useState<MediaImageObject[] | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showMovie, setShowMovie] = useState<boolean>(true);
  const router = useRouter();

  // ref to track email
  const emailRef = useRef<HTMLInputElement | null>(null);

  // variable for selected movie in list
  const [current, setCurrent] = useState<number>(0);

  // varibles for timeout calls
  let timer1: NodeJS.Timeout;
  let timer2: NodeJS.Timeout;

  // element to return for homepage transitioning movies
  const Movie = ({ current }: { current: number }) => {
    return (
      <>
        <Image
          src={imageUrl + homeMedia?.trending[current].poster_path}
          width={0}
          height={0}
          alt={`${homeMedia?.trending[current].title}-backdrop`}
          sizes="100vw"
          priority={true}
          className="h-[calc(100vh*1.5)] w-auto absolute left-0 top-[-100px] md:hidden movie-slide"
        />
        <Image
          src={imageUrl + homeMedia?.trending[current].backdrop_path}
          width={0}
          height={0}
          alt={`${homeMedia?.trending[current].title}-backdrop`}
          sizes="100vw"
          priority={true}
          className="h-[calc(100vh*1.5)] w-auto absolute left-0 top-[-100px] hidden md:block movie-slide"
        />
      </>
    )
  }

  const switchMovie = () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
    if (containerRef.current) {
      if (containerRef.current.classList.contains('fade-in')) {
        containerRef.current?.classList.remove('fade-in');
      }
      containerRef.current.classList.add('fade-out');
      timer1 = setTimeout(() => {
        setShowMovie(false);
        setCurrent(prev => prev + 1);
      }, 2300)
      timer2 = setTimeout(() => {
        setShowMovie(true);
        containerRef.current?.classList.remove('fade-out');
        containerRef.current?.classList.add('fade-in');
      }, 2400)
    }
  }

  // function to route to sign up page based on typed email
  const handleSignUp = () => {
    if (emailRef.current) {
      const value = emailRef.current.value;
      router.push(`/sign-up/${value}`);
    }
  }

  // initially fetch data and begin intervals of homepage movies transition
  useEffect(() => {
    const getHomeMedia = async () => {
      const data = await fetch("/api/get-media/home", { method: 'GET', cache: 'no-store' })
        .then(res => res.json());

      const logos = await fetchTitleImages(data.data.trending, "movie");

      setHomeMedia({ ...data.data });
      setTrendingLogos(logos);

      const interval = setInterval(() => switchMovie(), 11000);
      return () => clearInterval(interval);
    }

    getHomeMedia();

  }, [])

  // check whether the current movie is the last in the list on transitioning and reset count
  useEffect(() => {

    if (homeMedia) {
      if (current === (homeMedia.trending.length - 1)) {
        setCurrent(0);
      }
    }

  }, [current])

  return (
    <>
      <section className="w-screen h-[calc(100vh-57px)] center-flex text-center relative overflow-y-hidden">
        {homeMedia?.trending && trendingLogos ? (
          <>
            <div ref={containerRef}>
              {showMovie && <Movie current={current} />}
            </div>
            <div className="z-[2] w-full h-full bg-black bg-opacity-50 center-flex">
              <div className="w-full h-full home-gradient center-flex flex-col gap-5 md:text-lg lg:text-xl">
                <h2 className="font-extrabold text-2xl lg:text-3xl 2xl:text-4xl">Welcome to <i className="main-gradient bg-clip-text text-transparent pr-1">NewFilm</i></h2>
                <p className="text-xl font-semibold">Sign up now to watch your favorite movies and tv shows!</p>
                <div className="flex w-full px-3 max-w-[700px]">
                  <input type="email" className="rounded-s-md flex-1 pl-1 md:py-1 text-black" placeholder="Email Address" ref={emailRef} />
                  <span className="rounded-e-md hover:bg-red-500 bg-red-600 px-2 text-sm flex-5 center-flex font-semibold cursor-pointer" onClick={() => handleSignUp()}>Get Started</span>
                </div>
                <span>Already have an account? <Link href="/login" className="hover:text-[#07FFFF] font-semibold">Login</Link></span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full animate-pulse bg-zinc-900">
          </div>
        )}
      </section>
      <section className="mr-auto ml-auto w-screen h-fit relative max-w-[var(--max-width)]">
        <h2 className="ml-3 w-fit italic font-bold text-3xl md:text-4xl mt-8">Top Rated</h2>
        <div className="md:flex">
          <div className="p-6 h-[500px] relative md:flex-1">
            <h3 className="md:mr-auto md:ml-auto w-fit italic font-bold text-2xl main-gradient bg-clip-text text-transparent pr-1 mb-5">Movies</h3>
            {homeMedia && (
              <Slider movies={homeMedia?.topRated} type="movie" />
            )}
          </div>
          <div className="p-6 h-[500px] relative md:flex-1">
            <h3 className="md:mr-auto md:ml-auto w-fit italic font-bold text-2xl main-gradient bg-clip-text text-transparent pr-1 mb-5">TV Series</h3>
            {homeMedia && (
              <Slider movies={homeMedia?.topRatedTv} type="tv" />
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
} 
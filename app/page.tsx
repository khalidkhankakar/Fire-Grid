import Image from "next/image";
import Link from "next/link";

import Celebration from "@/components/shared/celebration";
import FeatureSection from "@/components/shared/feature-section";
import Footer from "@/components/shared/footer";
import HowWorksSection from "@/components/shared/how-works-section";
import LandingNavbar from "@/components/shared/landing-navbar";
import SponseredSection from "@/components/shared/sponsered-section";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import WhyChoose from "@/components/shared/why-choose";


export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Celebration />
      <main className="flex bg-slate-200 dark:bg-dark-1 min-h-screen flex-col h-full ">
        <LandingNavbar />

        <section className="relative z-50 pb-20 flex flex-col items-center py-2 md:py10 h-[calc(100vh-80px)]">
          <div className=" border-2 border-white rounded-full">
            <p className="text-sm py-1 px-4 font-extralight text-indigo-500">Inspired by Trello</p>
          </div>
          <div className="  ">
            <Image
              src='/hero2.png'
              width={1000}
              height={1000}
              className="object-contain h-32 w-32 md:h-40 md:w-40"
              alt="hero image"
            />
          </div>
          <h1 className="max-w-[95%] mt-0 text-center text-[40px] font-bold leading-[3.2rem]  tracking-tight md:text-[60px] md:leading-[5rem]">
            Transform productivity with a
            <span className="text-indigo-500"> c</span>
            <span className="text-yellow-500">o</span>
            <span className="text-red-500">l</span>
            <span className="text-pink-500">o</span>
            <span className="text-orange-500">r</span>
            <span className="text-cyan-500">f</span>
            <span className="text-blue-500">u</span>
            <span className="text-green-500">l</span> seamless task manager!
          </h1>
          <p className="my-2 max-w-[95%] text-center text-[14px] font-light tracking-wide  md:text-[17px]">
            To get started sign up or log in to your account
          </p>
          <div className="flex items-center z-50 mt-3 gap-x-4">
            <Button variant="link" asChild>
              <Link
                href="/sign-in"
              >
                <Image
                  src={'/github.png'}
                  width={50}
                  height={50}
                  className="w-6 h-6 object-contain"
                  alt="github"
                />
                <span>GitHub</span>
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link
                href="/sign-in"
              >
                <Image
                  src={'/google.png'}
                  width={50}
                  height={50}
                  className="w-6 h-6 object-contain"
                  alt="google"
                />
                <span>Google</span>
              </Link>
            </Button>
          </div>
          {/* <Image src={'/hand.png'} width={500} height={500} className="object-contain absolute top-3 left-4 h-32 w-32 md:h-40 md:w-40" alt="hero image"  /> */}
        </section>
        <SponseredSection />
        <FeatureSection />
        <HowWorksSection />
        <WhyChoose />
        <Footer />
        <BackgroundBeams />

      </main>

    </div>
  );
}



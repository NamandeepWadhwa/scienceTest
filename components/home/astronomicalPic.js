"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Information( {data }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-[-100px]");
          } else {
            entry.target.classList.add("opacity-0", "translate-y-[-100px]");
            entry.target.classList.remove("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: .3 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="min-w-full"></div>
      <div className="relative min-h-screen w-full">
        <Image
          src={data.url}
          alt="NASA Image of the Day"
          className="absolute inset-0 w-full h-full object-cover"
          width={100}
          height={100}
          priority
        />
      </div>

      {/* Explanation Section */}

      <div className="animate-on-scroll opacity-0 transform translate-y-[-100px] transition-all duration-700 ease-in-out py-10">
        <div className="flex flex-col justify-center items-center text-2xl font-bold min-w-full">
          <div>Astronomical image of the day</div>
          <div className="mt-2 mb-6">
            Copy right by :{`${data.copyright ?? "None"}`}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center px-4">
          {data.explanation}
        </h2>
      </div>
    </>
  );
}

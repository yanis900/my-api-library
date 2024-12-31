"use client";

import { DontSwearApi } from "@/components/DontSwearApi";
import Footer from "@/components/Footer";
import { GithubApi } from "@/components/GithubApi";
import Header from "@/components/Header";
import { ReadmeApi } from "@/components/ReadmeApi";
import { Loader } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-grow mx-auto container px-4 py-12 bg-gray-50 border-x">
        <div className="max-w-2xl mx-auto space-y-6 bg-gray-50">
          <GithubApi />
          <DontSwearApi />
          <ReadmeApi />
          <div className="flex gap-2 items-center justify-center">More on the way... <Loader /> </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

"use client";

import { DontSwearApi } from "@/components/DontSwearApi";
import Footer from "@/components/Footer";
import { GithubApi } from "@/components/GithubApi";
import Header from "@/components/Header";
import { ReadmeApi } from "@/components/ReadmeApi";
import { Loader } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow mx-auto px-4 py-12 bg  w-full">
        <div className="max-w-2xl mx-auto space-y-6">
          <GithubApi />
          <DontSwearApi />
          <ReadmeApi />
          <div className="flex gap-2 items-center justify-center text-gray-300">
            More on the way... <Loader />{" "}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

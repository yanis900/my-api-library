"use client";

import { DontSwearApi } from "@/components/DontSwearApi";
import { GithubApi } from "@/components/GithubApi";
import { ReadmeApi } from "@/components/ReadmeApi";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            My API library 📚
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <GithubApi />
          <DontSwearApi />
          <ReadmeApi />
        </div>
      </main>

      <footer className="py-6 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 My API Library. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

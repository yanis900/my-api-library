import { Book, SquareUser, Terminal } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="shadow-sm w-screen flex items-center justify-between p-5 bg-white">
      <div>
        <Terminal />
      </div>
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl flex gap-2 items-center">
        My API Library │ <Book className="lg:w-16 lg:h-16 md:w-12 md:h-12 w-8 h-8" />
      </h1>
      <Link href={"https://yanait.com/"}>
        <SquareUser />
      </Link>
    </header>
  );
}

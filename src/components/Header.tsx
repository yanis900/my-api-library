import { SquareUser, Terminal } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="p-5 flex items-center justify-between font-bold shadow-sm border ">
      <div className="">
        <Terminal />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl ">
        My API library │ 📚
      </h1>
      <Link href={'https://yanait.com/'} className="">
        <SquareUser />
      </Link>
    </header>
  );
}

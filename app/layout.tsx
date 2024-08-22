import type { Metadata } from "next";
import { rubik } from "./lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "VTech TodoList",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className}`}>
        <div className="flex">
          <div>
            <header>
              <h1 className="font-bold">Hello.</h1>
              <h2 className="font-bold">My name is Hongsreng Pheng.</h2>
            </header>
            <main>
              <div>
                <p>
                  I am a software developer currently based in Cambodia. You can
                  follow me on&nbsp;
                  <a href="https://www.linkedin.com/in/hongsreng-pheng-94b602277">
                    LinkedIn
                  </a>
                </p>
                <p>
                  As a tech enthusiast, I am passionate with learning new tech
                  and trying different ways to build software product. Outside
                  of Software Development Work, I also enjoy competitive
                  programming. My result for Cambodia&nbsp;
                  <a href="https://sites.google.com/paragoniu.edu.kh/cscup/previous-years/cambodia-cs-cup-2022?authuser=0">
                    CS CUP
                  </a>
                  &nbsp; competition was top 4.
                </p>
                <p>
                  Outside of programming, I enjoy video games, karaoke, ice
                  cream, playing music, reading book and sleep.
                </p>
              </div>
            </main>
          </div>
          <div className="m-10 grow border-2 rounded-xl p-5 ring-2 ring-slate-100">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

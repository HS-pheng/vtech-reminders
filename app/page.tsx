import Image from "next/image";
import { openSans } from "./ui/font";

export default function Home() {
  return (
    <div className={`${openSans.className}`}>
      <input className="w-1/3 border p-2 rounded-md" placeholder=" Search " />
      <h2 className="font-bold">All</h2>
      <hr />
    </div>
  );
}

import NavBar from "@/components/NavBar";
import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100  900"
});
export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="w-[98vw] h-[60vh] mx-auto relative my-2 ">
        <Image
          src="/home.jpg"
          alt="Placeholder"
          fill
          loading="eager"
          className="object-cover rounded"
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold ${poppins.variable}`}
        >
          <span className="text-white ">Digitalize Your Shop Today</span>
        </div>
      </div>
      <div className={`grid grid-cols-2 w-[98vw] h-[39vh] mx-auto my-2 gap-4 `}>
        <div className="bg-violet-100 shadow-lg rounded-xl p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">About ShopCart</h2>
          <p className="text-gray-700">
            ShopCart helps you bring your store online with ease. Manage
            products, track sales, and connect with customers through a simple,
            modern dashboard.
          </p>
        </div>

        <div className="bg-violet-100 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Get Started Now</h2>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
}

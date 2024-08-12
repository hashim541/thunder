// app/page.tsx
import DashboardNavbar from "@/components/DashboardNavbar";
import ThemeToggle from "@/components/ThemeToggle";
import { font } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full">
      <nav className='flex justify-center items-center border-b-2 border-borderColor w-full'>
            <div className='max-w-[1200px] flex items-center justify-between gap-5 py-2 px-3 w-full'>
                <header className='flex justify-center items-center'>
                    <Image
                        src={'/assets/svgs/logo.svg'}
                        alt='logo'
                        width={30}
                        height={30}
                        className='rounded-full'
                    />
                    <h1 className={`${font.head.className} font-bold text-xl`}>Thunder</h1>
                </header>
                <Link href={'/sign-in'} className="ml-auto">
                  <button className="text-primary border-2 border-primary  px-6 py-2 rounded-md font-bold">Sign-in</button>
                </Link>
                <ThemeToggle />
            </div>
        </nav>
      <section className="flex-1 w-full max-w-[1200px] sm:px-3 px-2 h-full flex flex-col">
        <section className="w-full flex-1 flex flex-col items-center justify-center py-44">
          <h1 className={`${font.head.className}  text-5xl font-bold`}>Don't Re-invent The Wheel</h1>
          <h1 className={`${font.head.className}  text-4xl font-bold`}>Embed Components Faster</h1>
          <p className="text-base mt-5 text-center max-w-4xl">
            Transform the way you manage and display comments, testimonials, and FAQs. Customize effortlessly with color palettes and layouts to match your brand, and let your clients add their own content with ease.
          </p>
          <div className=" flex items-center justify-center gap-5 mt-4">
            <Link href={'/sign-in'}>
              <button className="text-background border-2 border-primary bg-primary px-6 py-2 rounded-md font-bold">Sign-in</button>
            </Link>
            <Link href={'/dashboard'}>
              <button className=" border-2 border-text px-6 py-2 rounded-md font-bold">Dashboard</button>
            </Link>
          </div>
        </section>

        <section className="flex flex-col items-center gap-5 w-full py-20">
          <h1 className={`${font.head.className}  text-4xl font-bold`}>Comment Component</h1>
          <div className="w-full flex flex-col items-center">
            <iframe src="http://localhost:3000/embedded/66b5f99721f0f0c330b78b23/comments/66b5fc1621f0f0c330b78b64?page=1" className="rounded-lg" width="100%" height="500px" ></iframe>  
            <a href="http://localhost:3000/dashboard/66b5f99721f0f0c330b78b23/comments/66b5fc1621f0f0c330b78b64/add" className="self-center">
                <button className=" border-2 border-text px-6 py-2 rounded-md font-bold mt-5">Add Your Comment</button>
            </a>
          </div>
        </section>

        <section className="flex flex-col items-center gap-5 w-full py-20">
          <h1 className={`${font.head.className}  text-4xl font-bold`}>Testimonial Component</h1>
          <div className="w-full flex flex-col items-center">
            <iframe src="http://localhost:3000/embedded/66b5f99721f0f0c330b78b23/testimonials/66b73e1a78ee165ef6b63637?page=1"  className="rounded-lg" width="100%" height="500px" ></iframe>  
            <a href="http://localhost:3000/dashboard/66b5f99721f0f0c330b78b23/testimonials/66b73e1a78ee165ef6b63637/add" className="self-center">
                <button className=" border-2 border-text px-6 py-2 rounded-md font-bold mt-5">Add Your Testimonial</button>
            </a>
          </div>
        </section>

        <section className="flex flex-col items-center gap-5 w-full py-20">
          <h1 className={`${font.head.className}  text-4xl font-bold`}>FAQs Component</h1>
          <div className="w-full flex flex-col items-center">
            <iframe src="http://localhost:3000/embedded/66b5f99721f0f0c330b78b23/faqs/66b831492ad766df81d2bdb6?page=1" className="rounded-lg" width="100%" height="500px"></iframe>  
            <a href="http://localhost:3000/dashboard/66b5f99721f0f0c330b78b23/faqs/66b831492ad766df81d2bdb6/add" className="self-center">
                <button className=" border-2 border-text px-6 py-2 rounded-md font-bold mt-5">Add your question</button>
            </a>
          </div>
        </section>

      </section>
    </main>
  );
}

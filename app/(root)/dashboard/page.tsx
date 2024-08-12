// app/(root)/dashboard/page.tsx
import ProjectCard from "@/components/cards/ProjectCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { font } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";


const Dashboard = async () => {
  const session = await getSession()


  if (!session || !session.user || !session.user.email) {
    return redirect('/sign-in')
  }

  // Fetch user data
  const userData = await fetchUser(session.user.email);

  return (
    <section className="w-full h-full flex flex-col justify-start py-24 gap-10">
      <div className='flex gap-5 justify-start items-start'>
        <Image
          src={userData.image}
          alt='Profile'
          width={50}
          height={50}
          className="rounded-md object-contain"
        />
        <div>
          <h2 className="text-2xl font-bold">{userData.fullName}</h2>
          <p className="text-sm">{userData.email}</p>
          <p className="text-sm opacity-40 mt-1 font-bold">Projects: {userData.projects.length > 0 ? userData.projects.length : 'No Projects found'}</p>
        </div>
      </div>

      <h1 className={`${font.head.className} font-bold text-3xl`}> Application</h1>

      <div className="w-full flex flex-col gap-5">
        <Link href={'/dashboard/project/new'}>
          <div className="w-full h-52 text-xl border-offBg flex justify-center items-center gap-3  shadow rounded-lg backdrop-blur-lg">
            <FaPlus />
            Create a New Project
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {userData.projects.map((item: any) => (
            <ProjectCard
              key={item._id}
              project={{
                _id: item._id,
                userId: item.userId,
                createdAt: item.createdAt,
                description: item.description,
                logo: item.logo,
                name: item.name,
                url: item.url,
                updatedAt: item.updatedAt
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

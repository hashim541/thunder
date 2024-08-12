//app/(root)/dashboard/[projectId]/page.tsx

import ComponentCard from "@/components/cards/ComponentCard";
import { fetchProject } from "@/lib/actions/project.actions";
import { getSession } from "@/lib/getSession";
import { formatDateString } from "@/lib/utilsfunc";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { FaComment, FaGlobe, FaLink, FaPlus, FaQuestion } from "react-icons/fa6";


const ProjectPage= async ({ params } : { params: { projectId: string } }) => {
  
  const session = await getSession()
  if(!session || !session.user || !session.user.email) redirect('/sign-in')

  const project = await fetchProject(params.projectId)
  if(project.userId._id != session.userId) redirect('/dashboard')


  return (
    <section className="w-full h-full flex flex-col justify-start py-24 gap-10">
      
      <h1 className={`font-bold text-3xl`}>{project.userId.fullName} - {project.name}</h1>
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-3 items-center justify-start">
            {project.logo ? 
            <Image
                src={project.logo}
                alt={project.name}
                width={50}
                height={50}
                className="object-contain bg-white p-2 rounded-full"
            /> : <div className="rounded-full text-3xl bg-white text-black p-2"><FaGlobe/></div>}
            <div>
                <p className="font-bold ">{project.name}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex gap-2  items-center text-sm underline">
                  {project.url} <FaLink/>
                </a>
            </div>
        </div>
        <div>
            <p className="text-justify">{project.description}</p>
            <p className="text-xs opacity-40 mt-3 font-bold">Last Updated {formatDateString(project.updatedAt)}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">Comments</h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
          {project.components.comments.map((item: any) => (
            <ComponentCard key={item._id} componentData={{
              id: item._id,
              projectId:params.projectId,
              name: item.name,
              content: item.content,
              createdAt: item.createdAt,
              colors:item.styles.pallet.colors,
              type:'comment'
            }} />
          ))}
          <Link href={`/dashboard/${params.projectId}/comments/new`}>
              <div className="relative overflow-hidden w-full h-full min-h-44 rounded-lg bg-gradient-to-br from-red-500 to-transparent text-white text-xl flex justify-center items-center text-center gap-3 font-bold">
                <FaPlus /> Add
                <div className="text-8xl text-red-500 opacity-60 absolute -right-3 -bottom-3">
                  <FaComment />
                </div>
              </div>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">Testimonials</h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
          {project.components.testimonials.map((item: any) => (
            <ComponentCard key={item._id} componentData={{
              id: item._id,
              projectId:params.projectId,
              name: item.name,
              content: item.content,
              createdAt: item.createdAt,
              colors:item.styles.pallet.colors,
              type:'testimonial'
            }} />
          ))}
          <Link href={`/dashboard/${params.projectId}/testimonials/new`}>
              <div className="relative overflow-hidden w-full h-full min-h-44 rounded-lg bg-gradient-to-br from-blue-500 to-transparent text-white text-xl flex justify-center items-center text-center gap-3 font-bold">
                <FaPlus /> Add
                <div className="text-8xl text-blue-500 opacity-60 absolute -right-3 -bottom-3">
                  <FaStar />
                </div>
              </div>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">Faqs</h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
          {project.components.faqs.map((item: any) => (
            <ComponentCard key={item._id} componentData={{
              id: item._id,
              projectId:params.projectId,
              name: item.name,
              content: '',
              createdAt: item.createdAt,
              colors:item.styles.pallet.colors,
              type:'faq'
            }} />
          ))}
          <Link href={`/dashboard/${params.projectId}/faqs/new`}>
              <div className="relative overflow-hidden w-full h-full min-h-40 rounded-lg bg-gradient-to-br from-green-500 to-transparent text-white text-xl flex justify-center items-center text-center gap-3 font-bold">
                <FaPlus /> Add
                <div className="text-8xl text-green-500 opacity-60 absolute -right-3 -bottom-3">
                  <FaQuestion />
                </div>
              </div>
          </Link>
        </div>
      </div>
      
    </section>
  );
};

export default ProjectPage
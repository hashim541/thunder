import { formatDateString } from "@/lib/utilsfunc"
import Image from "next/image"
import Link from "next/link"
import { FaArrowCircleRight } from "react-icons/fa"
import { FaGlobe } from "react-icons/fa6"


interface Props {
    project: {
        _id: string,
        userId: string,
        createdAt: string,
        description: string,
        logo: string,
        name: string,
        url: string,
        updatedAt: string
    }
}

const ProjectCard = ({project}: Props) => {
  return (
    <Link href={`/dashboard/${project._id}`}>
        <div className="border-[1px] rounded-lg py-4 px-6 flex flex-col gap-4 border-borderColor justify-start items-start w-full bg-gradient-to-br from-borderColor to-transparent">
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
                    <p className="text-sm">{project.url}</p>
                </div>
            </div>
            <div>
                <p className="">{project.description}</p>
                <p className="text-xs opacity-40 mt-3 font-bold">Last Updated {formatDateString(project.updatedAt)}</p>
            </div>
            <button className="flex gap-3 bg-primary self-end text-white px-4 py-1 justify-center items-center rounded-md font-bold"> Open <FaArrowCircleRight/></button>
        </div>
    </Link>
  )
}

export default ProjectCard
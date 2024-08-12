import { formatDateString } from '@/lib/utilsfunc'
import Link from 'next/link'
import React from 'react'
import { FaArrowCircleRight, FaCommentDots } from 'react-icons/fa'
import { FaQuestion, FaStar } from 'react-icons/fa6'

interface Props {
    componentData: {
        id: string,
        projectId: string
        name: string,
        content: string,
        createdAt: string,
        colors: {
            primary: string,
            text:string,
            bg:string
        }
        type: 'comment' | 'testimonial' | 'faq'
    }
}

const ComponentCard = ({componentData}: Props) => {
  return (
    <Link href={`/dashboard/${componentData.projectId}/${componentData.type+'s'}/${componentData.id}`}>
        <div className={`shadow rounded-lg py-4 px-6 flex flex-col gap-4 justify-start items-start w-full `}
            style={{backgroundImage:'linear-gradient(135deg, '+componentData.colors.primary+', transparent)'}}
        >
            <div className="flex gap-3 items-center justify-start">
                <div className="rounded-full text-3xl p-2">
                    {componentData.type =='comment' && <FaCommentDots/>}
                    {componentData.type =='testimonial' && <FaStar/>}
                    {componentData.type =='faq' && <FaQuestion/>}
                </div>
                <div>
                    <p className="font-bold ">{componentData.name}</p>
                    {/* <p className="text-sm">{project.url}</p> */}
                </div>
            </div>
            <div>
                <p className="text-sm">{componentData.content}</p>
                <p className="text-xs opacity-60 mt-3 font-bold">Created At {formatDateString(componentData.createdAt)}</p>
            </div>
            <button className="flex gap-3 self-end px-4 py-1 justify-center items-center rounded-md font-bold"> Open <FaArrowCircleRight/></button>
        </div>
    </Link>
  )
}

export default ComponentCard
'use client'
import { CreateCommentComponent } from "@/lib/actions/comment.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaDotCircle, FaFileImage, FaFont, FaFontAwesome } from "react-icons/fa"
import { FaComment } from "react-icons/fa6"


interface Props {
    commentForm:{
        userId: string,
        projectId: string
    }
}

const CommentForm = ({commentForm}:Props) => {

    const router = useRouter()
    const [commentData,setcommentData] = useState<{
        [key: string]: string 
    }>({
        userId: commentForm.userId,
        projectId: commentForm.projectId,
        commentName: '',
        content: ''
    })

    const handleChange = (name: string, value: string) => {
        const newCommentData = { ...commentData };
        newCommentData[name] = value;
        setcommentData(newCommentData);
    };

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await CreateCommentComponent({
            userId: commentData.userId,
            projectId: commentData.projectId,
            name: commentData.commentName,
            content: commentData.content
        })

        router.push(`/dashboard/${commentForm.projectId}`)
    }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full max-w-[700px] mx-2 rounded-lg border-[1px] border-borderColor px-12 py-8'>
            
            <div className='flex flex-1 flex-col gap-1 min-w-[250px]'>
                <label htmlFor="name" className='font-semibold flex items-center gap-2'>
                    <FaFontAwesome /> Component Name
                </label>
                <input
                    type="text"
                    name='commentName'
                    placeholder='Give this comment component a name'
                    minLength={3}
                    value={commentData.commentName}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='border-[1px] border-borderColor rounded-sm px-2 py-1 w-full  bg-transparent'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="description" className='font-semibold flex items-center gap-2'>
                    <FaDotCircle /> Description
                </label>
                <textarea
                    name='content'
                    placeholder='Add Comment for your user (user will see this comment)'
                    minLength={3}
                    rows={3}
                    value={commentData.content}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='border-[1px] border-borderColor rounded-sm px-2 py-1 w-full min-w-[350px] bg-transparent'
                />
            </div>

            <button type='submit' className='bg-primary w-fit self-end text-white font-bold px-4 py-2 rounded flex items-center gap-2' >
                <FaComment /> Create Component
            </button>
        </form>
  )
}

export default CommentForm
'use client'
import { createCommentCard } from '@/lib/actions/commentCard.actions';
import { formatDateString } from '@/lib/utilsfunc';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

interface AddCommentFormProps {
    primaryColor: string;
    bgColor: string;
    textColor: string;
    user: {
        id: string
        image: string,
        name: string,
        email: string
    };
    commentId: string;
    projectId: string;
}

const AddCommentForm= ({ primaryColor, bgColor, textColor, user, commentId, projectId }: AddCommentFormProps) => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const pathname = usePathname()
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)
        setError(null)

        await createCommentCard({
            commentId: commentId,
            author: user.id,
            content: content
        })

        setLoading(false)
        setSuccess(true)
        setContent('')

        router.push(pathname)
    }

    return (
        <div className='w-full'>
            <div className='flex items-start gap-3'>
                <Image
                    src={user.image}
                    alt='profile'
                    width={40}
                    height={40}
                    className='rounded-full object-contain'
                />
                <div className='flex-1'>
                    <div>
                        <p className='font-bold text-lg'>{user.name}</p>
                        <p className='text-xs opacity-80 '>{user.email}</p>
                    </div>

                    <form onSubmit={handleSubmit} className='w-full mt-3 flex flex-col'>
                        <textarea
                            name='content'
                            value={content}
                            onChange={handleChange}
                            minLength={3}
                            rows={4}
                            placeholder='Add your comment...'
                            className='w-full p-2 border-[1px] rounded-lg text-sm mb-4 bg-background'
                            style={{backgroundColor: bgColor, borderColor: textColor+'20'}}
                        />
                        <p className='text-xs opacity-80 '>{formatDateString(Date.now())}</p>
                        <button
                            type='submit'
                            className={`w-fit px-6 py-2 self-end rounded-lg font-bold`}
                            disabled={loading}
                            style={{backgroundColor: primaryColor, color: textColor}}
                        >
                            {loading ? 'Submitting...' : 'Submit Comment'}
                        </button>
                        {success && <p className='mt-2 text-green-600 flex items-center'><FaCheck className='mr-2' /> Comment submitted successfully!</p>}
                        {error && <p className='mt-2 text-red-600 flex items-center'><FaTimes className='mr-2' /> {error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCommentForm

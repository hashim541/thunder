'use client'
import { createTestimonialCard } from '@/lib/actions/testimonialCard.actions';
import { formatDateString } from '@/lib/utilsfunc';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
import Rating from '../cards/Rating';


interface AddTestimonialFormProps {
    primaryColor: string;
    bgColor: string;
    textColor: string;
    user: {
        id: string
        image: string,
        name: string,
        email: string
    };
    testimonialId: string;
    projectId: string;
}

const AddTestimonialForm = ({ primaryColor, bgColor, textColor, user, testimonialId, projectId }: AddTestimonialFormProps) => {
    const [content, setContent] = useState<{
        [key: string]: string | number
    }>({
        content:'',
        rating:5
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const pathname = usePathname()
    const router = useRouter()

    const handleChange = (name:string, value: string | number) => {
        if(name == 'rating'){
            if(Number(value) < 0){
                value = 1
            }
            if(Number(value) > 5){
                value = 5
            }
        }
        setContent({...content,[name]:value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)
        setError(null)

        await createTestimonialCard({
            testimonialId: testimonialId,
            author: user.id,
            content: content.content.toString(),
            rating: Number(content.rating)
        })

        setLoading(false)
        setSuccess(true)
        setContent({
            content:'',
            rating:1
        })

        router.push(pathname)
    }
  return (
    <div className='w-full flex flex-col items-center gap-2 border-[1px] rounded-lg px-6 py-3' style={{borderColor: textColor+'20'}}>
        <Image
            src={user.image}
            alt='profile'
            width={40}
            height={40}
            className='rounded-full object-contain'
        />
        <div>
            <p className='font-bold text-lg'>{user.name}</p>
            <p className='text-xs opacity-80 '>{user.email}</p>
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-2'>
            <Rating rating={Number(content.rating)} />
            <input
                type='number'
                name='rating'
                value={content.rating}
                min={1}
                max={5}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder='Add your rating'
                className='w-full p-2 border-[1px] rounded-lg text-sm mb-4 bg-background'
                style={{backgroundColor: bgColor, borderColor: textColor+'20'}}
                required
            />
            <textarea
                name='content'
                value={content.content}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                minLength={3}
                rows={4}
                placeholder='Add your comment...'
                className='w-full p-2 border-[1px] rounded-lg text-sm bg-background'
                style={{backgroundColor: bgColor, borderColor: textColor+'20'}}
                required
            />
            <p className='text-xs opacity-80 self-start'>{formatDateString(Date.now())}</p>
            <button
                type='submit'
                className={`w-fit px-6 py-2 self-end rounded-lg font-bold`}
                disabled={loading}
                style={{backgroundColor: primaryColor, color: textColor}}
            >
                {loading ? 'Submitting...' : 'Submit Comment'}
            </button>
            {success && <p className='mt-2 text-green-600 flex items-center self-start'><FaCheck className='mr-2' /> Testimonial submitted successfully!</p>}
            {error && <p className='mt-2 text-red-600 flex items-center self-start'><FaTimes className='mr-2' /> {error}</p>}
        </form>
    </div>
  )
}

export default AddTestimonialForm
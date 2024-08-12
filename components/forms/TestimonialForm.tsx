'use client'
import { CreateTestimonialComponent } from "@/lib/actions/testimonial.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaDotCircle,FaFontAwesome } from "react-icons/fa"
import { FaStar } from "react-icons/fa6"


interface Props {
    testimonialForm:{
        userId: string,
        projectId: string
    }
}

const TestimonialForm = ({testimonialForm}:Props) => {

    const router = useRouter()
    const [testimonialData,setTestimonialData] = useState<{
        [key: string]: string 
    }>({
        userId: testimonialForm.userId,
        projectId: testimonialForm.projectId,
        name: '',
        content: ''
    })

    const handleChange = (name: string, value: string) => {
        const newTestimonialData = { ...testimonialData };
        newTestimonialData[name] = value;
        setTestimonialData(newTestimonialData);
    };

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await CreateTestimonialComponent({
            userId: testimonialData.userId,
            projectId: testimonialData.projectId,
            name: testimonialData.name,
            content: testimonialData.content
        })

        router.push(`/dashboard/${testimonialData.projectId}`)
    }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full max-w-[700px] mx-2 rounded-lg border-[1px] border-borderColor px-12 py-8'>
            
            <div className='flex flex-1 flex-col gap-1 min-w-[250px]'>
                <label htmlFor="name" className='font-semibold flex items-center gap-2'>
                    <FaFontAwesome /> Component Name
                </label>
                <input
                    type="text"
                    name='name'
                    placeholder='Give this Testimonial component a name'
                    minLength={3}
                    value={testimonialData.name}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='border-[1px] border-borderColor rounded-md px-2 py-1 w-full  bg-transparent'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="description" className='font-semibold flex items-center gap-2'>
                    <FaDotCircle /> Description
                </label>
                <textarea
                    name='content'
                    placeholder='Your User can see this description'
                    minLength={3}
                    rows={3}
                    value={testimonialData.content}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='border-[1px] border-borderColor rounded-md px-2 py-1 w-full min-w-[350px] bg-transparent'
                />
            </div>

            <button type='submit' className='bg-primary w-fit self-end text-white font-bold px-4 py-2 rounded flex items-center gap-2' >
                <FaStar /> Create Component
            </button>
        </form>
  )
}

export default TestimonialForm
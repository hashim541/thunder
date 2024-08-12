'use client'
import { createFaqComponent } from "@/lib/actions/faq.actions"
import { CreateTestimonialComponent } from "@/lib/actions/testimonial.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaDotCircle,FaFontAwesome } from "react-icons/fa"
import { FaQuestion, FaStar } from "react-icons/fa6"


interface Props {
    faqForm:{
        userId: string,
        projectId: string
    }
}

const FaqForm = ({faqForm}:Props) => {
    const router = useRouter()
    const [faqData,setFaqData] = useState<{
        [key: string]: string 
    }>({
        userId: faqForm.userId,
        projectId: faqForm.projectId,
        name: '',
    })

    const handleChange = (name: string, value: string) => {
        const newfaqData = { ...faqData };
        newfaqData[name] = value;
        setFaqData(newfaqData);
    };

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await createFaqComponent({
            userId: faqData.userId,
            projectId: faqData.projectId,
            name: faqData.name,
        })

        router.push(`/dashboard/${faqData.projectId}`)
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
                    value={faqData.name}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='border-[1px] border-borderColor rounded-sm px-2 py-1 w-full  bg-transparent'
                />
            </div>

            

            <button type='submit' className='bg-primary w-fit self-end text-white font-bold px-4 py-2 rounded flex items-center gap-2' >
                <FaQuestion /> Create Component
            </button>
        </form>
  )
}

export default FaqForm
// app/(root)/dashboard/[projectId]/comments/[commentId]/add/page.tsx
import { fetchCommentComponent } from '@/lib/actions/comment.actions'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaGlobe } from 'react-icons/fa'
import AddCommentForm from '@/components/forms/AddCommentForm'
import { fetchUser } from '@/lib/actions/user.actions'
import { getSession } from '@/lib/getSession'
import { fetchTestimonialComponent } from '@/lib/actions/testimonial.actions'
import AddTestimonialForm from '@/components/forms/AddTestimonialForm'

const Page = async ({ params }: { params: { projectId: string, testimonialId: string } }) => {

    const session = await getSession()
    if(!session || !session.user || !session.user.email) redirect('/sign-in')

    const userData = await fetchUser(session.user.email)
    
    const testimonial = await fetchTestimonialComponent(params.testimonialId)
    if(testimonial.userId._id != session.userId) return redirect('/dashboard')

    const { primary, text, bg } = testimonial.styles.pallet.colors

    return (
        <section className={`w-full max-w-xl mx-auto my-12 p-6 rounded-lg shadow`} style={{backgroundColor: bg, color: text}}>
            <div className='flex flex-col items-center'>
                {testimonial.projectId.logo ? (
                    <Image
                        src={testimonial.projectId.logo}
                        alt={testimonial.projectId.name}
                        width={100}
                        height={100}
                        style={{ borderColor: primary }}
                        className={`object-contain bg-white p-2 rounded-full border-4`}
                    />
                ) : (
                    <div className={`rounded-full text-3xl bg-white text-black p-2`} style={{ borderColor: primary }}>
                        <FaGlobe />
                    </div>
                )}
                <h1 className={`text-xl font-bold mt-3`} >{testimonial.projectId.name}</h1>
                <h1 className={`text-lg font-bold mt-4 text-center`} >{testimonial.name}</h1>
                <p className="text-sm mb-6 text-center font-normal">{testimonial.content}</p>
                
                <p className='self-start mb-3 font-bold text-sm'>Testimonilas: {testimonial.analytics.totalDataBasedOnCards}</p>
                <AddTestimonialForm
                    primaryColor={primary}
                    bgColor={bg}
                    textColor={text}
                    user={{
                      id: userData._id,
                      image: userData.image,
                      name: userData.fullName || '',
                      email: userData.email
                    }}
                    testimonialId={params.testimonialId}
                    projectId={params.projectId}
                />
            </div>
        </section>
    )
}

export default Page

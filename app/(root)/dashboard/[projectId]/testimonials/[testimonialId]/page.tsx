// app/(root)/dashboard/[projectId]/testimonials/[testimonialId]/page.tsx
import AnalyticCards from '@/components/cards/AnalyticCards'
import EmbeddedLink from '@/components/cards/EmbeddedLink'
import RatingSummary from '@/components/cards/RatingSummary'
import StyleComponent from '@/components/cards/StyleComponent'
import Testimonials from '@/components/cards/Testimonial'
import { fetchTestimonialComponent, getRatingsDetails } from '@/lib/actions/testimonial.actions'
import { getSession } from '@/lib/getSession'
import { testimonialComponentStyle } from '@/utils/data'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaGlobe, FaLink } from 'react-icons/fa6'

const Page = async({ params, searchParams } : { 
    params: { projectId: string, testimonialId: string },
    searchParams?:{
        page?: string
    } 
}) => {
    const session = await getSession()
    if(!session || !session.user || !session.user.email) redirect('/sign-in')

    const testimonial = await fetchTestimonialComponent(params.testimonialId)
    if(testimonial.userId._id != session.userId) return redirect('/dashboard')

    const ratings = await getRatingsDetails(params.testimonialId)
    console.log(ratings);
    
    
    const custom = testimonialComponentStyle.pallet.find(item => item.name == 'custom')
    if(!custom){ testimonialComponentStyle.pallet.push({name: 'custom',colors:{primary:testimonial.styles.pallet.colors.primary,text:testimonial.styles.pallet.colors.text,bg:testimonial.styles.pallet.colors.bg}}) }
    
    

  return (
    <section className="w-full h-full flex flex-col justify-start py-24 gap-10">
        <div className='flex flex-col gap-1'>
            <h1 className={`font-bold text-3xl mt-2`}>Testimonial - {testimonial.name}</h1>
            <p>{testimonial.projectId.name+' / '+testimonial.name}</p>
            <p>{testimonial.content}</p>
            <p className="text-xs opacity-40 font-bold">{testimonial._id}</p>
        </div>
        <div className="flex gap-3 items-center justify-start">
            {testimonial.projectId.logo ? 
            <Image
                src={testimonial.projectId.logo}
                alt={testimonial.projectId.name}
                width={50}
                height={50}
                className="object-contain bg-white p-2 rounded-full"
            /> : <div className="rounded-full text-3xl bg-white text-black p-2"><FaGlobe/></div>}
            <div>
                <p className="font-bold ">{testimonial.projectId.name}</p>
                <a href={testimonial.projectId.url} target="_blank" rel="noopener noreferrer" className="flex gap-2  items-center text-sm underline">
                {testimonial.projectId.url} <FaLink/>
                </a>
            </div>
        </div>
        
        <AnalyticCards analytics={testimonial.analytics} />

        <RatingSummary totalUsers={ratings.totalUsers} averageRating={ratings.averageRating} eachRating={ratings.eachRating} />

        <div>
            <h1 className={`font-bold text-xl mt-2`}>{testimonial.name}</h1>
            <p>Visit Your testimonial form how it looks</p>
            <Link href={`/dashboard/${params.projectId}/testimonials/${params.testimonialId}/add`} 
                className="flex gap-2 items-center border-2 w-fit mt-3 px-6 py-2 font-bold rounded-md border-borderColor"
                style={{backgroundColor: testimonial.styles.pallet.colors.primary, color:testimonial.styles.pallet.colors.text}}    
            >
                Share This link to your customers <FaLink/> 
            </Link>
        </div>
        <div>
            <EmbeddedLink
                content='Add Your Testimonial'
                componentId={params.testimonialId}
                projectId={params.projectId}
                styles={testimonial.styles}
                type='testimonials'
            />
        </div>

        
        <div className='flex flex-col gap-5'>
            <h1 className={`font-bold text-3xl mt-2 `}>Testimonials <span>({testimonial.analytics.totalDataBasedOnCards})</span> </h1>
            {/* add testimonial */}
            <div className='rounded-lg overflow-hidden'>
                <Testimonials
                    searchParams={{
                        page: searchParams?.page || "1"
                    }}
                    testimonialId={params.testimonialId}
                    projectId={params.projectId}
                    styles={testimonial.styles}
                />
            </div>
        </div>
        <StyleComponent 
            userStyle={{
                layout:testimonial.styles.layout,
                card:testimonial.styles.cardStyle,
                pallet:testimonial.styles.pallet.name
            }}
            styles={testimonialComponentStyle}
            component={{
                type: 'testimonial',
                id: params.testimonialId
            }} 
        />

    </section>
  )
}

export default Page
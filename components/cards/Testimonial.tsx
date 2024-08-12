'use server'
import React from 'react'
import { fetchTestimonialCard } from '@/lib/actions/testimonialCard.actions'
import TestimonialCard from './TestimonialCard'

interface Props{
    searchParams: {
        page: string
    },
    testimonialId: string,
    projectId: string
    styles:{
        layout:string
        cardStyle: string
        pallet:{
            name:string,
            colors: {
                primary: string
                text: string
                bg: string
            }
        }
    }
}

const Testimonials = async({searchParams,testimonialId,styles, projectId}: Props) => {
    const currentPage = Number(searchParams?.page) || 1

    const testimonialCardData = await fetchTestimonialCard({
        pageNumber:currentPage,
        pageSize: 20,
        testimonialId: testimonialId
    })

    if(testimonialCardData.cards.length == 0){
        return(
            <article>
                No Testimonials yet!
            </article>
        )
    }

    

  return (
    <article className='self-center flex flex-col items-center justify-center w-full p-6' style={{backgroundColor: styles.pallet.colors.bg, color: styles.pallet.colors.text}}>
        
        
        <div className={`${styles.layout} `}>
            {
                testimonialCardData.cards.map((item: any) => (
                    <TestimonialCard 
                        key={item._id} 
                        data={item}
                        cardStyle={styles.cardStyle} 
                        colors={styles.pallet.colors} 
                    />
                ))
            }
        </div>

    </article>
  )
}

export default Testimonials
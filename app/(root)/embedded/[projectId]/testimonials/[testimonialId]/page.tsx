// app/(root)/embedded/[projectId]/testimonials/[testimonialId]/page.tsx
import Testimonials from '@/components/cards/Testimonial'
import { fetchTestimonialComponent } from '@/lib/actions/testimonial.actions'

const Page = async({ params, searchParams } : { 
    params: { projectId: string, testimonialId: string },
    searchParams?:{
        page?: string
    } 
}) => {
    
    const testimonial = await fetchTestimonialComponent(params.testimonialId)

    return (
        <Testimonials
            searchParams={{
                page: searchParams?.page || "1"
            }}
            testimonialId={params.testimonialId}
            projectId={params.projectId}
            styles={testimonial.styles}
        />
    )
}

export default Page
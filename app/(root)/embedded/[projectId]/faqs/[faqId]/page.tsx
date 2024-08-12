// app/(root)/embedded/[projectId]/faqs/[faqId]/page.tsx
import Faqs from '@/components/cards/Faqs'
import { fetchFaqComponent } from '@/lib/actions/faq.actions'

const Page = async({ params, searchParams } : { 
    params: { projectId: string, faqId: string },
    searchParams?:{
        page?: string
    } 
}) => {
    
    const faq = await fetchFaqComponent(params.faqId)

    return (
        <Faqs
            searchParams={{
                page: Number(searchParams?.page) || 1
            }}
            faqId={params.faqId}
            projectId={params.projectId}
            styles={faq.styles}
        />
    )
}

export default Page
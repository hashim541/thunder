// app/(root)/dashboard/[projectId]/faqs/[faqId]/page.tsx
import AnalyticCards from '@/components/cards/AnalyticCards'
import AnswerSomeQuestion from '@/components/cards/AnswerSomeQuestion'
import EmbeddedLink from '@/components/cards/EmbeddedLink'
import Faqs from '@/components/cards/Faqs'
import StyleComponent from '@/components/cards/StyleComponent'
import { fetchFaqComponent } from '@/lib/actions/faq.actions'
import { fetchUser } from '@/lib/actions/user.actions'
import { getSession } from '@/lib/getSession'
import { faqComponentStyle } from '@/utils/data'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaGlobe, FaLink } from 'react-icons/fa6'

const Page = async({ params, searchParams } : { 
    params: { projectId: string, faqId: string },
    searchParams?:{
        page?: string
    } 
}) => {
    const session = await getSession()
    if(!session || !session.user || !session.user.email) redirect('/sign-in')

    const faq = await fetchFaqComponent(params.faqId)
    if(faq.userId._id != session.userId) return redirect('/dashboard')

    
    const custom = faqComponentStyle.pallet.find(item => item.name == 'custom')
    if(!custom){ faqComponentStyle.pallet.push({name: 'custom',colors:{primary:faq.styles.pallet.colors.primary,text:faq.styles.pallet.colors.text,bg:faq.styles.pallet.colors.bg}}) }
    
    

  return (
    <section className="w-full h-full flex flex-col justify-start py-24 gap-10">
        <div className='flex flex-col gap-1'>
            <h1 className={`font-bold text-3xl mt-2`}>Faqs - {faq.name}</h1>
            <p>{faq.projectId.name+' / '+faq.name}</p>
            <p>{faq.content}</p>
            <p className="text-xs opacity-40 font-bold">{faq._id}</p>
        </div>
        <div className="flex gap-3 items-center justify-start">
            {faq.projectId.logo ? 
            <Image
                src={faq.projectId.logo}
                alt={faq.projectId.name}
                width={50}
                height={50}
                className="object-contain bg-white p-2 rounded-full"
            /> : <div className="rounded-full text-3xl bg-white text-black p-2"><FaGlobe/></div>}
            <div>
                <p className="font-bold ">{faq.projectId.name}</p>
                <a href={faq.projectId.url} target="_blank" rel="noopener noreferrer" className="flex gap-2  items-center text-sm underline">
                {faq.projectId.url} <FaLink/>
                </a>
            </div>
        </div>
        
        <AnalyticCards analytics={faq.analytics} />

        <div>
            <h1 className={`font-bold text-xl mt-2`}>{faq.name}</h1>
            <p>Visit Your faq form how it looks</p>
            <Link href={`/dashboard/${params.projectId}/faqs/${params.faqId}/add`} 
                className="flex gap-2 items-center border-2 w-fit mt-3 px-6 py-2 font-bold rounded-md border-borderColor"
                style={{backgroundColor: faq.styles.pallet.colors.primary, color:faq.styles.pallet.colors.text}}    
            >
                Share This link to your customers <FaLink/> 
            </Link>
        </div>
        <div>
            <EmbeddedLink
                content='Add your question'
                componentId={params.faqId}
                projectId={params.projectId}
                styles={faq.styles}
                type='faqs'
            />
        </div>

        
        <div className='flex flex-col gap-5'>
            <h1 className={`font-bold text-3xl mt-2 `}>Frequently Asked Questions </h1>
            <div className='flex rounded-lg overflow-hidden'>
                <Faqs
                    searchParams={{
                        page: Number(searchParams?.page) || 1
                    }}
                    faqId={params.faqId}
                    projectId={params.projectId}
                    styles={faq.styles}
                />
            </div>
        </div>

        <div className='flex flex-col gap-5'>
            <h1 className={`font-bold text-3xl mt-2 `}>Answer some Questions </h1>
            <div className='flex rounded-lg overflow-hidden'>
               <AnswerSomeQuestion
                    userId={session.userId}
                    faqId={params.faqId}
                    searchParams={{
                        page: Number(searchParams?.page) || 1
                    }}
               />
            </div>
        </div>
        <StyleComponent 
            userStyle={{
                layout:faq.styles.layout,
                card:faq.styles.cardStyle,
                pallet:faq.styles.pallet.name
            }}
            styles={faqComponentStyle}
            component={{
                type: 'faq',
                id: params.faqId
            }} 
        />

    </section>
  )
}

export default Page
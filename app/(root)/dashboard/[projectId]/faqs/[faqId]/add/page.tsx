// app/(root)/dashboard/[projectId]/faqs/[faqId]/add/page.tsx
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaGlobe } from 'react-icons/fa'
import { fetchUser } from '@/lib/actions/user.actions'
import { getSession } from '@/lib/getSession'
import { fetchFaqComponent } from '@/lib/actions/faq.actions'
import AddFaqForm from '@/components/forms/AddFaqQuestionForm'

const Page = async ({ params }: { params: { projectId: string, faqId: string } }) => {
    const session = await getSession()
    if(!session || !session.user || !session.user.email) redirect('/sign-in')

    const userData = await fetchUser(session.user.email)

    const faq = await fetchFaqComponent(params.faqId)

    const { primary, text, bg } = faq.styles.pallet.colors

    return (
        <section className={`w-full max-w-xl mx-auto my-12 p-6 rounded-lg shadow`} style={{backgroundColor: bg, color: text}}>
            <div className='flex flex-col items-center'>
                {faq.projectId.logo ? (
                    <Image
                        src={faq.projectId.logo}
                        alt={faq.projectId.name}
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
                <h1 className={`text-xl font-bold mt-3`} >{faq.projectId.name}</h1>
                <h1 className={`text-lg font-bold mt-4 text-center`} >{faq.name}</h1>
                <p>Ask your Question</p>
                <p className='self-start mb-3 font-bold text-sm'>faqs: {faq.analytics.totalDataBasedOnCards}</p>
                <AddFaqForm
                    primaryColor={primary}
                    bgColor={bg}
                    textColor={text}
                    user={{
                      id: userData._id,
                      image: userData.image,
                      name: userData.fullName || '',
                      email: userData.email
                    }}
                    faqId={params.faqId}
                    projectId={params.projectId}
                />
            </div>
        </section>
    )
}

export default Page

// app/(root)/dashboard/[projectId]/comments/[commentId]/page.tsx
import AnalyticCards from '@/components/cards/AnalyticCards'
import Comments from '@/components/cards/Comments'
import EmbeddedLink from '@/components/cards/EmbeddedLink'
import StyleComponent from '@/components/cards/StyleComponent'
import { fetchCommentComponent } from '@/lib/actions/comment.actions'
import { getSession } from '@/lib/getSession'
import { commentComponentStyle } from '@/utils/data'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaGlobe, FaLink } from 'react-icons/fa6'

const Page = async({ params, searchParams } : { 
    params: { projectId: string, commentId: string },
    searchParams?:{
        page?: string
    } 
}) => {
    const session = await getSession()
    if(!session || !session.user || !session.user.email) redirect('/sign-in')

    const comment = await fetchCommentComponent(params.commentId)
    if(comment.userId._id != session.userId) return redirect('/dashboard')

    
    
    const custom = commentComponentStyle.pallet.find(item => item.name == 'custom')
    if(!custom){ commentComponentStyle.pallet.push({name: 'custom',colors:{primary:comment.styles.pallet.colors.primary,text:comment.styles.pallet.colors.text,bg:comment.styles.pallet.colors.bg}}) }
    
    

  return (
    <section className="w-full h-full flex flex-col justify-start py-24 gap-10">
        <div className='flex flex-col gap-1'>
            <h1 className={`font-bold text-3xl mt-2`}>Comment - {comment.name}</h1>
            <p>{comment.projectId.name+' / '+comment.name}</p>
            <p>{comment.content}</p>
            <p className="text-xs opacity-40 font-bold">{comment._id}</p>
        </div>
        <div className="flex gap-3 items-center justify-start">
            {comment.projectId.logo ? 
            <Image
                src={comment.projectId.logo}
                alt={comment.projectId.name}
                width={50}
                height={50}
                className="object-contain bg-white p-2 rounded-full"
            /> : <div className="rounded-full text-3xl bg-white text-black p-2"><FaGlobe/></div>}
            <div>
                <p className="font-bold ">{comment.projectId.name}</p>
                <a href={comment.projectId.url} target="_blank" rel="noopener noreferrer" className="flex gap-2  items-center text-sm underline">
                {comment.projectId.url} <FaLink/>
                </a>
            </div>
        </div>
        
        <AnalyticCards analytics={comment.analytics} />

        <div>
            <h1 className={`font-bold text-xl mt-2`}>{comment.name}</h1>
            <p>Visit Your comment form how it looks</p>
            <Link href={`/dashboard/${params.projectId}/comments/${params.commentId}/add`} 
                className="flex gap-2 items-center border-2 w-fit mt-3 px-6 py-2 font-bold rounded-md border-borderColor"
                style={{backgroundColor: comment.styles.pallet.colors.primary, color:comment.styles.pallet.colors.text}}    
            >
                Share This link to your customers <FaLink/> 
            </Link>
        </div>
        <div>
            <EmbeddedLink
                content='Add Your Comment'
                componentId={params.commentId}
                projectId={params.projectId}
                styles={comment.styles}
                type='comments'
            />
        </div>

        
        <div className='flex flex-col gap-5'>
            <h1 className={`font-bold text-3xl mt-2 `}>Comments <span>({comment.analytics.totalDataBasedOnCards})</span> </h1>
            <div className='flex rounded-lg overflow-hidden'>
                <Comments 
                    searchParams={{
                        page: searchParams?.page || '1'
                    }}
                    commentId={params.commentId}
                    projectId={params.projectId}
                    styles={comment.styles}
                />
            </div>
        </div>
        <StyleComponent 
            userStyle={{
                layout:comment.styles.layout,
                card:comment.styles.cardStyle,
                pallet:comment.styles.pallet.name
            }}
            styles={commentComponentStyle}
            component={{
                type: 'comment',
                id: params.commentId
            }} 
        />

    </section>
  )
}

export default Page
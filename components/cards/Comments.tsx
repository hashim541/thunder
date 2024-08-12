import { fetchCommentCard } from '@/lib/actions/commentCard.actions'
import React from 'react'
import Pagination from '../Pagination'
import CommentCard from './CommentCard'
import Link from 'next/link'

interface Props{
    searchParams: {
        page: string
    },
    commentId: string,
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

const Comments = async({searchParams,commentId,styles, projectId}: Props) => {
    const currentPage = Number(searchParams?.page) || 1

    const commentCardData = await fetchCommentCard({
        pageNumber:currentPage,
        pageSize: 20,
        commentId: commentId
    })

    if(commentCardData.cards.length == 0){
        return(
            <article>
                No comments- you can see the cards when users have commented
            </article>
        )
    }

  return (
    <article className='self-center flex flex-col items-center justify-center w-full p-6' style={{backgroundColor: styles.pallet.colors.bg, color: styles.pallet.colors.text}}>
        
        
        <div className={`${styles.layout} `}>
            {
                commentCardData.cards.map((item: any) => (
                    <CommentCard key={item._id} data={item} cardStyle={styles.cardStyle} colors={styles.pallet.colors} />
                ))
            }
        </div>

        {/* <Pagination isNext={commentCardData.isNext} primary={styles.pallet.colors.primary} /> */}
    </article>
  )
}

export default Comments
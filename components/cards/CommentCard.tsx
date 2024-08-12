import React from 'react'
import UserCard from './UserCard'
import { formatDateString } from '@/lib/utilsfunc'

interface Props {
    data: {
        _id: string,
        commentId: string,
        author: {
            id: string,
            fullName: string,
            email:string,
            image:string
        }
        content: string,
        createdAt: string
    },
    cardStyle: string,
    colors:{
        primary: string
        text: string
        bg: string
    }
}

const CommentCard = ({data, cardStyle, colors}: Props) => {
  return (
    <article className={`${cardStyle} rounded-md w-full h-fit break-inside-avoid`} style={{borderColor: colors.text+'55'}}>
        <UserCard userData={data.author} card={{
            colors:colors,
            style: cardStyle,
        }} >
            <p className='text-left mt-2 mb-1 text-sm'>{data.content}</p>
            <p className={`text-[10px] font-bold opacity-40 ${cardStyle == 'thread' && 'mb-5'}`}>{formatDateString(data.createdAt)}</p>
        </UserCard>
    </article>
  )
}

export default CommentCard
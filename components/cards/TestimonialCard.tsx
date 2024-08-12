import Image from 'next/image'
import React from 'react'
import Rating from './Rating'
import { formatDateString } from '@/lib/utilsfunc'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6'

interface Props {
    data: {
        _id: string,
        testimonialId: string,
        author: {
            id: string,
            fullName: string,
            email:string,
            image:string
        }
        content: string,
        rating: number,
        createdAt: string
    },
    cardStyle: string,
    colors:{
        primary: string
        text: string
        bg: string
    }
}

const TestimonialCard = ({data, cardStyle, colors}: Props) => {


    if(cardStyle == 'center-items'){
        return (
          <article className={`${cardStyle} rounded-md w-full h-fit break-inside-avoid border-[1px] px-6 py-3 flex flex-col relative overflow-hidden items-center gap-2`} style={{borderColor: colors.text+'20'}}>
            <Image
                src={data.author.image}
                alt='Profile'
                width={40}
                height={40}
                className='rounded-full object-contain'
            />
            <div className='flex flex-col items-center text-center'>
                <h2 className="text-base font-bold">{data.author.fullName}</h2>
                <p className="text-xs opacity-80">{data.author.email}</p>
            </div>

            <BottomHalf rating={data.rating} cardStyle={cardStyle} content={data.content} createdAt={data.createdAt} primary={colors.primary} />          </article>
        )
    }

    if(cardStyle == 'big-profile'){
        return (
          <article className={`${cardStyle} rounded-md w-full h-fit break-inside-avoid border-[1px] flex overflow-hidden`} style={{borderColor: colors.text+'55'}}>
            <Image
                src={data.author.image}
                alt='Profile'
                width={300}
                height={300}
                className='min-w-[150px] flex-1 object-cover'
            />
            <div className='flex flex-col items-start gap-1 px-4 py-3 relative overflow-hidden z-10'>
                <div className='flex flex-col items-start text-start'>
                    <h2 className=" font-bold">{data.author.fullName}</h2>
                    <p className="text-xs opacity-80">{data.author.email}</p>
                </div>
                <BottomHalf rating={data.rating} cardStyle={cardStyle} content={data.content} createdAt={data.createdAt} primary={colors.primary} />            </div>
        </article>
        )
    }

    if(cardStyle == 'simple'){
        return (
          <article className={`${cardStyle} rounded-md w-full h-fit break-inside-avoid border-[1px] flex flex-col gap-2 overflow-hidden px-4 py-3 relative`} style={{borderColor: colors.text+'55'}}>
            <div className='flex  items-start gap-3 mb-1 z-10'>
                <Image
                    src={data.author.image}
                    alt='Profile'
                    width={40}
                    height={40}
                    className=' rounded-full w-10 h-10 object-cover'
                />
                <div className='flex flex-col items-start text-start '>
                    <h2 className="text-sm font-bold">{data.author.fullName}</h2>
                    <p className="text-xs opacity-80">{data.author.email}</p>
                </div>
            </div>
           <BottomHalf rating={data.rating} cardStyle={cardStyle} content={data.content} createdAt={data.createdAt} primary={colors.primary} />
        </article>
        )
    }

}

interface BHProps {
    rating: number
    content: string
    createdAt: string
    cardStyle: string,
    primary: string
}

function BottomHalf({rating,content,createdAt,cardStyle, primary}: BHProps) {
    return (
        <>
            <Rating rating={rating} />
            <p className={`mt-1 text-sm font-normal ${cardStyle == 'center-items' ? 'text-center' : 'text-start'} ${cardStyle == 'big-profile' &&'text-xs'}`}>
                {content}
            </p>
            <p className={`text-[10px] font-bold opacity-40 self-start mt-2`}>{formatDateString(createdAt)}</p>
            <FaQuoteLeft  className='opacity-10 text-8xl absolute -top-4 -left-5' style={{color: primary}}/>
            <FaQuoteRight className='opacity-10 text-8xl absolute -bottom-4 -right-5' style={{color: primary}}/>
        </>
    )
}

export default TestimonialCard
// 'use client'; // Mark this file as a client component

import Image from 'next/image';
import React, { useState } from 'react';
import { FaInfoCircle, FaQuestionCircle, FaQuoteLeft, FaSortDown } from 'react-icons/fa';
import { FaQuoteRight } from 'react-icons/fa6';

interface Props {
    data: {
        _id: string;
        faqId: string;
        author: {
            id: string;
            fullName: string;
            email: string;
            image: string;
        };
        question: string;
        answer: string;
        createdAt: string;
    };
    cardStyle: string;
    colors: {
        primary: string;
        text: string;
        bg: string;
    };
}

const FaqCards = ({ data, cardStyle, colors }: Props) => {

    return (
        <article className={`flex flex-col w-full ${cardStyle} gap-2 border-2 rounded-lg px-6 py-3 relative overflow-hidden`} style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.text+'30' }}>
            <div className='flex items-center justify-between gap-3'>
                <div className="flex flex-1 items-center gap-3">
                    {cardStyle != 'simple' && (
                        <Image
                            src={data.author.image}
                            alt='profile'
                            width={40}
                            height={40}
                            className='rounded-full object-contain'
                        />
                    )}
                    <div className={`${cardStyle == 'simple' && 'flex flex-col-reverse'} w-full`}>
                        <p  className={` ${cardStyle == 'simple' && 'self-end'} text-sm`}>{cardStyle == 'simple'&& '-'}{data.author.fullName}</p>
                        <p  className="text-base font-bold">{data.question}</p>
                    </div>
                </div>
                <button ><FaSortDown /></button>
            </div>
            
            <p className={`${ cardStyle !='simple' && 'ml-[50px]'} test-base`}>{data.answer}</p>
            <FaInfoCircle className='opacity-10 text-8xl absolute -bottom-4 -right-5' style={{color: colors.primary}}/>
        </article>
    );
}

export default FaqCards;

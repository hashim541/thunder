// 'use client'
import Image from 'next/image'
import AnswerForm from './AnswerForm'

interface Props {
    user: {
        id: string,
        fullName: string,
        email:string
        image: string
    }
    faqCardId: string,
    question: string,
}

const AnswerFaqQuestionForm = ({user,faqCardId,question}: Props) => {
    

    return (
        <div className='w-full border-2 border-borderColor px-6 py-4 rounded-md'>
            <div className='flex items-start gap-3'>
                <Image
                    src={user.image}
                    alt='profile'
                    width={35}
                    height={35}
                    className='rounded-full object-contain'
                />
                <div className='flex-1'>
                    <div>
                        <p className='font-bold text-sm'>{user.fullName}</p>
                        <p className='text-xs opacity-80 '>{user.email}</p>
                    </div>
                    <p className='mt-2 text-sm font-bold'>{question}</p>
                    
                </div>
            </div>
            <AnswerForm faqCardId={faqCardId} />
        </div>
    )
}

export default AnswerFaqQuestionForm
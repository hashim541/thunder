'use client'
import { updateFaqQuestion } from '@/lib/actions/faqCard.actions'
import { formatDateString } from '@/lib/utilsfunc'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

const AnswerForm = ({faqCardId}: {faqCardId: string}) => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const pathname = usePathname()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)
        setError(null)

        await updateFaqQuestion({
            faqId: faqCardId,
            answer: content,
            pathname: pathname
        })

        setLoading(false)
        setSuccess(true)
        setContent('')
    }
  return (
    <form onSubmit={handleSubmit} className='w-full mt-3 flex flex-col'>
        <textarea
            name='content'
            value={content}
            onChange={handleChange}
            minLength={3}
            rows={4}
            placeholder='Your answer...'
            className='w-full p-2 border-[1px] rounded-lg text-sm mb-4 bg-transparent min-w-[300px] border-borderColor'
            // style={{backgroundColor: bgColor, borderColor: textColor+'20'}}
        />
        <button
            type='submit'
            className={`w-fit px-3 py-2 self-end rounded-lg font-bold bg-primary text-sm`}
            disabled={loading}
            // style={{backgroundColor: primaryColor, color: textColor}}
        >
            {loading ? 'Submitting...' : 'Submit'}
        </button>
        {success && <p className='mt-2 text-green-600 flex items-center'><FaCheck className='mr-2' /> Comment submitted successfully!</p>}
        {error && <p className='mt-2 text-red-600 flex items-center'><FaTimes className='mr-2' /> {error}</p>}
    </form>
  )
}

export default AnswerForm
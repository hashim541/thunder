'use client'
import React from 'react'
import { FaCopy } from 'react-icons/fa6'

interface Props{
    content: string
    componentId: string,
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
    type: 'comments' | 'testimonials' | 'faqs'
}

const EmbeddedLink = ({ componentId, styles, projectId, content,type }: Props) => {

    const data = `
<!-- Add this code to your HTML -->
<iframe src="https://thunder-theta.vercel.app/embedded/${projectId}/${type}/${componentId}?page=1" width="100%" height="500px" frameborder="0"></iframe>  
<a href="https://thunder-theta.vercel.app/dashboard/${projectId}/${type}/${componentId}/add">
    <button>${content}</button>
</a>
                `;
    return (
        <div className='flex flex-col rounded-lg overflow-hidden'>
            <div className='text-white bg-gray-600 flex justify-between py-2 px-6'>
                <p className='font-bold font-mono'>index.html</p>
                <button title='Copy'
                onClick={()=>{
                    navigator.clipboard.writeText(data)
                }}
                ><FaCopy /></button>
            </div>

            <pre className='overflow-x-scroll max-w-full bg-gray-900 text-white px-10'>
                <code >
                {data}
                </code>
            </pre>
        </div>
    );
};



export default EmbeddedLink;
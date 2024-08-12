'use client'
import { updateComponentStyle } from '@/lib/actions/project.actions'
import { getContrastingColor } from '@/lib/utilsfunc'
import { usePathname, useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { FaColonSign } from 'react-icons/fa6'

interface Props {
    component: {
        type: 'comment' | 'testimonial' | 'faq',
        id: string
    }
}

const CustomPalletForm = ({component}: Props) => {

    const pathname = usePathname()
    

    const [palletState, setPalletState] = useState<{
        [key: string]: string 
    }>({
        primary: '#21b0fe',
        text: '#2b2d42',
        bg: '#ffffff'
    })

    const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateComponentStyle({
            id:component.id,
            pallet:{
                name: 'custom',
                colors:{
                    primary: palletState.primary,
                    text: palletState.text,
                    bg: palletState.bg,
                }
            },
            type:component.type,
            pathname
        })

    }

    const handleChange = (name: string, value: string) => {
        const newpalletState = { ...palletState };
        newpalletState[name] = value
        
        setPalletState(newpalletState);
    };
    

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full mt-5'>

        <div className='flex gap-0 w-full flex-1 '>
            
            <div className='relative w-full'>
                <input
                    type="color"
                    name='primary'
                    value={palletState.primary}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='color m-0 bg-background'
                    
                />
                <div className='absolute bottom-3 right-0 left-0 flex flex-col text-xs font-bold justify-center items-center'
                    style={{color: getContrastingColor(palletState.primary)}}
                >
                    <p>Primary</p>
                    <p>{palletState.primary}</p>  
                </div>
            </div>
        
            <div className='relative w-full'>
                <input
                    type="color"
                    name='text'
                    value={palletState.text}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='color  bg-background'
                />
                <div className='absolute bottom-3 right-0 left-0 flex flex-col text-xs font-bold justify-center items-center'
                    style={{color: getContrastingColor(palletState.text)}}
                >
                    <p>Text</p>
                    <p>{palletState.text}</p>  
                </div>
            </div>

            <div className='relative w-full'>
                <input
                    type="color"
                    name='bg'
                    value={palletState.bg}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='color  bg-background'
                />
                <div className='absolute bottom-3 right-0 left-0 flex flex-col text-xs font-bold justify-center items-center'
                    style={{color: getContrastingColor(palletState.bg)}}
                >
                    <p>Background</p>
                    <p>{palletState.bg}</p>  
                </div>
            </div>
        </div>

            <button type='submit' className='bg-primary w-fit self-end text-white font-bold px-4 py-2 rounded flex items-center gap-2' >
                Save
            </button>
    </form>
  )
}

export default CustomPalletForm
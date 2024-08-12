'use client'
import Image from 'next/image'
import React from 'react'
import CustomPalletForm from '../forms/CustomPalletForm'
import { usePathname, useRouter } from 'next/navigation'
import { updateComponentStyle } from '@/lib/actions/project.actions'


interface Props {
    pallets: {
        name: string,
        colors: {
            primary:string,
            text:string,
            bg:string
        }
    }[],
    userPallet: string,
    component: {
        type: 'comment' | 'testimonial' | 'faq',
        id: string
    }
}


const ColorPallet = ({pallets, userPallet, component}: Props) => {

    const pathname = usePathname()

    const handelClick = async(name: string) => {
        const pallet = pallets.find(item => item.name == name)!
        await updateComponentStyle({
            id:component.id,
            pallet:{
                name: name,
                colors:{
                    primary: pallet.colors.primary,
                    text: pallet.colors.text,
                    bg: pallet.colors.bg,
                }
            },
            type:component.type,
            pathname
        })
    }    

  return (
    <div className='flex-1 min-w-[300px] max-w-[500px] break-inside-avoid '>
        <h2 className={`font-bold text-2xl flex gap-3 mt-2`}><Image src={'/assets/svgs/pallet.svg'} alt='color pallet' width={30} height={30}  className='p-1 rounded-full bg-white object-contain w-9 h-9' />Color Pallet</h2>
        <div className='flex flex-col gap-5'>
            <CustomPalletForm component={{
                type: component.type,
                id: component.id
            }} />
            <div className='flex flex-wrap gap-5 mt-5'>
                {pallets.map(item =>(
                    <div key={item.name} className={`p-3 rounded-lg border-2 flex-1 flex flex-col items-center ${ item.name == userPallet ? 'border-primary' : 'border-borderColor'}`} onClick={() => handelClick(item.name)}>
                        <div className='flex rounded-md overflow-hidden shadow w-fit items-center'>
                            <div className={`w-[43px] h-[80px]`} style={{background: item.colors.primary}}></div>
                            <div className={`w-[43px] h-[80px] `} style={{background:   item.colors.text}}></div>
                            <div className={`w-[43px] h-[80px] `} style={{background:   item.colors.bg}}></div>
                        </div>
                        <p className='text-center mt-2 capitalize'>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ColorPallet
'use client'
import { commentComponentStyle } from '@/utils/data'
import Image from 'next/image'
import React from 'react'
import ColorPallet from './ColorPallet'
import { updateComponentStyle } from '@/lib/actions/project.actions'
import { usePathname } from 'next/navigation'

interface Props {
    styles: {
        layout: {
            name: string;
            img: string;
        }[];
        cardStyle: {
            name: string;
            img: string;
        }[];
        pallet: {
            name: string;
            colors: {
                primary: string;
                text: string;
                bg: string;
            };
        }[];
    }
    component: {
        type: 'comment' | 'testimonial' | 'faq',
        id: string
    },
    userStyle: {
        layout:string,
        card:string,
        pallet:string
    }
}

const StyleComponent = ({styles, component, userStyle}: Props) => {

    const pathname = usePathname()

    const handelChange = async(type: 'layout' | 'card', name: string) => {

        if(type == 'layout'){
            await updateComponentStyle({
                id:component.id,
                layout:name,
                type:component.type,
                pathname
            })
        } else {
            await updateComponentStyle({
                id:component.id,
                cardStyle:name,
                type:component.type,
                pathname
            }) 
        }
    }

  return (
    <article className='flex gap-5 flex-col sm:flex-row sm:flex-wrap'>
        <ColorPallet pallets={styles.pallet} userPallet={userStyle.pallet} component={{
            type: component.type,
            id: component.id
        }} />
        <div className='flex-1 min-w-[200px] break-inside-avoid'>
            <h2 className={`font-bold text-2xl flex gap-3 mt-2`}> <Image src={'/assets/svgs/layout.svg'} alt='layout' width={30} height={30}  className='p-1 rounded-full bg-white object-contain w-9 h-9' />Component Layout</h2>
            <div className='flex flex-wrap gap-5 mt-5'>
                {styles.layout.map(item =>(
                    <div key={item.name} className={`p-3 rounded-lg ${item.name == userStyle.layout && 'border-primary'} border-2 border-borderColor bg-background`} onClick={()=>handelChange('layout',item.name)}>
                        <Image
                            src={`/assets/images/${item.img}`}
                            alt={item.name}
                            width={100}
                            height={100}
                            className='w-full rounded-md'
                        />
                        <p className='text-center mt-2 capitalize'>{item.name.split('-').join(' ')}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className='flex-1 min-w-[200px] break-inside-avoid'>
            <h2 className={`font-bold text-2xl flex gap-3 mt-2`}><Image src={'/assets/svgs/styleCard.svg'} alt='style card' width={40} height={40} className='p-1 rounded-full bg-white object-contain w-9 h-9' />Card style</h2>
            <div className='flex flex-wrap gap-5 mt-5'>
                {styles.cardStyle.map(item =>(
                    <div key={item.name} className={`p-3 rounded-lg border-2 flex flex-col ${item.name == userStyle.card && 'border-primary'} border-borderColor bg-background`} onClick={()=>handelChange('card',item.name)}>
                        <Image
                            src={`/assets/images/${item.img}`}
                            alt={item.name}
                            width={100}
                            height={100}
                            className='w-full rounded-md  mt-auto'
                        />
                        <p className='text-center capitalize mt-auto'>{item.name.split('-').join(' ')}</p>
                    </div>
                ))}
            </div>
        </div>

    </article>
  )
}



export default StyleComponent
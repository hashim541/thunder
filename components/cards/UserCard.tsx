import Image from 'next/image'
import React from 'react'

interface Props {
    userData: {
        id: string,
        fullName: string,
        email: string,
        image: string 
    },
    children ?: React.ReactNode,
    card?: {
      style:string,
      colors:{
          primary: string
          text: string
          bg: string
      }
    }
}

const UserCard = ({userData,children,card}: Props) => {
  return (
    <div className='flex w-full flex-1 flex-row gap-4'>
        <div className='flex flex-col items-center'>
          <Image
            src={userData.image}
            alt='Profile'
            width={40}
            height={40}
            className="rounded-full min-w-10 h-10 object-contain border-2"
            style={{borderColor: card?.colors.primary}}
          />
          <div className='relative w-[1px] grow' style={card?.style == 'thread' ? {backgroundColor: card.colors.text+'20'} : {}}></div>
        </div>
        <div>
          <h2 className="text-base font-bold">{userData.fullName}</h2>
          <p className="text-xs opacity-80">{userData.email}</p>
          {children}
        </div>
    </div>
  )
}

export default UserCard
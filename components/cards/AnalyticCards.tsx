import React from 'react'
import { FaUser } from 'react-icons/fa6'
import UserCard from './UserCard'

interface Props {
    analytics:{
        totalUsersBasedOnCards: number,
        totalDataBasedOnCards: number,
        activeUsersCount: number,
        lastMonthUsers: any[],
        type: 'comment' | 'testimonial' | 'faq'
    }
}

const AnalyticCards = ({analytics}: Props) => {
  return (
    <div className='flex flex-col md:flex-row gap-5 w-full'> 
        <div className='w-full md:w-fit border-2 border-borderColor rounded-md flex flex-col gap-3 py-4 px-8 '>
            <h3 className='text-lg font-bold flex gap-2 items-center mb-2'> <FaUser className='rounded-full'/>Users - (last 30 days)</h3>
            {analytics.lastMonthUsers.length == 0 && <p>No Users</p>}
            {analytics.lastMonthUsers.map((item:any) => (

                <UserCard key={item.id} userData={{
                    id:item.author.id,
                    fullName:item.author.fullName,
                    email:item.author.email,
                    image:item.author.image,
                }} />
            ))}
        </div>
        <div className='flex-1 grid grid-cols-2 gap-5 '>
            <div className=' col-span-1 flex flex-col gap-3 justify-center items-center border-2 border-borderColor rounded-md p-4 '>
                <p className='text-4xl font-bold flex gap-2 items-center'>{analytics.totalUsersBasedOnCards}</p>
                <p className='font-bold text-center'>Distinct Users <span className="text-xs opacity-40 font-bold">(All time)</span></p>
            </div>
            <div className='col-span-1 flex flex-col gap-3 justify-center items-center border-2 border-borderColor rounded-md px-4 py-4'>
                <p className='text-4xl font-bold flex gap-2 items-center'>
                    {analytics.totalDataBasedOnCards}
                </p>
                <p className='font-bold text-center'>Total {analytics.type}s <span className="text-xs opacity-40 font-bold">(All time)</span></p>
            </div>
            <div className='col-span-2 flex flex-col gap-3 justify-center items-center border-2 border-borderColor rounded-md px-4 py-4'>
                <p className='text-4xl font-bold'>{analytics.activeUsersCount}</p>
                <p className='font-bold text-center'>Active User <span className="text-xs opacity-40 font-bold">(30-days)</span></p>
            </div>
        </div>
    </div>
  )
}

export default AnalyticCards
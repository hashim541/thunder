// // app/(auth)/onboarding.tsx
// 'use client'
// import { updateUser } from '@/lib/actions/user.actions'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { FormEvent } from 'react'

// const page = () => {

//     // const router = useRouter()
    
//     // if(!user){
//     //     router.push('/sign-up')
//     //     return null
//     // } 
    
//     // const userData = {
//     //     id: user.id,
//     //     fullname: user.fullName || '',
//     //     email: user.emailAddresses[0].emailAddress || '',
//     //     image: user.imageUrl || ''
//     // }

//     const handelForm = async(e: FormEvent<HTMLFormElement>) => {
//         // e.preventDefault()

//         // await updateUser(userData)

//         // router.push('/dashboard')
//     }

//     return (
//         <section className='h-screen w-full flex justify-center items-center'>
//             <section className='flex flex-col justify-center items-center gap-1 border-borderColor border-2 px-12 py-8 shadow-lg rounded-lg w-full my-2 max-w-[500px] '>
//                 <h2 className=' text-center text-2xl font-bold'>On Boarding</h2>
//                 <p className='text-center '>Click create to confirm</p>

//                 <form className='flex flex-col items-start justify-start gap-3 mt-5' onSubmit={handelForm}>
//                     <Image 
//                         src={''}
//                         alt='profile photo'
//                         width={50}
//                         height={50}
//                         className='rounded-full self-center border-2 border-yellow-400 '
//                     />
//                     <div className='flex flex-col gap-1'>
//                         <label htmlFor="fullname" className='font-semibold'>FullName</label>
//                         <input type="text" name='fullname' value={''} className='border-[1px] rounded-sm px-2 py-1 w-full min-w-[350px]' />
//                     </div>
//                     <div className='flex flex-col gap-1'>
//                         <label htmlFor="email" className='font-semibold'>Email</label>
//                         <input type="text" name='email' value={''} className='border-[1px] rounded-sm px-2 py-1 w-full min-w-[350px]'/>
//                     </div>
//                     <button type='submit' className='bg-yellow-400 text-white text-wrap rounded shadow px-4 py-2 self-end font-bold mt-2'>Create account</button>
//                 </form>

//             </section>
//         </section>
//     )
// }

// export default page
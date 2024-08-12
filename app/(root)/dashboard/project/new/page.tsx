// app/(root)/dashboard/project/new/page.tsx
import ProjectForm from '@/components/forms/ProjectForm'
import { fetchUser } from '@/lib/actions/user.actions'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { FaFolderPlus } from 'react-icons/fa'

const page = async() => {

    const session =await getSession()
    
    if(!session || !session.user || !session.user.email) redirect('/sign-in')

    const userData= await fetchUser(session.user.email)

    const formatData = {
        id: userData._id,
        email: userData.email,
        image: userData.image,
        fullName: userData.fullName || '',
    }

    return (
        <section className="w-full h-full flex flex-col justify-center items-center py-10 gap-10">
            
            <h1 className='text-center text-2xl font-bold flex flex-col items-center'><FaFolderPlus />Create a New Project</h1>
            <ProjectForm formatData={formatData} />
        </section>
    )
}

export default page
import FaqForm from "@/components/forms/FaqForm"
import { fetchUser } from "@/lib/actions/user.actions"
import { getSession } from "@/lib/getSession"
import { redirect } from "next/navigation"
import { FaQuestion, FaStar } from "react-icons/fa6"


const page = async({params}: { params: { projectId: string } }) => {
  const session = await getSession()
  if(!session || !session.user || !session.user.email) redirect('/sign-in')

  const userData= await fetchUser(session.user.email)

  return (
    <section className="w-full h-full flex flex-col justify-center items-center py-10 gap-10">
            
        <h1 className='text-center text-2xl font-bold flex gap-4 items-center'><FaQuestion />Testimonial Component</h1>
        <FaqForm faqForm={{
            userId: userData._id,
            projectId: params.projectId
        }} />
        {/* <ProjectForm formatData={formatData} /> */}
    </section>
  )
}

export default page
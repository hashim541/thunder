import { fetchUnAnsweredQuestion } from "@/lib/actions/faqCard.actions"
import Pagination from "../Pagination"
import AnswerFaqQuestionForm from "../forms/AnswerFaqQuestionForm"

interface Props {
    userId: string,
    faqId: string,
    searchParams: {
        page: number
    }
}

const AnswerSomeQuestion = async ({userId,faqId,searchParams}: Props) => {

    const faqList = await fetchUnAnsweredQuestion({
        pageNumber: searchParams.page,
        pageSize: 4,
        faqId: faqId
    })
    
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full mt-5">

        {faqList.cards.length > 0 ? 
            <>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {
                        faqList.cards.map((item: any) => (
                            <AnswerFaqQuestionForm user={item.author} faqCardId={item._id} question={item.question} />
                        ))
                    }
                </div>
                <Pagination isNext={faqList.isNext} primary="#c9db2f" />
            </>
         : <>
            <p>No Questions Asked 😐.</p>
         </>}
    </div>
  )
}

export default AnswerSomeQuestion

import { fetchAnsweredQuestions } from '@/lib/actions/faqCard.actions'
import React from 'react'
import FaqCards from './FaqCards'


interface Props{
    searchParams: {
        page: number
    },
    faqId: string,
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
}

const Faqs = async({searchParams,faqId,styles, projectId}: Props) => {

    const faqList = await fetchAnsweredQuestions({
        pageNumber: searchParams.page,
        pageSize: 10,
        faqId: faqId
    })

    if(faqList.cards.length == 0){
        return(
            <article>
                No comments- you can see the cards when users have commented
            </article>
        )
    }

  return (
    <article className='self-center flex flex-col items-center justify-center w-full p-6' style={{backgroundColor: styles.pallet.colors.bg, color: styles.pallet.colors.text}}>
    
        <div className={`${styles.layout} `}>
            {
                faqList.cards.map((item: any) => (
                    <FaqCards key={item._id} data={item} cardStyle={styles.cardStyle} colors={styles.pallet.colors} />
                ))
            }
        </div>

    </article>
  )
}

export default Faqs
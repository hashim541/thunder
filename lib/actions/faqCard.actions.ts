'use server'

import { revalidatePath } from "next/cache"
import FaqCard from "../models/FaqCard"
import { connectToDB } from "../mongoose"
import User from "../models/User"

interface Props {
    faqId: string
    author?: string,
    question?:string,
    answer?:string,
    pathname?: string
}

export async function createFaqQuestion(cardData: Props) {
    try {
        await connectToDB()

        await FaqCard.create({
            faqId: cardData.faqId,
            author: cardData.author,
            question: cardData.question
        })

    } catch (error: any) {
        console.error(`Failed to create faq card: ${error.message}`);
        throw new Error(`Failed to create faq card: ${error.message}`);
    }
}

export async function updateFaqQuestion(cardData: Props) {
    try {
        await connectToDB()

        await FaqCard.findByIdAndUpdate(
            cardData.faqId,
            { answer: cardData.answer },
            { new: true }
        )
        .populate('author')

        if(cardData.pathname) revalidatePath(cardData.pathname)

    } catch (error: any) {
        console.error(`Failed to update faq card: ${error.message}`);
        throw new Error(`Failed to update faq card: ${error.message}`);
    }
}

export async function fetchUnAnsweredQuestion({pageNumber = 1, pageSize = 5, faqId}:{pageNumber: number, pageSize: number, faqId:string}){
    try {
        connectToDB()

        const skipAmount = (pageNumber-1)*pageSize

        const postQuery = FaqCard.find({faqId: faqId, answer: ''})
            .sort({createdAt: 'desc'})
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ path: 'author', model: User, select: "id fullName email image" })
            

        const totalPostCount = await FaqCard.find({faqId: faqId, answer: ''}).countDocuments({faqId: faqId})

        const posts = await postQuery.exec();

        const isNext = totalPostCount > skipAmount+posts.length;
        
        return {cards:posts, isNext}
    } catch (error: any) {
        throw new Error (`Unable to fetch Faq Card: ${error.message}`)
    }
}

export async function fetchAnsweredQuestions({pageNumber = 1,pageSize = 10,faqId}: {pageNumber: number, pageSize: number, faqId: string}) {
    try {
        await connectToDB(); 

        const skipAmount = (pageNumber - 1) * pageSize;

        const postQuery = FaqCard.find({ faqId: faqId, answer: { $ne: '' } }) 
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ path: 'author', model: User, select: 'id fullName email image' });

        const totalAnsweredCount = await FaqCard.countDocuments({ faqId: faqId, answer: { $ne: '' } });

        const posts = await postQuery.exec();

        const isNext = totalAnsweredCount > skipAmount + posts.length;

        return { cards: posts, isNext };
        
    } catch (error: any) {
        throw new Error(`Unable to fetch answered questions: ${error.message}`);
    }
}
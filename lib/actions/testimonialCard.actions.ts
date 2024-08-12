'use server'
import CommentCard from "../models/CommentCard";
import Testimonial from "../models/Testimonial";
import TestimonialCard from "../models/TestimonialCard";
import User from "../models/User";
import { connectToDB } from "../mongoose";



interface CreateTestimonialCard {
    testimonialId: string,
    author:string,
    content: string,
    rating: number
}

export async function createTestimonialCard(cardData: CreateTestimonialCard) {
    try {
        await connectToDB()

        await TestimonialCard.create({
            testimonialId: cardData.testimonialId,
            author: cardData.author,
            content: cardData.content,
            rating: cardData.rating
        })

    } catch (error: any) {
        console.error(`Failed to create or update testimonial card: ${error.message}`);
        throw new Error(`Failed to create or update testimonial card: ${error.message}`);
    }
}
export async function fetchTestimonialCard({pageNumber = 1, pageSize = 20, testimonialId}:{pageNumber: number, pageSize: number, testimonialId:string}){
    try {
        connectToDB()

        const skipAmount = (pageNumber-1)*pageSize

        const postQuery = TestimonialCard.find({testimonialId: testimonialId})
            .sort({createdAt: 'desc'})
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ path: 'author', model: User, select: "id fullName email image" })
            

        const totalPostCount = await TestimonialCard.countDocuments({testimonialId: testimonialId})

        const posts = await postQuery.exec();

        const isNext = totalPostCount > skipAmount+posts.length;
        
        return {cards:posts, isNext}

    } catch (error: any) {
        throw new Error (`Unable to fetch Testimonial Card: ${error.message}`)
    }
}
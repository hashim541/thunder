'use server'
import CommentCard from "../models/CommentCard";
import User from "../models/User";
import { connectToDB } from "../mongoose";



interface CreateCommentCard {
    commentId: string,
    author:string,
    content: string,
}

export async function createCommentCard(cardData: CreateCommentCard) {
    try {
        await connectToDB()

        await CommentCard.create({
            commentId: cardData.commentId,
            author: cardData.author,
            content: cardData.content
        })

    } catch (error: any) {
        console.error(`Failed to create or update comment card: ${error.message}`);
        throw new Error(`Failed to create or update comment card: ${error.message}`);
    }
}
export async function fetchCommentCard({pageNumber = 1, pageSize = 20, commentId}:{pageNumber: number, pageSize: number, commentId:string}){
    try {
        connectToDB()

        const skipAmount = (pageNumber-1)*pageSize

        const postQuery = CommentCard.find({commentId: commentId})
            .sort({createdAt: 'desc'})
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ path: 'author', model: User, select: "id fullName email image" })
            

        const totalPostCount = await CommentCard.countDocuments({commentId: commentId})

        const posts = await postQuery.exec();

        const isNext = totalPostCount > skipAmount+posts.length;
        
        return {cards:posts, isNext}

    } catch (error: any) {
        throw new Error (`Unable to fetch Comment Card: ${error.message}`)
    }
}
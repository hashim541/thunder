'use server'

import { revalidatePath } from "next/cache"
import Comment from "../models/Comment"
import Project from "../models/Project"
import User from "../models/User"
import { connectToDB } from "../mongoose"
import Testimonial from "../models/Testimonial"
import Faq from "../models/Faq"
import CommentCard from "../models/CommentCard"
import { getDateRange } from "../utilsfunc"
import mongoose from "mongoose"


interface Props {
    userId: string,
    projectId: string,
    name: string,
    content: string
}

export async function CreateCommentComponent(commentData: Props){
    try {
        await connectToDB()
        
        const comment = await Comment.create({
            userId: commentData.userId,
            projectId: commentData.projectId,
            name: commentData.name,
            content: commentData.content
        })

        await Project.findByIdAndUpdate(
            commentData.projectId,
            { $push: { 'components.comments': comment._id } },
            { new: true }
        )
        
    } catch (error: any) {
        console.error(`Failed to create or update comment: ${error.message}`);
        throw new Error(`Failed to create or update comment: ${error.message}`);
    }
}


export async function fetchCommentComponent(commentId: string) {
    try {
        await connectToDB();

        const { startDate, endDate } = getDateRange();

        // Fetch the comment and related data
        const commentPromise = Comment
            .findById(commentId)
            .populate('userId')
            .populate({
                path: 'projectId',
                select: "name url description logo createdAt updatedAt"
            });

        const totalUsersBasedOnCardsPromise = CommentCard.aggregate([
            { $match: { commentId: new mongoose.Types.ObjectId(commentId) } },
            { $group: { _id: "$author" } },
            { $count: "totalUsers" }
        ]).then(result => result[0]?.totalUsers || 0);

        const totalCommentsBasedOnCardsPromise = CommentCard.distinct('commentId', { commentId }).countDocuments();

        const activeUsersCountPromise = CommentCard.aggregate([
            { $match: { commentId: new mongoose.Types.ObjectId(commentId), createdAt: { $gte: endDate, $lt: startDate } }},
            { $group: { _id: "$author" } },
            { $count: "activeUsersCount" }
        ]).then(result => result[0]?.activeUsersCount || 0);

        const lastMonthUsersPromise = CommentCard.aggregate([
            { $match: { commentId: new mongoose.Types.ObjectId(commentId), createdAt: { $gte: endDate, $lt: startDate } }},
            { $group: { _id: "$author", doc: { $first: "$$ROOT" } }},
            { $replaceRoot: { newRoot: "$doc" }},
            { $limit: 5 },
            { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" }},
            { $unwind: "$author" }
        ]);

        // Execute all promises concurrently
        const [comment, totalUsersBasedOnCards, totalCommentsBasedOnCards, activeUsersCount, lastMonthUsers] = await Promise.all([
            commentPromise,
            totalUsersBasedOnCardsPromise,
            totalCommentsBasedOnCardsPromise,
            activeUsersCountPromise,
            lastMonthUsersPromise
        ]);

       

        comment.analytics = {
            totalUsersBasedOnCards,
            totalDataBasedOnCards: totalCommentsBasedOnCards,
            activeUsersCount,
            lastMonthUsers,
            type: 'comment'
        };

        return comment;

    } catch (error: any) {
        console.error(`Error fetching comment component: ${error.message}`);
        throw new Error(`Failed to fetch comment component: ${error.message}`);
    }
}
'use server'

import mongoose from "mongoose"
import Faq from "../models/Faq"
import FaqCard from "../models/FaqCard"
import Project from "../models/Project"
import { connectToDB } from "../mongoose"
import { getDateRange } from "../utilsfunc"

interface Props {
    userId: string,
    projectId: string,
    name: string
}

export async function createFaqComponent(faqData: Props){
    try {
        await connectToDB()
        const faq = await Faq.create({
            userId: faqData.userId,
            projectId: faqData.projectId,
            name: faqData.name,
        })

        await Project.findByIdAndUpdate(
            faqData.projectId,
            { $push: { 'components.faqs': faq._id } },
            { new: true }
        )
        
    } catch (error: any) {
        console.error(`Failed to create or update faq: ${error.message}`);
        throw new Error(`Failed to create or update faq: ${error.message}`);
    }
}


export async function fetchFaqComponent(faqId: string) {
    try {
        await connectToDB();

        const { startDate, endDate } = getDateRange();

        const faqPromise = Faq
            .findById(faqId)
            .populate('userId')
            .populate({
                path: 'projectId',
                select: 'name url description logo createdAt updatedAt'
            });

        const totalUsersBasedOnCardsPromise = FaqCard.aggregate([
            { $match: { faqId: new mongoose.Types.ObjectId(faqId) } },
            { $group: { _id: '$author' } },
            { $count: 'totalUsers' }
        ]).then(result => result[0]?.totalUsers || 0);

        const totalCommentsBasedOnCardsPromise = FaqCard.distinct('faqId', { faqId }).countDocuments();

        const activeUsersCountPromise = FaqCard.aggregate([
            { $match: { faqId: new mongoose.Types.ObjectId(faqId), createdAt: { $gte: endDate, $lt: startDate } } },
            { $group: { _id: '$author' } },
            { $count: 'activeUsersCount' }
        ]).then(result => result[0]?.activeUsersCount || 0);

        const lastMonthUsersPromise = FaqCard.aggregate([
            { $match: { faqId: new mongoose.Types.ObjectId(faqId), createdAt: { $gte: endDate, $lt: startDate } } },
            { $group: { _id: '$author', doc: { $first: '$$ROOT' } } },
            { $replaceRoot: { newRoot: '$doc' } },
            { $limit: 5 },
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
            { $unwind: '$author' }
        ]);

        const [faq, totalUsersBasedOnCards, totalCommentsBasedOnCards, activeUsersCount, lastMonthUsers] = await Promise.all([
            faqPromise,
            totalUsersBasedOnCardsPromise,
            totalCommentsBasedOnCardsPromise,
            activeUsersCountPromise,
            lastMonthUsersPromise
        ]);

        faq.analytics = {
            totalUsersBasedOnCards,
            totalDataBasedOnCards: totalCommentsBasedOnCards,
            activeUsersCount,
            lastMonthUsers,
            type: 'faq'
        };

        return faq;

    } catch (error: any) {
        console.error(`Error fetching FAQ component: ${error.message}`);
        throw new Error(`Failed to fetch FAQ component: ${error.message}`);
    }
}
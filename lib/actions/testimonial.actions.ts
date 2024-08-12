'use server'

import mongoose from "mongoose"
import Project from "../models/Project"
import Testimonial from "../models/Testimonial"
import TestimonialCard from "../models/TestimonialCard"
import { connectToDB } from "../mongoose"
import { getDateRange } from "../utilsfunc"


interface Props {
    userId: string,
    projectId: string,
    name: string,
    content: string
}

export async function CreateTestimonialComponent(testimonialData: Props){
    try {
        await connectToDB()
        
        const testimonial = await Testimonial.create({
            userId: testimonialData.userId,
            projectId: testimonialData.projectId,
            name: testimonialData.name,
            content: testimonialData.content
        })

        await Project.findByIdAndUpdate(
            testimonialData.projectId,
            { $push: { 'components.testimonials': testimonial._id } },
            { new: true }
        )
        
    } catch (error: any) {
        console.error(`Failed to create or update testimonial: ${error.message}`);
        throw new Error(`Failed to create or update testimonial: ${error.message}`);
    }
}

export async function fetchTestimonialComponent(testimonialId: string) {
    try {
        await connectToDB();

        const { startDate, endDate } = getDateRange();

        // Fetch the testimonial and related data
        const testimonialPromise = Testimonial
            .findById(testimonialId)
            .populate('userId')
            .populate({
                path: 'projectId',
                select: "name url description logo createdAt updatedAt"
            });

        const totalUsersBasedOnCardsPromise = TestimonialCard.aggregate([
            { $match: { testimonialId: new mongoose.Types.ObjectId(testimonialId) } },
            { $group: { _id: "$author" } },
            { $count: "totalUsers" }
        ]).then(result => result[0]?.totalUsers || 0);

        const totalCommentsBasedOnCardsPromise = TestimonialCard.distinct('testimonialId', { testimonialId }).countDocuments();

        const activeUsersCountPromise = TestimonialCard.aggregate([
            { $match: { testimonialId: new mongoose.Types.ObjectId(testimonialId), createdAt: { $gte: endDate, $lt: startDate } }},
            { $group: { _id: "$author" } },
            { $count: "activeUsersCount" }
        ]).then(result => result[0]?.activeUsersCount || 0);

        const lastMonthUsersPromise = TestimonialCard.aggregate([
            { $match: { testimonialId: new mongoose.Types.ObjectId(testimonialId), createdAt: { $gte: endDate, $lt: startDate } }},
            { $group: { _id: "$author", doc: { $first: "$$ROOT" } }},
            { $replaceRoot: { newRoot: "$doc" }},
            { $limit: 5 },
            { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" }},
            { $unwind: "$author" }
        ]);

        // Execute all promises concurrently
        const [testimonial, totalUsersBasedOnCards, totalCommentsBasedOnCards, activeUsersCount, lastMonthUsers] = await Promise.all([
            testimonialPromise,
            totalUsersBasedOnCardsPromise,
            totalCommentsBasedOnCardsPromise,
            activeUsersCountPromise,
            lastMonthUsersPromise
        ]);

        testimonial.analytics = {
            totalUsersBasedOnCards,
            totalDataBasedOnCards: totalCommentsBasedOnCards,
            activeUsersCount,
            lastMonthUsers,
            type: 'testimonial'
        };

        return testimonial;

    } catch (error: any) {
        console.error(`Error fetching testimonial component: ${error.message}`);
        throw new Error(`Failed to fetch testimonial component: ${error.message}`);
    }
}

export async function getRatingsDetails(testimonialId: string) {
    try {
        const result = await TestimonialCard.aggregate([
            { $match: { testimonialId: new mongoose.Types.ObjectId(testimonialId) } },
            { $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
                totalUsers: { $sum: 1 },
                ratingsBreakdown: { $push: "$rating" }
            }},
            { $project: {
                averageRating: 1,
                totalUsers: 1,
                ratingsBreakdown: {
                    $arrayToObject: {
                        $map: {
                            input: { $range: [1, 6] },
                            as: "rating",
                            in: {
                                k: { $toString: "$$rating" },
                                v: { $size: { $filter: { input: "$ratingsBreakdown", as: "r", cond: { $eq: ["$$r", "$$rating"] } } } }
                            }
                        }
                    }
                }
            }}
        ]);

        const breakdown = result[0]?.ratingsBreakdown || {};
        return {
            totalUsers: result[0]?.totalUsers || 0,
            averageRating: result[0]?.averageRating || 0,
            eachRating: {
                5: breakdown["5"] || 0,
                4: breakdown["4"] || 0,
                3: breakdown["3"] || 0,
                2: breakdown["2"] || 0,
                1: breakdown["1"] || 0
            }
        };
    } catch (error: any) {
        console.error(`Error fetching ratings details: ${error.message}`);
        throw new Error(`Failed to fetch ratings details: ${error.message}`);
    }
}
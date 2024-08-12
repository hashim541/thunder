'use server'

import Project from "../models/Project";
import User from "../models/User";
import { connectToDB } from "../mongoose";

interface UserData {
    id: string;
    fullname: string;
    email: string;
    image: string;
}

export async function updateUser(userData: UserData){
    try {
        await connectToDB()

        await User.findOneAndUpdate( 
            { id: userData.id },
            { 
                id: userData.id,
                fullName: userData.fullname,
                email: userData.email,
                image: userData.image,
                onboarded: true
            },
            { upsert: true }
        )
        
        
    } catch (error: any) {
        throw new Error (`Failed to create user: ${error.message}`)
    }
}

export async function fetchUser(email: string){
    try {
        await connectToDB()

        return await User
            .findOne({ email: email })
            .populate({
                path: 'projects',
                model: Project
            })
        
    } catch (error: any) {
        throw new Error (`Failed to fetch user: ${error.message}`)
    }
}
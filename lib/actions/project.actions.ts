'use server'

import { revalidatePath } from "next/cache";
import Comment from "../models/Comment";
import Faq from "../models/Faq";
import Project from "../models/Project";
import Testimonial from "../models/Testimonial";
import User from "../models/User";
import { connectToDB } from "../mongoose"

interface ProjectData {
    userId: string,
    name: string,
    url: string,
    description:string,
    logo: string,
}

export async function createProject(projectData: ProjectData) {
    try {
        await connectToDB();

        const project = await Project.create({
            userId: projectData.userId,
            name: projectData.name,
            url: projectData.url,
            description: projectData.description,
            logo: projectData.logo
        });


        const user = await User.findByIdAndUpdate(
            projectData.userId,
            { $addToSet: { projects: project._id } },
            { new: true }
        );

        if (!user) {
            throw new Error('Failed to update user with new project.');
        }
 

    } catch (error: any) {
        console.error(`Error creating project: ${error.message}`);
        throw new Error(`Failed to create project: ${error.message}`);
    }
}

export async function fetchProject(projectId: string){
    try {
    
        await connectToDB()

        return Project
            .findById(projectId)
            .populate({
                path:'userId',
                model: User
            })
            .populate({
                path: 'components.comments',
                model: Comment
            })
            .populate({
                path: 'components.testimonials',
                model: Testimonial
            })
            .populate({
                path: 'components.faqs',
                model: Faq
            });

    } catch (error: any) {
        console.error(`Error fetching project: ${error.message}`);
        throw new Error(`Failed to fetch project: ${error.message}`);
    }
}   






interface UpdateComponentStyle {
    id: string,
    pallet?: {
        name: string,
        colors: {
            primary: string,
            text: string,
            bg: string
        }
    },
    layout?: string,
    cardStyle?: string,
    pathname: string,
    type: 'comment' | 'testimonial' | 'faq'
}

export async function updateComponentStyle(componentData: UpdateComponentStyle){
    try {
        await connectToDB();

        const updateFields: any = {};

        if (componentData.pallet) {
            updateFields['styles.pallet.name'] = componentData.pallet.name;
            updateFields['styles.pallet.colors.primary'] = componentData.pallet.colors.primary;
            updateFields['styles.pallet.colors.text'] = componentData.pallet.colors.text;
            updateFields['styles.pallet.colors.bg'] = componentData.pallet.colors.bg;
        }

        if (componentData.layout) {
            updateFields['styles.layout'] = componentData.layout;
        }

        if (componentData.cardStyle) {
            updateFields['styles.cardStyle'] = componentData.cardStyle;
        }
        
        if(componentData.type == 'comment') {
            await Comment.findByIdAndUpdate(
                componentData.id,
                { $set: updateFields },
                { new: true } 
            );
        }
        if (componentData.type == 'testimonial'){
            await Testimonial.findByIdAndUpdate(
                componentData.id,
                { $set: updateFields },
                { new: true } 
            );
        }
        if (componentData.type == 'faq'){
            await Faq.findByIdAndUpdate(
                componentData.id,
                { $set: updateFields },
                { new: true } 
            );
        }
            
        revalidatePath(componentData.pathname)

    } catch (error: any) {
        console.error(`Error update comment component: ${error.message}`);
        throw new Error(`Failed to update comment component: ${error.message}`);
    }
}
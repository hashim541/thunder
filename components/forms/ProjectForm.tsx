'use client'
import { isBase64Image } from '@/lib/utilsfunc';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import Image from 'next/image';
import { Fa4, FaFolderPlus, FaFontAwesome, FaGlobe } from 'react-icons/fa6';
import { FaApper, FaFileImage, FaUpload } from 'react-icons/fa';
import { createProject } from '@/lib/actions/project.actions';

interface Props {
    formatData: {
        id: string;
        email: string;
        image: string;
        fullName: string;
    }
}

const ProjectForm = ({ formatData }: Props) => {

    const router = useRouter();
    const { startUpload } = useUploadThing('media');
    const [formState, setFormState] = useState<{ [key: string]: string }>({
        name: '',
        url: '',
        description: '',
        logo: '' // Initialize logo field
    });

    const [image, setImage] = useState<File[]>([]); // For image file
    const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview

    const handleChange = (name: string, value: string) => {
        const newForm = { ...formState };
        newForm[name] = value;
        setFormState(newForm);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setImage([fileArray[0]]);

            const file = fileArray[0];
            if (file.type.includes('image') && file.size <= 1 * 1024 * 1024) { // Check if image and less than 1MB
                const fileReader = new FileReader();
                fileReader.onload = (event) => {
                    const imageDataUrl = event.target?.result?.toString() || '';
                    setFormState((prevState) => ({
                        ...prevState,
                        logo: imageDataUrl
                    }));
                    setImagePreview(imageDataUrl); // Set image preview
                };
                fileReader.readAsDataURL(file);
            }
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { logo, ...projectData } = formState;

        let imageUrl = logo; 
        

        if (isBase64Image(logo)) {
            const imgRes = await startUpload(image); 

            if (imgRes && imgRes[0]?.url) {
                imageUrl = imgRes[0].url; 
            }
        }

        await createProject({
            userId:formatData.id,
            name: projectData.name,
            url: projectData.url,
            description: projectData.description,
            logo: imageUrl,
        });

        router.push('/dashboard');
    };

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full max-w-[700px] mx-2 rounded-lg border-[1px] border-borderColor px-12 py-8'>
            {imagePreview && (
                <div className='mb-2 self-center'>
                    <Image
                        src={imagePreview}
                        alt='logo preview'
                        width={100}
                        height={100}
                        className='object-contain rounded-md border-2 border-primary'
                    />
                </div>
            )}
            <div className='flex w-full flex-wrap gap-2'>
                <div className='flex flex-1 flex-col gap-1 min-w-[250px]'>
                    <label htmlFor="name" className='font-semibold flex items-center gap-2'>
                        <FaFontAwesome /> Project Name
                    </label>
                    <input
                        type="text"
                        name='name'
                        placeholder='Name'
                        minLength={3}
                        value={formState.name}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className='border-[1px] border-borderColor rounded-sm px-2 py-1 w-full  bg-transparent'
                    />
                </div>

                <div className='flex flex-1 flex-col gap-1 min-w-[250px]'>
                    <label htmlFor="url" className='font-semibold flex items-center gap-2'>
                        <FaGlobe /> Website URL
                    </label>
                    <input
                        type="text"
                        name='url'
                        placeholder='https://example.com'
                        value={formState.url}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className='border-[1px] border-borderColor rounded-sm px-2 py-1 w-full  bg-transparent'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="logo" className='font-semibold flex items-center gap-2'>
                    <FaUpload /> Upload your logo
                </label>
                <input
                    type="file"
                    name='logo'
                    accept="image/*"
                    onChange={handleFileChange}
                    className='file:border-none border-[1px] border-borderColor file:text-text file:rounded-sm px-2 py-1 w-full min-w-[350px] file:bg-transparent cursor-pointer '
                />
                
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="description" className='font-semibold flex items-center gap-2'>
                    <FaFileImage /> Description
                </label>
                <textarea
                    name='description'
                    placeholder='Project Description'
                    minLength={3}
                    rows={3}
                    value={formState.description}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='border-[1px] border-borderColor rounded-sm px-2 py-1 w-full min-w-[350px]  bg-transparent'
                />
            </div>

            <button type='submit' className='bg-primary w-fit self-end text-white font-bold px-4 py-2 rounded flex items-center gap-2' >
                <FaFolderPlus /> Create Project
            </button>
        </form>
    );
}

export default ProjectForm;

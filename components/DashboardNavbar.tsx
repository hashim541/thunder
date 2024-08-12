'use client'
import { useSession } from "next-auth/react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { font } from '@/utils/fonts';

const DashboardNavbar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        // Handle sign-out
        await fetch('/api/auth/signout', { method: 'POST' });
        router.push('/sign-in');
    };

    return (
        <nav className='flex justify-center items-center border-b-2 border-borderColor w-full'>
            <div className='max-w-[1200px] flex items-center justify-between gap-5 py-2 px-3 w-full'>
                <header className='flex justify-center items-center'>
                    <Image
                        src={'/assets/svgs/logo.svg'}
                        alt='logo'
                        width={30}
                        height={30}
                        className='rounded-full'
                    />
                    <h1 className={`${font.head.className} font-bold text-xl`}>Thunder</h1>
                </header>
                {session?.user && (
                    <div className='flex items-center gap-5 ml-auto'>
                        {session.user.image && (
                            <Image
                                src={session.user.image}
                                alt="Profile"
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                        )}
                        <div onClick={handleSignOut} className="text-xl">
                            <FaSignOutAlt width={24} height={24} />
                        </div>
                    </div>
                )}
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default DashboardNavbar;

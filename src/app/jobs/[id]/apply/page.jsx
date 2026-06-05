import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();

    if(!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    if(user.role !== 'seeker') {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-6">
                <p className="text-zinc-400 text-lg">Only job seekers can apply for positions. Please sign in with a seeker account to proceed.</p>
            </div>
        );
    }

    const job = await getJobById(id);


    return (
        <div>
            <JobApply job={job} />
        </div>
    );
};

export default ApplyPage;
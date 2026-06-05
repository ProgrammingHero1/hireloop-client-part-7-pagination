import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();

    if(!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    return (
        <div>
            <h2>Apply for this Job</h2>
        </div>
    );
};

export default ApplyPage;
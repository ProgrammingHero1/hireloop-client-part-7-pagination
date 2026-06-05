import React from 'react';

const JobApply = ({ job }) => {
    return (
        <div>
            <h2>Apply with info {job.title}</h2>
            <button>Apply Now</button>
        </div>
    );
};

export default JobApply;
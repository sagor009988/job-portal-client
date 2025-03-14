import React, { useEffect, useState } from 'react';
import HotNewsCard from './HotNewsCard';

const HotNews = () => {
    const [jobs,setJobs]=useState([]);
    console.log(jobs);
    
    useEffect(()=>{
        fetch("http://localhost:5000/jobs")
        .then(res=>res.json())
        .then(data=>setJobs(data))
    },[])
    return (
        <div>
            <h2>Hot Jobs </h2>
            <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 space-y-7'>
            {
                jobs?.map(job=><HotNewsCard key={job._id} job={job}></HotNewsCard>)
            }
            </div>
        </div>
    );
};

export default HotNews;
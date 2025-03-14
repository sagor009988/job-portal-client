import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const JobDetails = () => {
    const [jobsDetails,setJobsDetails]=useState({})
    const {
      _id,
        applicationDeadline,
        category,
        company,
        company_logo,
        description,
        hr_email,
        hr_name,
        jobType,
        location,
        requirements,
        responsibilities,
        salaryRange,
        status,
        title
      } = jobsDetails
    const {id}=useParams();
    console.log(id);
    useEffect(()=>{
        fetch(`http://localhost:5000/jobs/${id}`)
        .then(res=>res.json())
        .then(data=>setJobsDetails(data)
        )
    },[])
    
    return (
      <div className='w-full  flex justify-center'>
          <div className="card w-full max-w-md bg-base-100 shadow-xl p-4 ">
        <div className="flex items-center space-x-4">
          <img src={company_logo} alt={company} className="w-16 h-16 rounded-lg" />
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-500">{company}</p>
          </div>
        </div>
  
        <p className="mt-2 text-gray-700">{description}</p>
  
        <div className="mt-4">
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Salary:</strong> {salaryRange?.min} - {salaryRange?.max} </p>
          <p><strong>Deadline:</strong> {applicationDeadline}</p>
        </div>
  
        <Link
          to={`/applyForm/${_id}`}
          className="btn btn-primary mt-4 w-full"
        >
          Apply Now
        </Link>
      </div>
      </div>
    );
};

export default JobDetails;
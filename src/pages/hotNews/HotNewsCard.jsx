import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const HotNewsCard = ({ job }) => {
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
    jobType,
    applicationDeadline,
  } = job;
  return (
    <div className="card bg-base-100  shadow-2xl">
      <div className="flex gap-4  items-center">
        <figure className="w-20 h-20">
          <img src={company_logo} alt="Shoes" />
        </figure>
        <div>
            <p>{company}</p>
            <p className="flex gap-2"><IoLocationOutline />{location}</p>
        </div>
      </div>
      <div className="card-body">
      <h2 className="card-title">
      {title}
      <div className="badge badge-secondary">NEW</div>
    </h2>
        <p>
          {description}
        </p>
         <div className="flex gap-3 flex-wrap">
            {requirements?.map((req,ind)=><p key={ind} className="bg-base-200 gap-4 p-2 rounded-lg cursor-pinter w-fit">{req}</p>)}
         </div>
        <div className="card-actions">
            Price:{salaryRange.min}-{salaryRange.max} BDT
         <Link to={`/jobDetails/${_id}`}> <button className="btn btn-primary">Apply</button></Link>
        </div>
      </div>
    </div>
  );
};

export default HotNewsCard;

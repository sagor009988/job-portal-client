import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PostedJobs = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setPostedJobs(data));
  }, [user.email]);
  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-5">
        My posted jobs {postedJobs.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job Title</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
           {
            postedJobs?.map(job=> <tr key={job._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={job.company_logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{job.company}</div>
                      <div className="text-sm opacity-50">{job.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                 {job.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                   {job.jobType}
                  </span>
                </td>
                <td>{job.applicationDeadline}</td>
                <th>
                <Link to={`/appliedDetails-forMyPostedJobs/${job._id}`}>
                <button className="btn btn-ghost btn-xs">See Details</button>
                </Link>
                </th>
              </tr>)
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostedJobs;

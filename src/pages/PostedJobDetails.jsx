import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const PostedJobDetails = () => {
  const appliedJobs = useLoaderData();
  if (!appliedJobs.length) {
    return (
      <h1 className="text-5xl h-screen fond-bold text-red-600 flex items-center justify-center">
        No user applied yet !!!!!!!!
      </h1>
    );
  }

  const handleStatus=(e,id)=>{
   console.log(e.target?.value,id);
   
    const value={
        status:e?.target?.value
    }
    fetch(`http://localhost:5000/my-postedJob-status/${id}`,{
        method:"PATCH",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(value)
    })
    .then(res=>res.json())
    .then(data=>{
         if (data.modifiedCount>0) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `status ${e.target?.value} successFully!!!!`,
                    showConfirmButton: false,
                    timer: 1000,
                  });
                 
                }
    }
    )
    
  }

  return (
    <div>
      <h1>total apply:{appliedJobs.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Job</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {appliedJobs?.map((job, ind) => (
              <tr key={ind}>
                <th>{ind + 1}</th>
                <td>{job.user_email}</td>
                <td>Quality Control Specialist</td>
                <td>
                  <fieldset className="fieldset">
                    <select onChange={(e)=>handleStatus(e,job._id)}  defaultValue={job.status||""}className="select">
                      <option disabled={true}value={""}>set status</option>
                      <option>Block</option>
                      <option>Reject</option>
                      <option>Hired</option>
                      <option>Pending</option>
                    </select>
                    
                  </fieldset>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostedJobDetails;

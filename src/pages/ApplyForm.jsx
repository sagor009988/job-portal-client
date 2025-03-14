import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const ApplyForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate=useNavigate()

  // form animation design
  const colors = [
    "border-red-500",
    "border-blue-500",
    "border-green-500",
    "border-yellow-500",
  ];
  const [borderColor, setBorderColor] = useState(colors[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setBorderColor(colors[index]);
    }, 1000); // Change color every second

    return () => clearInterval(interval);
  }, []);

  const handleApplyForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedinUrl = form.linkedinUrl.value;
    const resumeUrl = form.resumeUrl.value;
    const githubUrl = form.githubUrl.value;

    const applicantInformation = {
      job_id: id,
      user_email: user.email,
      linkedinUrl,
      resumeUrl,
      githubUrl,
    };

    fetch("http://localhost:5000/job_application", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(applicantInformation),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        if (data.insertedId ) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "job apply  successFully!!!!",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/myApplications")
        }
      });
      form.reset()
  };

  return (
    <form
      onSubmit={handleApplyForm}
      className={`card bg-base-100 w-full max-w-6xl mx-auto my-5 shrink-0 shadow-2xl border-4 ${borderColor} p-6 rounded-xl`}
      initial={{ scale: 0 }}
      animate={{ scale: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className="card-body space-y-4">
        <fieldset className="fieldset space-y-2">
          <label className="fieldset-label">LinkedIn URL</label>
          <input
            type="url"
            className="input input-bordered w-full"
            name="linkedinUrl"
            placeholder="LinkedIn URL"
          />

          <label className="fieldset-label">Resume URL</label>
          <input
            type="url"
            className="input input-bordered w-full"
            name="resumeUrl"
            placeholder="Resume URL"
          />

          <label className="fieldset-label">GitHub URL</label>
          <input
            type="url"
            className="input input-bordered w-full"
            name="githubUrl"
            placeholder="GitHub URL"
          />
        </fieldset>

       
       <button className="btn btn-primary w-full">Submit</button>
      
      </div>
    </form>
  );
};

export default ApplyForm;

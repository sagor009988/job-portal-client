import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const AddJob = () => {
    const {user}=useAuth()
    const navigate=useNavigate()
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);

    const { min, max, currency, ...newJob } = formValues;
    
    newJob.salaryRange = {
      min,
      max,
      currency,
    };
    // responsibilities
    if (newJob.responsibilities && typeof newJob.responsibilities === 'string') {
        newJob.responsibilities = newJob.responsibilities.trim();
    
        if (newJob.responsibilities === "") {
          newJob.responsibilities = [];
          return;
        }
    
        let splitByNewline = newJob.responsibilities.split('\n');
        let combinedArray = [];
    
        splitByNewline.forEach(item => {
          let trimmedItem = item.trim();
          if (trimmedItem.includes(',')) {
            let splitByComma = trimmedItem.split(',');
            splitByComma.forEach(commaItem => {
              let trimmedCommaItem = commaItem.trim();
              if (trimmedCommaItem !== "") {
                combinedArray.push(trimmedCommaItem);
              }
            });
          } else if (trimmedItem !== "") {
            combinedArray.push(trimmedItem);
          }
        });
    
        newJob.responsibilities = combinedArray;
      } else if (!newJob.responsibilities){
          newJob.responsibilities = [];
      } else if (Array.isArray(newJob.responsibilities)){
          return;
      }
      else{
          newJob.responsibilities = [];
      }
    //   requirements
    if (newJob.requirements && typeof newJob.requirements === 'string') {
        newJob.requirements = newJob.requirements.trim();
    
        if (newJob.requirements === "") {
          newJob.requirements = [];
          return;
        }
    
        let splitByNewline = newJob.requirements.split('\n');
        let combinedArray = [];
    
        splitByNewline.forEach(item => {
          let trimmedItem = item.trim();
          if (trimmedItem.includes(',')) {
            let splitByComma = trimmedItem.split(',');
            splitByComma.forEach(commaItem => {
              let trimmedCommaItem = commaItem.trim();
              if (trimmedCommaItem !== "") {
                combinedArray.push(trimmedCommaItem);
              }
            });
          } else if (trimmedItem !== "") {
            combinedArray.push(trimmedItem);
          }
        });
    
        newJob.requirements = combinedArray;
      } else if (!newJob.requirements){
          newJob.requirements = [];
      } else if (Array.isArray(newJob.requirements)){
          return;
      }
      else{
          newJob.requirements = [];
      }


    //   now add a job
    fetch("http://localhost:5000/newJobs",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(newJob)
    })
    .then(res=>res.json())
    .then(data=>{
        if (data.insertedId ) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Create a job successFully!!!!",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                  navigate("/myPostedJobs")
                }
    }
    )
    
    console.log(newJob);
  };
  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-5">Create a new Job</h1>
      <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmitForm} className="fieldset">
            {/* Company name 1*/}
            <label className="fieldset-label">Company name</label>
            <input
              type="text"
              name="company"
              className="input w-full"
              placeholder="Company Name"
            />
            {/* job title 2 */}
            <label className="fieldset-label">Job title</label>
            <input
              type="text"
              name="title"
              className="input w-full"
              placeholder="input job title"
            />
            {/* Hr email 3*/}
            <label className="fieldset-label">Hr Email</label>
            <input
              type="email"
              defaultValue={user.email}
              name="hr_email"
              className="input w-full"
              placeholder="Hr email"
            />
            {/* Hr name 4 */}
            <label className="fieldset-label">Hr name</label>
            <input
              type="text"
              name="hr_name"
              className="input w-full"
              placeholder="Hr Name"
            />

            {/* job location 5*/}
            <label className="fieldset-label">Location</label>
            <input
              type="text"
              name="location"
              className="input w-full"
              placeholder="input Location"
            />
            {/* job applicationDeadline 6*/}
            <label className="fieldset-label">Application DeadLine</label>
            <input
              type="date"
              name="applicationDeadline"
              className="input w-full"
              placeholder="input Application DeadLine"
            />
            {/* select method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* job jobType 7*/}

              <div>
                <label className="fieldset-label">Job type</label>
                <select
                  defaultValue=""
                  name="jobType"
                  className="select select-neutral w-full"
                  required
                >
                  <option disabled={true}value={""}>Job Type</option>
                  <option>Remote</option>
                  <option>Onside</option>
                  <option>Part time</option>
                  <option>Full time</option>
                </select>
              </div>

              {/* job job category 8*/}
              <div>
                <label className="fieldset-label">Job category</label>
                <select
                  defaultValue=""
                  name="category"
                  className="select select-neutral w-full"
                  required
                >
                  <option disabled={true} value="">Job category</option>
                  <option>Engineering</option>
                  <option>Account</option>
                  <option>Writer</option>
                  <option>Hr</option>
                </select>
              </div>
            </div>
            {/* salary Range 9*/}
            <label className="fieldset-label">Salary </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              {/* min salary */}
              <input
                type="text"
                name="min"
                className="input w-full"
                placeholder="Min salary"
                required
              />
              {/* max  */}
              <input
                type="text"
                name="max"
                className="input w-full"
                placeholder="Max salary"
                required
              />
              <div>
                {/* currency  */}
                <label className="fieldset-label">Currency</label>
                <select
                  defaultValue=""
                  name="currency"
                  className="select select-neutral"
                  required
                >
                  <option disabled={true} value={""}>Currency</option>
                  <option>USD</option>
                  <option>Dollar</option>
                  <option>BDT</option>
                  <option>Pound</option>
                </select>
              </div>
            </div>
            {/* job description 10*/}
            <label className="fieldset-label">Description</label>
            <textarea
              placeholder="Add a description"
              name="description"
              className="textarea w-full"
              required
            ></textarea>
            {/* job requirements 11*/}
            <label className="fieldset-label">Requirements</label>
            <textarea
              placeholder="Requirements"
              name="requirements"
              className="textarea w-full"
              required
            ></textarea>
            {/* job "responsibilities 12"*/}
            <label className="fieldset-label">responsibilities</label>
            <textarea
              placeholder="responsibilities"
              name="responsibilities"
              className="textarea w-full"
              required
            ></textarea>
            {/* company logo 13*/}
            <label className="fieldset-label">Company logo</label>
            <input
              type="url"
              name="company_logo"
              className="input w-full"
              placeholder="Company Logo"
              required
            />
            <button className="btn btn-neutral mt-4">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;

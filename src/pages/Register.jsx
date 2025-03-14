import Lottie from "lottie-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import regLottie from "../assets/register.json";
import useAuth from "../hooks/useAuth";
import SocialLogin from "./shared/SocialLogin";

const Register = () => {
  const [error, setError] = useState("");
  const {createUser}=useAuth();


  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long, contain one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }

    createUser(email,password)
    .then(result=>{
        console.log(result.user);
        if(result.user.metadata.createdAt){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your registration successFull!!!!",
                showConfirmButton: false,
                timer: 1000
              });
        }
        
    })
    .catch(err=>{
        setError(err.message)
        
    })

    console.log(name, email, password);
    setError(""); // Clear error if valid
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={regLottie} loop={true}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold text-center">Register now!</h1>
            <form onSubmit={handleRegistration}>
              <fieldset className="fieldset">
                <label className="fieldset-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name"
                  required
                />
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                  required
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

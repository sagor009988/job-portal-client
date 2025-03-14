import Lottie from "lottie-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginLottie from "../assets/register.json";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [error, setError] = useState("");
    const {loading,loginUser}=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
   
    const formLocation=location?.state||"/";

    const handleLogin=e=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        loginUser(email,password)
        .then(result=>{
            console.log(result.user);
            // navigate for private route
            
                navigate(formLocation)
             if(result.user.metadata.createdAt){
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User login successFully!!!!",
                            showConfirmButton: false,
                            timer: 1000
                          });
                    }
            
        })
        .catch(err=>{
            console.log(err.code);
            setError(err.message)
            
        })
        setError('')
        
    }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={loginLottie} loop={true}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold text-center">Login now!</h1>
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                  required
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

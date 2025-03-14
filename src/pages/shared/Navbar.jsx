import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user,loading,logoutUser,setLoading } = useAuth();
  const links = (
    <>
      <li>
       <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
       <NavLink to={'/myApplications'}>My Applications</NavLink>
      </li>
      <li>
       <NavLink to={'/'}>Home</NavLink>
      </li>
      
    </>
  );

  const handleLogout=()=>{
    logoutUser()
    .then(res=>{
      console.log("logout successful");
     
      
    })
  }
  if(loading){
    return <h1 className="h-screen flex justify-center items-center">Loading............</h1>
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Job Portal</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      
      <div className="navbar-end">
      {user ? (
        <>
          <button onClick={handleLogout} className="btn ml-3 pr-4">Log out</button>
        </>
      ) : (
        <>
          <div >
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>
              <button className="btn ml-3">Login</button>
            </Link>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default Navbar;

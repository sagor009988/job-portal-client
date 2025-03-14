import React from 'react';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const {googleLogin}=useAuth()
    console.log(googleLogin);
    
    const handleGoogleSignin=()=>{
        googleLogin()
        .then(result=>{
            console.log(result.user);
            
        })
        .catch(err=>{
            console.log(err.message);
            console.log(err.code);
            
            
        })
    }
    return (
        <div>
             <div className="divider">OR</div>
             <button onClick={handleGoogleSignin}>Signin with <span className='text-blue-600 cursor-pointer'>google</span> </button>
        </div>
    );
};

export default SocialLogin;
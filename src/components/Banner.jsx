import { motion } from "motion/react";
import React from "react";
import img1 from "../assets/job1.jpg";
import img2 from "../assets/job2.jpg";

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-[calc(100vh-65px)]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <motion.img
          animate={{y:[-25,100,-20]}}
          transition={{ease:"easeInOut", duration:10,delay:1,repeat:Infinity}}
            src={img1}
            className="max-w-sm w-80 border-blue-600 border-l-8 border-b-8  rounded-t-[40px] rounded-br-[40px] shadow-2xl"
          />
          <motion.img
          animate={{x:[-25,100,-20]}}
          transition={{ease:"easeInOut", duration:10,delay:1,repeat:Infinity,bounce:5}}
            src={img2}
            className="max-w-sm w-80 border-blue-600 border-l-8 border-b-8  rounded-t-[40px] rounded-br-[40px] shadow-2xl"
          />
        </div>
        <div className="flex-1">
          <motion.h1
            animate={{ x:[0, 100,0], color:["#ddf20b" ,"#19f20b" ,"#0bf2af" ,"#0b58f2" ,"#cc0bf2"]}}
            transition={{
              ease: "easeInOut",
              duration: 5,
              delay: 1,
              repeat: Infinity,
            }}
            className="text-5xl font-bold"
          >
            Latest job for you
          </motion.h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const Loading = () => {

    const { nextUrl }= useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate('/'+nextUrl)
            },8000)
        }
    },[])

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gradient-to-br from-white via-orange-50 to-orange-100 animate-fadeIn">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 border-dotted rounded-full animate-spin" />
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-orange-400 border-solid rounded-full animate-ping" />
        </div>

        {/* Glowing Text */}
        <p className="text-orange-600 text-lg font-semibold animate-bounce tracking-wide">
          Hang tight, we're getting things ready...
        </p>
      </div>
    </div>
  );
};

export default Loading;

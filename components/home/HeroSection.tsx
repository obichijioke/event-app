import React from "react";

const HeroSection = () => {
  return (
    <div
      className="w-full h-[400px] lg:h-[600px] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url("/images/nightlife.jpg")` }}
    >
      <div className="flex flex-col justify-center items-center text-white h-full">
        <h1 className="leading-10 text-3xl md:text-6xl font-bold text-center my-2 md:my-5">
          GOT PLANS?
        </h1>
        <p className="text-lg md:text-2xl">Find the right event for you</p>
      </div>
    </div>
  );
};

export default HeroSection;

import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-10 bg-blue-500">
      <div className="text-center mb-6 ">
        <h1 className="text-3xl font-bold text-white">Get Trendy Collections</h1>
        <p className="text-lg text-white">Find the Best Options Here</p>
      </div>
      <div className="flex flex-col items-center mt-2">
        <h2 className="text-2xl text-center bg-blue-700 font-bold mb-6 text-white p-8 w-full">Best Deals</h2>
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <img
              src="/images/Sale.png"
              alt="Featured Item"
              className="w-full h-64 object-cover"
            />
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;

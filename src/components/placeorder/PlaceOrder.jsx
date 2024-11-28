import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { PiDotDuotone } from "react-icons/pi";
import { LuArrowRightLeft } from "react-icons/lu";


const PlaceOrder = () => {
  const [buyToken, setBuyToken] = useState(() => {
    // Retrieve and parse the token from localStorage during initialization
    return JSON.parse(localStorage.getItem("buySelectedToken")) || null;
  });

  const [sellToken, setSellToken] = useState(() => {
    // Retrieve and parse the token from localStorage during initialization
    return JSON.parse(localStorage.getItem("sellSelectedToken")) || null;
  });

  return (
    <div className="flex justify-center items-center h-screen bg-black p-4">
      <div className="bg-white h-[350px] border rounded-[1.625rem] w-full sm:h-[500px] sm:w-[500px]">
        <div className="relative py-1 sm:py-3">
          {/* Arrow on the left */}
          <FaArrowLeftLong className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-activeHead" />

          {/* Text centered */}
          <p className="text-center text-activeHead font-semibold">
            Quote <span className="text-inactiveHead">Expires in</span>
          </p>
        </div>

        {/* Token details */}
        <div className="relative flex pl-[1.25rem] py-1 pr-[1.25rem] gap-2 justify-between">
          {/* Arrow above sell and buy div */}
          <div className="absolute top-[3.7rem] left-1/2 -translate-x-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center flex">
          <MdKeyboardArrowRight className="w-7 h-7 " />
          </div>
            
          </div>

          {/* Sell div */}
          <div className="bg-gray-100 rounded-3xl w-1/2 h-[150px] flex flex-col items-center justify-center">
            <div>
              <img src={sellToken?.logo} alt="" className="h-12 w-12 rounded-full" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-activeHead">1.00e-7 ETH</p>
              <p className="text-inactiveHead">s0.01</p>
            </div>
          </div>

          {/* Buy div */}
          <div className="bg-gray-100 rounded-3xl w-1/2 h-[150px] flex flex-col items-center justify-center">
            <div>
              <img src={buyToken?.logo} alt="" className="h-12 w-12 rounded-full" />
            </div>
            <div className="mt-4 text-center">
              <p className="text-activeHead">1.00e-7 ETH</p>
              <p className="text-inactiveHead">s0.01</p>
            </div>
          </div>
        </div>

        {/* amount details */}
        <div>
  {/* Network cost */}
  <div className="flex justify-between pl-[1.25rem] pt-4 pr-[1.25rem] text-sm">
    <div className="flex text-center justify-center items-center gap-2">
      <GoDotFill className="text-gray-500 w-3 h-3" />
      <p className="text-gray-500  font-medium">Network cost</p>
    </div>
    <div className="flex text-gray-800">
      <p>0.0000000 </p>
      <p>ETH</p>
      <p className="text-gray-500">(0.132)</p>
    </div>
  </div>

  {/* Dotted flow */}
  <div className="flex justify-start pl-[1.50rem]  pr-[1.25rem] -mt-1">
    <div className="border-l-2 border-dotted border-gray-300 h-4"></div>
  </div>

  {/* Received */}
  <div className="flex justify-between  pr-[1.25rem] -mt-2 text-sm">
    <div className="flex text-center justify-center items-center">
      <PiDotDuotone className="text-black w-12 h-12" />
      <p className="text-gray-500  font-medium -ml-2">You receive (0% fee)</p>
    </div>
    <div className="flex text-gray-800 items-center">
      <p>0.0000000 </p>
      <p>ETH</p>
    </div>
  </div>
</div>

            {/* further detail */}
            <div className='gap-2 flex  flex-col mt-7'>
                {/* route */}
                <div className='flex pl-[1.50rem]  pr-[1.25rem] justify-between text-sm'>
                    <div>
                        <p className='text-gray-500  font-medium'>Route</p>
                    </div>
                    <div className='flex'>
                        {/* image */}
                        <div className="flex justify-center items-center">
                               <img 
                                 src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                                 alt="" 
                                 className="w-4 h-4 z-30" 
                               />
                               <img 
                                 src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                                 alt="" 
                                 className="w-4 h-4 -ml-2 z-20" 
                               />
                               <img 
                                 src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                                 alt="" 
                                 className="w-4 h-4 -ml-2 z-10" 
                               />
                        </div>

                        <div>
                            <p className='text-gray-500  font-medium'>3 sources</p>
                        </div>
                    </div>
                </div>

                {/* slippage */}
                <div className='flex pl-[1.50rem]  pr-[1.25rem] justify-between text-sm'>
                    <div>
                        <p className='text-gray-500  font-medium'>Max. slippage</p>
                    </div>
                    
                        <div>
                            <p className='text-gray-500  font-medium'>0.5%</p>
                        
                    </div>
                </div>

                {/* rate */}
                <div className='flex pl-[1.50rem]  pr-[1.25rem] justify-between text-sm'>
                    <div>
                        <p className='text-gray-500  font-medium'>Rate</p>
                    </div>
                    
                        <div className='flex gap-2'>
                            <div className='bg-gray-200 p-1 rounded-full '>
                            <LuArrowRightLeft className='' />
                            </div>
                            <div>
                            <p className='text-gray-500  font-medium'>1 usdc = 0.00029 Eth</p>

                            </div>
                        
                    </div>
                </div>
            </div>

            {/* place order button */}
            <div className='pl-[2.50rem]  pr-[2.25rem] mt-8'>
                <button className='bg-[#17171c] sm:mt-2 sm:text-[16px] font-[500] border rounded-[1.625rem] shadow-[0_1px_2px_rgba(0,0,0,0.2)] w-full flex items-center justify-center h-12 text-[15px] text-white '> Place Order</button>
            </div>


      </div>
    </div>
  );
};

export default PlaceOrder;

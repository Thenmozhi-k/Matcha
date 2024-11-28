import React, { useState } from 'react';
import { IoArrowDownSharp } from "react-icons/io5";


const TransactionCompleted = () => {
    const [buyToken, setBuyToken] = useState(() => {
        // Retrieve and parse the token from localStorage during initialization
        return JSON.parse(localStorage.getItem("buySelectedToken")) || null;
      });
    
      const [sellToken, setSellToken] = useState(() => {
        // Retrieve and parse the token from localStorage during initialization
        return JSON.parse(localStorage.getItem("sellSelectedToken")) || null;
      });
  return (
    <div className='flex justify-center items-center h-screen bg-black p-4'>
        <div className="bg-white h-[350px] border rounded-[1.625rem] w-full sm:h-[500px] sm:w-[500px] flex flex-col justify-center items-center gap-10">
            <div>
                <img src="https://cliply.co/wp-content/uploads/2021/03/372103860_CHECK_MARK_400px.gif" alt="" className='w-16 h-16' />
            </div>

            <div className='flex flex-col gap-3 font-semibold justify-center items-center'>
                <p className='text-activeHead text-2xl'>Transaction Completed</p>
                <p className='text-inactiveHead text-base'>Yoou can see more details in trade history</p>
            </div>

           

            {/* transaction details */}
            <div className='gap-2 flex flex-col'>
                <div className='flex tex-sm font-semibold gap-1'>
                    <img src={sellToken.logo} alt="" className='w-6 h-6' />
                    <p>{sellToken.sellAmount}</p>
                    <p>{sellToken.symbol}</p>
                </div>
                <div className='justify-center text-center flex items-center'>
                <IoArrowDownSharp className=' text-inactiveHead ' />

                </div>

                <div className='flex tex-sm font-semibold gap-1'>
                    <img src={buyToken.logo} alt="" className='w-6 h-6' />
                    <p>{buyToken.buyAmount}</p>
                    <p>{buyToken.symbol}</p>
                </div>
            </div>

            <div>
                <p className='text-inactiveHead text-base'>Swapped via areodrome_v3 and 2 more</p>
            </div>

            {/* buttons */}
            <div className="flex w-full">
  <div className="pl-[1rem] pr-[1rem] mt-2 w-full">
    <button className="bg-gray-100 sm:mt-2 sm:text-[16px] font-[500] rounded-[1.625rem] w-full flex items-center justify-center h-12 text-[15px] text-activeHead">
      See details
    </button>
  </div>
  <div className="pl-[1rem] pr-[1rem] mt-2 w-full">
    <button className="bg-[#17171c] sm:mt-2 sm:text-[16px] font-[500] border rounded-[1.625rem] shadow-[0_1px_2px_rgba(0,0,0,0.2)] w-full flex items-center justify-center h-12 text-[15px] text-white">
      Done
    </button>
  </div>
</div>

        </div>
    </div>
  )
}

export default TransactionCompleted
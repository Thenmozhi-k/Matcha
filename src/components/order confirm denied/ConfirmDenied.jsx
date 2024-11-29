import React, { useState } from 'react';
import Market from '../Market';

const ConfirmDenied = () => {
    const [showMarket, setShowMarket] = useState(false); // State to toggle between ConfirmDenied and Market

    const handleBackClick = () => {
      setShowMarket(true);  // When the Back button is clicked, show Market component
    };
  
    if (showMarket) {
      return <Market/>;  // If state is true, show the Market component
    }
  return (
    <div className='flex justify-center items-center h-screen bg-black p-4'>
        <div className='bg-white h-[350px] border rounded-[1.625rem] w-full sm:h-[500px] sm:w-[500px] flex flex-col justify-center items-center gap-10'>

        <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Wyfqi9TBMEUk_fY3zH7k-r_9E3Vma7NX6A&s" alt="" className='w-16 h-16' />
            </div>

            <div className='flex flex-col gap-4 font-semibold justify-center items-center'>
                <p className='text-activeHead text-2xl'>Order Confirmation Denied</p>
                <p className='text-inactiveHead text-base'>You successfully cancelled the order</p>
            </div>

            <div className="pl-[3rem] pr-[3rem] mt-2 w-full">
    <button
    onClick={handleBackClick} 
     className="bg-[#17171c] sm:mt-2 sm:text-[16px] font-[500] border rounded-[1.625rem] shadow-[0_1px_2px_rgba(0,0,0,0.2)] w-full flex items-center justify-center h-12 text-[15px] text-white">
      Back
    </button>
  </div>

        </div>
        
    </div>
  )
}

export default ConfirmDenied
import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const BuySection = ({ setShowSearchBar, autoShowSecondBuy }) => {
    const [showSecondBuy, setShowSecondBuy] = useState(false);

    useEffect(() => {
        if (autoShowSecondBuy) {
            setShowSecondBuy(false);
        } else {
            setShowSecondBuy(true);
        }
    }, [autoShowSecondBuy]);

    return (
        <div className="flex justify-between">
            <div
                className="bg-gray-50 border-gray-200 hover:bg-gray-100 border sm:text-base  font-medium text-black sm:px-3 py-1.5 sm:py-2 rounded-[1.625rem] flex gap-2 cursor-pointer text-xs px-2"
                onClick={() => setShowSearchBar(true)}
            >
                <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="ETH" className="sm:w-6 sm:h-6 w-4  h-4" />
                <p className='text-xs sm:text-base '>ETH</p>
                <IoIosArrowDown
                    className="justify-center items-center ml-1 mt-1 text-xs sm:text-base"
                    // onClick={() => setShowSecondBuy(!showSecondBuy)}
                />
            </div>
            
            {showSecondBuy && (
               <div className="flex justify-end gap-[0.375rem] items-center">
               <button className='bg-[#f1f2f4] text-[#17171c] sm:text-[14px] text-xs font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]'>
                   50%
               </button>
               <button className='bg-[#f1f2f4] text-[#17171c] sm:text-[14px] text-xs font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]'>
                   Max
               </button>
           </div>
            )}
        </div>
    );
};

export default BuySection;


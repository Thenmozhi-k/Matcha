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
                className="bg-selectTokenbg text-sm font-medium text-white px-3 py-2 rounded-[1.625rem] flex gap-2 cursor-pointer"
                onClick={() => setShowSearchBar(true)}
            >
                <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="ETH" className="w-5 h-5" />
                <p>ETH</p>
                <IoIosArrowDown
                    className="justify-center items-center ml-2 mt-1 text-md"
                    // onClick={() => setShowSecondBuy(!showSecondBuy)}
                />
            </div>
            
            {showSecondBuy && (
               <div className="flex justify-end gap-[0.375rem] items-center">
               <button className='bg-[#f1f2f4] text-[#17171c] text-[14px] font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]'>
                   50%
               </button>
               <button className='bg-[#f1f2f4] text-[#17171c] text-[14px] font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]'>
                   Max
               </button>
           </div>
            )}
        </div>
    );
};

export default BuySection;


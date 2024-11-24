// SellSection.js
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

const SellSection = ({ setShowSearchBar }) => (
  <div>
    <div className="flex justify-between">
    <button
        onClick={() => setShowSearchBar(true)}
        className="bg-selectTokenbg sm:text-base font-medium text-white sm:px-3 py-1.5 sm:py-2 rounded-[1.625rem] flex text-xs px-2 ">
        Select Token <IoIosArrowDown className="justify-center items-center ml-1 mt-1 text-xs sm:text-base " />
        
    </button>
    <div className="flex justify-end gap-1.5 items-center">
        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 1" className="sm:w-[30px] sm:h-[30px] p-[0.375rem] bg-gray-100 rounded-full w-[25px] h-[25px]" />
        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 2" className="sm:w-[30px] sm:h-[30px] p-[0.375rem] bg-gray-100 rounded-full w-[25px] h-[25px]" />
        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 3" className="sm:w-[30px] sm:h-[30px] p-[0.375rem] bg-gray-100 rounded-full w-[25px] h-[25px]" />
    </div>
  </div>
  </div>
  
);

export default SellSection;

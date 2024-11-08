// SellSection.js
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";

const SellSection = ({ setShowSearchBar }) => (
  <div>
    <div className="flex justify-between">
    <button
        onClick={() => setShowSearchBar(true)}
        className="bg-selectTokenbg text-sm font-medium text-white px-3 py-2 rounded-[1.625rem] flex">
        Select Token <IoIosArrowDown className="justify-center items-center ml-2 mt-1 text-md" />
    </button>
    <div className="flex justify-end gap-[0.5rem] items-center">
        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 1" className="w-[30px] h-[30px] p-[0.375rem] bg-gray-100 rounded-full" />
        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 2" className="w-[30px] h-[30px] p-[0.375rem] bg-gray-100 rounded-full" />
        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 3" className="w-[30px] h-[30px] p-[0.375rem] bg-gray-100 rounded-full" />
    </div>
  </div>
  </div>
  
);

export default SellSection;

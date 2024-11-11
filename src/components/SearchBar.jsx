import React from 'react';
import { CgSearch } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import TokenList from './TokenList';
import { IoIosArrowDown } from "react-icons/io";

const SearchBar = ({ closeModal }) => {
  return (
    <div className='flex justify-center items-center  '>
      <div className='bg-white  w-4/5 h-[410px]  sm:h-[450px] sm:w-[450px] border rounded-[1.625rem] sm:py-3 py-2 justify-center overflow-hidden  '>
        <div className='flex gap-2 pl-[1.25rem] pr-[0.75rem] '>
          <div className='border p-2 border-none'><CgSearch className='sm:w-5 sm:h-5 w-4 h-4' /></div>
          <div className='w-full'>
            <input
              type="text"
              placeholder='search token name or paste address'
              className='w-full py-1 focus:outline-none text-xs sm:text-[15px]'
            />
          </div>
          <div className='border p-2 border-none' onClick={closeModal}>
            <IoMdClose className='sm:w-5 sm:h-5 w-4 h-4 cursor-pointer' />
          </div>
        </div>
        
        
        {/* Line section */}
        <div className="relative w-full h-[1px] sm:mt-2 mt-1 bg-[#f1f2f4]"></div>

        {/* platforms */}
        <div className='flex gap-3 pl-[1.25rem] pr-[0.75rem] mt-2'>
          <div> <button className='sm:text-sm text-xs font-[500] bg-[#f1f2f4] text-black py-2 px-[.45rem] w-10 rounded-[.55rem]'>All</button></div>
          <div className=' bg-[#f1f2f4] text-black  px-2 my-0.5  rounded-[.55rem] items-center justify-center flex '><img  src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="" className='sm:w-5 sm:h-5 w-3 h-3 items-center ' /></div>
          <div className='flex gap-1 bg-[#f1f2f4] text-black py-[.35rem] rounded-[.55rem]  px-[.45rem]'>
            <p className='sm:text-sm text-xs font-[500] '>More</p>
            <IoIosArrowDown className='text-xs mt-1'/>
          </div>
        </div>

        <div className="relative w-full h-[1px] sm:mt-3 mt-2 bg-[#f1f2f4]"></div>
        
        {/* Token list */}
        <div className=' sm:pt-3'>
          <TokenList />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

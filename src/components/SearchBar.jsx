import React from 'react';
import { CgSearch } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import TokenList from './TokenList';
import { IoIosArrowDown } from "react-icons/io";

const SearchBar = ({ closeModal }) => {
  return (
    <div className='flex justify-center items-center  '>
      <div className='bg-white  md:h-[450px] md:w-[450px] border rounded-[1.625rem] py-3 justify-center overflow-hidden '>
        <div className='flex gap-2 pl-[1.25rem] pr-[0.75rem] '>
          <div className='border p-2 border-none'><CgSearch className='w-5 h-5' /></div>
          <div className='w-full'>
            <input
              type="text"
              placeholder='search token name or paste address'
              className='w-full py-1 focus:outline-none'
            />
          </div>
          <div className='border p-2 border-none' onClick={closeModal}>
            <IoMdClose className='w-5 h-5 cursor-pointer' />
          </div>
        </div>
        
        
        {/* Line section */}
        <div className="relative w-full h-[1px] mt-2 bg-[#f1f2f4]"></div>

        {/* platforms */}
        <div className='flex gap-3'>
          <div> <button className='text-xs font-[500] bg-[#f1f2f4] text-black py-[.35rem]   px-[.45rem] w-10 rounded-[.55rem]'>All</button></div>
          <div className='w-10 bg-[#f1f2f4] text-black py-[.35rem]   rounded-[.55rem] items-center justify-center flex '><img  src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="" className='w-5 h-5 items-center ' /></div>
          <div className='flex gap-1 bg-[#f1f2f4] text-black py-[.35rem] rounded-[.55rem]  px-[.45rem]'>
            <p className='text-xs font-[500] '>More</p>
            <IoIosArrowDown className='text-xs mt-1'/>
          </div>
        </div>
        
        {/* Token list */}
        <div className='pt-5'>
          <TokenList />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

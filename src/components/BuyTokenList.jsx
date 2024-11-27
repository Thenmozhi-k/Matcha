import React, { useEffect, useState } from "react";
import { MAINNET_TOKENS } from "../utils/constants";
import { CgSearch } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

import { IoIosArrowDown } from "react-icons/io";

const addresses = [
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
  "0xB1a03EdA10342529bBF8EB700a06C60441fEf25d",
  "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
  "0xBAa5CC21fd487B8Fcc2F632f3F4E8D37262a0842",
  "0x2615a94df961278DcbC41Fb0a54fEc5f10a693aE",
  "0x9a26F5433671751C3276a065f57e5a02D2817973",
  "0x768BE13e1680b5ebE0024C42c896E3dB59ec0149",
  "0x2Da56AcB9Ea78330f947bD57C54119Debda7AF71",
  "0xA88594D404727625A9437C3f886C7643872296AE",

];

const BuyTokenList = ({ setBuySelectedToken, setShowSearchBar, closeModal }) => {
  const [trendingTokens, setTrendingTokens] = useState([]);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const promises = addresses.map(async (address) => {
          const response = await fetch(
           ` https://api.0x.org/tokens/v1/address/${address}`,
            {
              headers: {
                "0x-api-key": "a9e6734f-cd87-44c8-a4b5-a1c75945ae29",
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          return result.data[0];
        });

        const tokens = await Promise.all(promises);
        setTrendingTokens(tokens);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchTokenData();
  }, []);

  // Load selected token from localStorage (if available)
  const savedToken = localStorage.getItem("buySelectedToken");
  const buySelectedToken = savedToken ? JSON.parse(savedToken) : null;

  const selectToken = (token) => {
    onSelectToken(token);
    // Save the selected token in localStorage
    localStorage.setItem("buySelectedToken", JSON.stringify(token));
  };

  return (
    <div className='flex justify-center items-center'>
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

      {/* ======================= */}
      <div className="token-list overflow-y-auto sm:pt-3">
      <div className="pl-[1.25rem] pr-[0.75rem]">
        <p className="sm:text-sm text-xs text-inactiveHead font-semibold mt-4 sm:-mt-1">
          Most Popular
        </p>
        <div className="flex mt-2 sm:gap-3 gap-3 flex-wrap">
          {MAINNET_TOKENS.map((token, i) => (
            <button
              key={i}
              className="flex bg-[#f1f2f4] text-black text-[11px] font-[500] sm:py-[.35rem] rounded-[1.625rem] sm:px-[.45rem] py-[3px] px-[5px]"
              onClick={() => selectToken(token)}
            >
              <img
                src={token.logoURI}
                alt={token.name}
                className="sm:w-[18px] sm:h-[18px] w-4 h-4 rounded-full"
              />
              <span className="text-black sm:text-xs text-xs ml-1">
                {token.symbol}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="sm:mt-1 pt-3">
        <p className="sm:text-sm text-xs text-inactiveHead font-semibold pl-[1.25rem] pr-[0.75rem]">
          Trending
        </p>
        <div className="h-64 pl-[1.25rem] pr-[0.75rem] ">
          {trendingTokens.map((token, i) => (
            <div
              key={i}
              onClick={() => {
                setBuySelectedToken(token);
                setShowSearchBar(false);
              }}
              className="flex justify-between sm:mt-5 mt-4 cursor-pointer"
            >
              <div className="flex gap-2">
                <img
                  src={token.logo}
                  alt={token.name}
                  className="w-[30px] h-[30px] p-[0.375rem] bg-gray-100 rounded-full"
                />
                <div className="flex flex-col ml-2">
                  <span className="text-xs font-[500]">{token.symbol}</span>
                  <span className="text-xs text-gray-500 font-[500]">
                    {token.name}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-inactiveHead">
                  {token.chainName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default BuyTokenList;
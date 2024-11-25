import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SellTokenList from "./SellTokenList";

const SellSection = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [sellSelectedToken, setSellSelectedToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("sellSelectedToken");
    if (storedToken) {
      setSellSelectedToken(JSON.parse(storedToken));
    }
  }, []);

  
  useEffect(() => {
    if (sellSelectedToken) {
      localStorage.setItem("sellSelectedToken", JSON.stringify(sellSelectedToken));
    } else {
      localStorage.removeItem("sellSelectedToken"); 
    }
  }, [sellSelectedToken]);

  return (
    <div className="">
      {/* Display "Select Token" or selected token */}
      {!sellSelectedToken ? (
        <div className="flex justify-between">
          <button
            onClick={() => setShowSearchBar(true)}
            className="bg-selectTokenbg sm:text-base font-medium text-white sm:px-3 py-1.5 sm:py-2 rounded-[1.625rem] flex text-xs px-2"
          >
            Select Token{" "}
            <IoIosArrowDown className="justify-center items-center ml-1 mt-1 text-xs sm:text-base" />
          </button>
          <div className="flex justify-end gap-1.5 items-center">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
              alt="Token 1"
              className="sm:w-[30px] sm:h-[30px] p-[0.375rem] bg-gray-100 rounded-full w-[25px] h-[25px]"
            />
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
              alt="Token 2"
              className="sm:w-[30px] sm:h-[30px] p-[0.375rem] bg-gray-100 rounded-full w-[25px] h-[25px]"
            />
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
              alt="Token 3"
              className="sm:w-[30px] sm:h-[30px] p-[0.375rem] bg-gray-100 rounded-full w-[25px] h-[25px]"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div
            className="bg-gray-50 border-gray-200 hover:bg-gray-100 border sm:text-base font-medium text-black sm:px-3 py-1.5 sm:py-2 rounded-[1.625rem] flex gap-2 cursor-pointer text-xs px-2"
            onClick={() => setShowSearchBar(true)}
          >
            <img
              src={sellSelectedToken.logo}
              alt={sellSelectedToken.symbol}
              className="sm:w-6 sm:h-6 w-4 h-4"
            />
            <p className="text-xs sm:text-base">{sellSelectedToken.symbol}</p>
            <IoIosArrowDown className="justify-center items-center ml-1 mt-1 text-xs sm:text-base" />
          </div>

          <div className="flex justify-end gap-[0.375rem] items-center">
            <button className="bg-[#f1f2f4] text-[#17171c] sm:text-[14px] text-xs font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]">
              50%
            </button>
            <button className="bg-[#f1f2f4] text-[#17171c] sm:text-[14px] text-xs font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]">
              Max
            </button>
          </div>
        </div>
      )}

      {/* Token Selection Modal */}
      {showSearchBar && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <SellTokenList
            setSellSelectedToken={setSellSelectedToken}
            setShowSearchBar={setShowSearchBar}
          />
        </div>
      )}
    </div>
  );
};

export default SellSection;
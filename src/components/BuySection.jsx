import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import BuyTokenList from './BuyTokenList';

const BuySection = ({ autoShowSecondBuy }) => {
  const [showSecondBuy, setShowSecondBuy] = useState(false);
  const [buySelectedToken, setBuySelectedToken] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("buySelectedToken");
    if (storedToken) {
      setBuySelectedToken(JSON.parse(storedToken));
    }
  }, []);

  useEffect(() => {
    if (buySelectedToken) {
      localStorage.setItem("buySelectedToken", JSON.stringify(buySelectedToken));
    } else {
      localStorage.removeItem("buySelectedToken"); 
    }
  }, [buySelectedToken]);

  useEffect(() => {
    setShowSecondBuy(autoShowSecondBuy);
  }, [autoShowSecondBuy]);

  const handleTokenSelect = (token) => {
    setBuySelectedToken(token);
    setShowSearchBar(false);  // Close the search bar once a token is selected
  };

  const savedToken = localStorage.getItem("buySelectedToken");
  const token = savedToken ? JSON.parse(savedToken) : buySelectedToken || {
    symbol: "WETH",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/weth.svg",
  };

  return (
    <div>
      {/* Display selected token or show search button */}
      {!buySelectedToken ? (
        <div className="flex justify-between">
          <div
            className="bg-gray-50 border-gray-200 hover:bg-gray-100 border sm:text-base font-medium text-black sm:px-3 py-1.5 sm:py-2 rounded-[1.625rem] flex gap-2 cursor-pointer text-xs px-2"
            onClick={() => setShowSearchBar(true)} // Open search bar on click
          >
            <img
              src={token.logoURI}
              alt={token.symbol}
              className="sm:w-6 sm:h-6 w-4 h-4"
            />
            <p className="text-xs sm:text-base">{token.symbol}</p>
            <IoIosArrowDown className="justify-center items-center ml-1 mt-1 text-xs sm:text-base" />
          </div>

          {showSecondBuy && (
            <div className="flex justify-end gap-[0.375rem] items-center">
              <button className="bg-[#f1f2f4] text-[#17171c] sm:text-[14px] text-xs font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]">
                50%
              </button>
              <button className="bg-[#f1f2f4] text-[#17171c] sm:text-[14px] text-xs font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]">
                Max
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-between">
          <div
            className="bg-gray-50 border-gray-200 hover:bg-gray-100 border sm:text-base font-medium text-black sm:px-3 py-1.5 sm:py-2 rounded-[1.625rem] flex gap-2 cursor-pointer text-xs px-2"
            onClick={() => setShowSearchBar(true)} // Open search bar on click
          >
            <img
              src={buySelectedToken.logo}
              alt={buySelectedToken.symbol}
              className="sm:w-6 sm:h-6 w-4 h-4"
            />
            <p className="text-xs sm:text-base">{buySelectedToken.symbol}</p>
            <IoIosArrowDown className="justify-center items-center ml-1 mt-1 text-xs sm:text-base" />
          </div>

          {showSecondBuy && (
            <div className="flex justify-end gap-[0.375rem] items-center">
              <button className="bg-[#f1f2f4] text-[#17171c] sm:text-[14px] text-xs font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]">
                50%
              </button>
              <button className="bg-[#f1f2f4] text-[#17171c] sm:text-[14px] text-xs font-[500] py-[.30rem] opacity-[0.5] rounded-[1.625rem] border px-[.75rem] border-[#d5d9dd]">
                Max
              </button>
            </div>
          )}
        </div>
      )}

      {/* Token Selection Modal */}
      {showSearchBar && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <BuyTokenList
            setBuySelectedToken={handleTokenSelect} 
            setShowSearchBar={setShowSearchBar}
          />
        </div>
      )}
    </div>
  );
};

export default BuySection;

import React, { useEffect, useState } from "react";
import { MAINNET_TOKENS } from "../utils/constants";

const addresses = [
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

const SellTokenList = () => {
    const [trendingTokens, setTrendingTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState(null);
  
    useEffect(() => {
      const fetchTokenData = async () => {
        try {
          const promises = addresses.map(async (address) => {
            const response = await fetch(
              `https://api.0x.org/tokens/v1/address/${address}`,
              {
                headers: {
                  "0x-api-key": "a9e6734f-cd87-44c8-a4b5-a1c75945ae29",
                  "Content-Type": "application/json",
                },
              }
            );
            const result = await response.json();
            return result.data[0]; // Assuming the API returns "data"
          });
  
          const tokens = await Promise.all(promises);
          setTrendingTokens(tokens);
        } catch (error) {
          console.error("Error fetching token data:", error);
        }
      };
  
      fetchTokenData();
    }, []);

  return (
    <div className="token-list overflow-y-auto">
      {/* Most Popular Section */}
      <div className="pl-[1.25rem] pr-[0.75rem]">
        <p className="sm:text-sm text-xs text-inactiveHead font-semibold mt-4 sm:-mt-1">
          Most Popular
        </p>
        <div className="flex mt-2 sm:gap-3 gap-3 flex-wrap">
          {MAINNET_TOKENS.map((token, i) => (
            <button
              key={i}
              className="flex bg-[#f1f2f4] text-black text-[11px] font-[500] sm:py-[.35rem] rounded-[1.625rem] sm:px-[.45rem] py-[3px] px-[5px]"
              onClick={() => setSelectedToken(token)}
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

      {/* Trending Section */}
      <div className="sm:mt-1 pt-3">
        <p className="sm:text-sm text-xs text-inactiveHead font-semibold pl-[1.25rem] pr-[0.75rem]">
          Trending
        </p>
        <div className="h-64 pl-[1.25rem] pr-[0.75rem] overflow-y-auto">
        {trendingTokens.map((token, i) => (
            <div
              key={i}
              onClick={() => setSelectedToken(token)}
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
  );
};

export default SellTokenList;

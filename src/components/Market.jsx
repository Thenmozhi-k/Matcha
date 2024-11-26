import React, { useState, useEffect } from 'react';
import { LuSettings } from "react-icons/lu";
import { IoMdArrowDown } from "react-icons/io";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';
import { CustomButton } from './CustomButton';
import SellSection from './SellSection';
import BuySection from './BuySection';
import SellSearchBar from './SellSearchBar'; 
import BuySearchBar from './BuySearchBar';   
import axios from "axios";

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true,
});

const Market = () => {
    const [sellInputValue, setSellInputValue] = useState('');
    const [buyInputValue, setBuyInputValue] = useState('');
    const [showSellSearchBar, setShowSellSearchBar] = useState(false); 
    const [showBuySearchBar, setShowBuySearchBar] = useState(false);  
    const [showsell, setShowSell] = useState(true);
    const [showBuy, setShowBuy] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false)
    const [autoShowSecondBuy, setAutoShowSecondBuy] = useState(false);
    const [error, setError] = useState(false)
    const [buyToken, setBuyToken] = useState(() => {
      // Retrieve and parse the token from localStorage during initialization
      return JSON.parse(localStorage.getItem("buySelectedToken")) || null;
    });
    const [sellToken, setSellToken] = useState(() => {
      // Retrieve and parse the token from localStorage during initialization
      return JSON.parse(localStorage.getItem("sellSelectedToken")) || null;
    });

    const [selectedToken, setSelectedToken] = useState();
    const [swapQuote, setSwapQuote] = useState(null); 

    const handleSelectToken = (token) => {
      setSelectedToken(token);
    };
  

    useEffect(() => {
        if (showBuy) {
            setAutoShowSecondBuy(false); // Show the secondBuy when BuySection is active
        } else {
            setAutoShowSecondBuy(true); // Hide it when SellSection is active
        }
    }, [showBuy]);

    const handleSellInputChange = (e) => {
      const value = e.target.value;

      // Allow only valid numbers (with a single dot for decimals)
      const validValue = value.replace(/[^0-9.]/g, "");
      if (validValue.split(".").length > 2) return; // Prevent multiple decimals

      setSellInputValue(validValue);
    };


   

    const handleBuyInputChange = (e) => {
        const value = e.target.value;
        const validValue = value.replace(/[^0-9.]/g, '');
        if (validValue.split('.').length > 2) return;
        setBuyInputValue(validValue);
    };

    const SwapSellBuy = () => {
        setShowBuy(!showBuy);
        setShowSell(!showsell);
    };

    const handleKeyPress = (e) => {
        if (e.key === '-') {
            e.preventDefault();
        }
    };

    const queryClient = new QueryClient();

    const fetchSwapQuote = async (buyToken, sellToken, chainId = 8453) => {
        if (!buyToken || !sellToken) {
          console.error("Tokens are not selected.");
          return;
        }

        setLoading(true);
        setError(null);  // Reset error state before fetching new data

        const endpoint = "https://api.0x.org/swap/permit2/quote";
        const params = {
          chainId,
          buyToken: buyToken.address,
          sellToken: sellToken.address,
          sellAmount: sellInputValue * 1e18, // Assuming 18 decimals
          taker: "0x9BC9DfcF26c3dA16058Aa604E01Bbe85B9903bbA",
        };
        console.log(params);
        try {
            const response = await fetch(endpoint + "?" + new URLSearchParams(params), {
                method: "GET",
                headers: {
                    "0x-api-key": "a9e6734f-cd87-44c8-a4b5-a1c75945ae29",
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            setSwapQuote(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
         console.log(sellInputValue);
         console.log(buyToken, sellToken);
        if (sellInputValue > 0 && buyToken && sellToken) {
             console.log(sellInputValue);
             console.log(buyToken, sellToken);
            fetchSwapQuote(buyToken, sellToken);  
        }
    }, [sellInputValue, buyToken, sellToken]);

   
    

    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <div className="flex justify-center items-center h-screen bg-black p-4">
              <div className="bg-white h-[350px] border rounded-[1.625rem] w-full sm:h-[500px] sm:w-[500px]">
                <div className="flex justify-between pl-[1.25rem] py-1 pr-[0.75rem] border-b items-center sm:py-3">
                  <div className="flex gap-[1.5rem] font-medium sm:text-[17px] text-xs ">
                    <button className="text-activeHead">Market</button>
                    <button className="text-inactiveHead">Limit</button>
                    <button className="text-inactiveHead">Cross chain</button>
                  </div>
                  <div className="sm:w-[40px] sm:h-[36px] flex items-center justify-center w-[30px] h-[26px]">
                    <LuSettings className="h-4 w-4 text-[#22262a]" />
                  </div>
                </div>

                <div>
                  <div className="px-[1.5rem] sm:py-[1rem] flex flex-col sm:space-y-4 space-y-2 py-[.55rem]">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold sm:text-[14px] text-[12px] text-sell">
                        Sell
                      </p>
                    </div>
                    {showsell ? (
                      <SellSection
                        setShowSearchBar={() => setShowSellSearchBar(true)}
                      />
                    ) : (
                      <BuySection
                        setShowSearchBar={() => setShowBuySearchBar(true)}
                        autoShowSecondBuy={autoShowSecondBuy}
                        selectedToken={selectedToken}
                      />
                    )}

                    <div className="sell-input mb-[0.5rem] flex justify-between items-center">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="pr-4 overflow-ellipsis w-[75%] sm:text-[32px] font-semibold focus:outline-none text-[20px]"
                        min={0}
                        value={sellInputValue}
                        onChange={(e) => setSellInputValue(e.target.value)}
                        Change={handleSellInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                  </div>

                  {/* Display SellSearchBar */}
                  {showSellSearchBar && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                      <SellSearchBar
                        closeModal={() => setShowSellSearchBar(false)}
                      />
                    </div>
                  )}

                  {/* Divider */}
                  <div className="relative w-full h-[1px] bg-[#f1f2f4]"></div>
                  <div className="relative flex justify-center -mt-3">
                    <div className="bg-white border rounded-full p-1 flex items-center justify-center">
                      <IoMdArrowDown
                        className="h-5 w-5"
                        onClick={SwapSellBuy}
                      />
                    </div>
                  </div>

                  <div className="px-[1.5rem] sm:py-[1rem] flex flex-col sm:space-y-4 -mt-5 space-y-2 py-[.55rem]">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold sm:text-[14px] text-[12px] text-sell">
                        Buy
                      </p>
                    </div>
                    {showBuy ? (
                      <BuySection
                        setShowSearchBar={() => setShowBuySearchBar(true)}
                        autoShowSecondBuy={autoShowSecondBuy}
                      />
                    ) : (
                      <SellSection
                        setShowSearchBar={() => setShowSellSearchBar(true)}
                      />
                    )}

                    <div className="buy-input mb-[0.5rem] flex justify-between items-center">
                      <input
                        type="number"
                        placeholder="0.0"
                        className="pr-4 overflow-ellipsis w-[75%] sm:text-[32px] font-semibold focus:outline-none text-[20px]"
                        min={0}
                        value={buyInputValue}
                        onChange={handleBuyInputChange}
                        onKeyPress={handleKeyPress}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Display BuySearchBar */}
                  {showBuySearchBar && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                      <BuySearchBar
                        closeModal={() => setShowBuySearchBar(false)}
                      />
                    </div>
                  )}

                  {/* Divider */}
                  <div className="relative w-full h-[1px] bg-[#f1f2f4]"></div>

                  <div className="px-[1.5rem] py-[1rem] justify-center flex items-center">
                    <CustomButton />
                  </div>
                </div>
              </div>
            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
};

export default Market;
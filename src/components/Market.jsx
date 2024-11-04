import React, { useState } from 'react'; // Added useState import
import { LuSettings } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowDown } from "react-icons/io";

import { ConnectButton } from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider, darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
  

const Market = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        const validValue = value.replace(/[^0-9.]/g, '');
        // Ensure there's only one decimal point
        if (validValue.split('.').length > 2) return;
        setInputValue(validValue);
    };

    const handleKeyPress = (e) => {
        // Prevent entering a negative sign
        if (e.key === '-') {
            e.preventDefault();
        }
    };

    const queryClient = new QueryClient();

    return (

        <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="bg-white md:h-[500px] border rounded-[1.625rem] md:w-[500px]">
                
                {/* Head section */}
                <div className="flex justify-between pl-[1.25rem] py-3 pr-[0.75rem] border-b items-center">
                    <div className="flex gap-[1.5rem] font-medium text-[17px]">
                        <button className="text-activeHead">Market</button>
                        <button className="text-inactiveHead">Limit</button>
                        <button className="text-inactiveHead">Cross chain</button>
                    </div>
                    <div className="w-[40px] h-[36px] flex items-center justify-center">
                        <LuSettings className="h-4 w-4 text-[#22262a]" />
                    </div>
                </div>

                {/* Main section */}
                <div >
                    <div className="px-[1.5rem] py-[1rem] flex flex-col space-y-4">
                        {/* Sell section */}
                    <div className="">
                        <div className="flex justify-between items-center mb-[0.65rem]">
                            <p className="font-semibold text-[14px] text-sell">Sell</p>
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-selectTokenbg text-sm font-medium text-white px-3 py-2 rounded-[1.625rem] flex">
                                Select Token <IoIosArrowDown className="justify-center items-center ml-2 mt-1 text-md" />
                            </button>
                            <div className="flex justify-end gap-[0.5rem] items-center">
                                <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 1" className="w-[30px] h-[30px] p-[0.375rem] bg-gray-100 rounded-full" />
                                <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 2" className="w-[30px] h-[30px] p-[0.375rem] bg-gray-100 rounded-full" />
                                <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" alt="Token 3" className="w-[30px] h-[30px] p-[0.375rem] bg-gray-100 rounded-full" />
                            </div>
                        </div>

                        <div className="mb-[0.5rem] mt-4 flex justify-between items-center">
                            <input
                                type="number"
                                placeholder="0.0"
                                className="pr-4 overflow-ellipsis text-[32px] font-semibold  focus:outline-none"
                                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                min={0}
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <span className="text-[17px]  items-center text-[#9299a6] mt-6">$ 0.00</span>
                        </div>
                    </div>
                    </div>
                    
                    
                    {/* Line section */}
                   <div className="relative w-full h-[1px] bg-[#f1f2f4]"></div>
                      <div className="relative flex justify-center -mt-3">
                          <div className="bg-white border rounded-full p-1  flex items-center justify-center">
                              <IoMdArrowDown className="h-5 w-5 " />
                          </div>
                    </div>


                    <div className="px-[1.5rem] py-[1rem] flex flex-col space-y-4 -mt-5">
                        {/* buy section */}
                    <div className="">
                        <div className="flex justify-between items-center mb-[0.65rem]">
                            <p className="font-semibold text-[14px] text-sell">Buy</p>
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-selectTokenbg text-sm font-medium text-white px-3 py-2 rounded-[1.625rem] flex">
                                Select Token <IoIosArrowDown className="justify-center items-center ml-2 mt-1 text-md" />
                            </button>
                            
                        </div>

                        <div className="mb-[0.5rem] mt-4 flex justify-between items-center">
                            <input
                                type="number"
                                placeholder="0.0"
                                className="pr-4 overflow-ellipsis text-[32px] font-semibold  focus:outline-none"
                                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                min={0}
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                readOnly
                            />
                            <span className="text-[17px]  items-center text-[#9299a6] mt-6">$ 0.00</span>
                        </div>
                    </div>
                    </div>

                    {/* line section */}
                    <div className="relative w-full h-[1px] bg-[#f1f2f4]"></div>

                    {/* connect button */}
                    <div className='justify-center flex items-center mt-7'>
                    <ConnectButton  />
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

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
import SearchBar from './SearchBar';
import SellSection from './SellSection';
import BuySection from './BuySection';

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true,
});

const Market = () => {
    const [sellInputValue, setSellInputValue] = useState('');
    const [buyInputValue, setBuyInputValue] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showsell, setShowSell] = useState(true);
    const [showBuy, setShowBuy] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [autoShowSecondBuy, setAutoShowSecondBuy] = useState(false); // New state

    useEffect(() => {
        if (showBuy) {
            setAutoShowSecondBuy(true); // Show the secondBuy when BuySection is active
        } else {
            setAutoShowSecondBuy(false); // Hide it when SellSection is active
        }
    }, [showBuy]);

    const handleSellInputChange = (e) => {
        const value = e.target.value;
        const validValue = value.replace(/[^0-9.]/g, '');
        if (validValue.split('.').length > 2) return;
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

    

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <div className="flex justify-center items-center h-screen bg-black">
                        <div className="bg-white md:h-[500px] border rounded-[1.625rem] md:w-[500px]">
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

                            <div>
                                <div className="px-[1.5rem] py-[1rem] flex flex-col space-y-4">
                                    <div className="flex justify-between items-center ">
                                        <p className="font-semibold text-[14px] text-sell">Sell</p>
                                    </div>
                                    {showsell ? <SellSection setShowSearchBar={setShowSearchBar} /> : <BuySection setShowSearchBar={setShowSearchBar} autoShowSecondBuy={autoShowSecondBuy} /> }

                                    <div className="sell-input mb-[0.5rem] flex justify-between items-center">
                                        <div>
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            className="pr-4 overflow-ellipsis max-w-[75%] text-[32px] font-semibold focus:outline-none"
                                            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                            min={0}
                                            value={sellInputValue}
                                            onChange={handleSellInputChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                        </div>
                                      
                                      <div className='usd-inputmax-w-[25%] '>
                                        <span className='text-end text-inactiveHead max-w-[3%]'>$</span>
                                      <input 
                                            type="number"
                                            className=" text-[15px] font-[400] items-center max-w-[22%]  text-end text-black mt-4 focus:outline-none"
                                            placeholder={isFocused ? '0' : '0.00'}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                        />
                                      </div>
                                        
                                    </div>
                                </div>

                                {showSearchBar && (
                                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                                        <SearchBar closeModal={() => setShowSearchBar(false)} />
                                    </div>
                                )}

                                <div className="relative w-full h-[1px] bg-[#f1f2f4]"></div>
                                <div className="relative flex justify-center -mt-3">
                                    <div className="bg-white border rounded-full p-1 flex items-center justify-center">
                                        <IoMdArrowDown className="h-5 w-5" onClick={SwapSellBuy} />
                                    </div>
                                </div>

                                <div className="px-[1.5rem] py-[1rem] flex flex-col space-y-4 -mt-5">
                                    <div className="flex justify-between items-center ">
                                        <p className="font-semibold text-[14px] text-sell">Buy</p>
                                    </div>
                                    {showBuy ? <BuySection setShowSearchBar={setShowSearchBar} autoShowSecondBuy={autoShowSecondBuy} /> : <SellSection setShowSearchBar={setShowSearchBar} />}

                                    <div className="buy-input mb-[0.5rem] flex justify-between items-center">
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            className="pr-4 overflow-ellipsis max-w-[75%] text-[32px] font-semibold focus:outline-none"
                                            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                                            min={0}
                                            value={buyInputValue}
                                            onChange={handleBuyInputChange}
                                            onKeyPress={handleKeyPress}
                                            readOnly
                                        />
                                        <input
                                            type="number"
                                            className="text-[15px] items-center max-w-[25%] font-[400] text-end text-[#9299a6] mt-4 focus:outline-none"
                                            placeholder='$ 0.00'
                                            readOnly
                                        />
                                    </div>
                                </div>

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

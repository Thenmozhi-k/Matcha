import React, { useState, useEffect } from 'react';
import { LuSettings } from "react-icons/lu";
import { IoMdArrowDown } from "react-icons/io";
import { CustomButton } from './CustomButton';
import SellSection from './SellSection';
import BuySection from './BuySection';
import SellSearchBar from './SellSearchBar'; 
import BuySearchBar from './BuySearchBar';   
import axios from "axios";
import Web3 from 'web3';
import { useAccount } from 'wagmi';
import PlaceOrder from './placeorder/PlaceOrder';
import { ethers } from "ethers";

const web3 = new Web3(window.ethereum || 'https://mainnet.infura.io/v3/5ff618058593414aae2f28055c712825');

const Market = () => {
  const [sellInputValue, setSellInputValue] = useState("");
  const [buyInputValue, setBuyInputValue] = useState("");
  const [showSellSearchBar, setShowSellSearchBar] = useState(false);
  const [showBuySearchBar, setShowBuySearchBar] = useState(false);
  const [showsell, setShowSell] = useState(true);
  const [showBuy, setShowBuy] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoShowSecondBuy, setAutoShowSecondBuy] = useState(false);
  const [autoShowSecondSell, setAutoShowSecondSell] = useState(false);
  const storedToken = localStorage.getItem("sellSelectedToken");
  const TokenJsonData = JSON.parse(storedToken);
  const [balance, setBalance] = useState();
  const { address: accountAddress } = useAccount();
  const [numberType, setNumberType] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  // const account = useAccount();
  const [walletAddress, setWalletAddress] = useState(""); // Replace with dynamic wallet address

  const tokenABI = [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
        {
          name: "_spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const getTokenBalance = async (walletAddress, tokenAddress) => {
    try {
      if (tokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
        const balance = await web3.eth.getBalance(walletAddress);
        const formattedBalance = parseFloat(
          web3.utils.fromWei(balance, "ether")
        );
        console.log("Balance (in Ether):", formattedBalance);
        return formattedBalance;
      } else {
        console.log("Token Address", tokenAddress);
        const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
        // Fetch token decimals
        const decimals = await tokenContract.methods.decimals().call();
        console.log(`Decimals: ${decimals}`);
        // Fetch balance
        const rawBalance = await tokenContract.methods
          .balanceOf(walletAddress)
          .call();
        console.log(`rawBalance: ${rawBalance}`);
        console.log(`Balance: ${rawBalance}`);
        return rawBalance;
      }
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  const fetchingBalance = async () => {
    try {
      if (accountAddress) {
        // Ensure accountAddress is available
        const result = await getTokenBalance(
          accountAddress,
          TokenJsonData?.address
        );
        setBalance(result);
        return result;
      } else {
        console.error("No wallet connected.");
      }
    } catch (error) {
      console.error("Error fetching balance", error);
    }
  };

  useEffect(() => {
    if (TokenJsonData && accountAddress) {
      fetchingBalance();
    }
  }, [TokenJsonData, accountAddress]);

  const [error, setError] = useState(false);
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

  useEffect(() => {
    if (showsell) {
      setAutoShowSecondSell(true); // Show the secondBuy when BuySection is active
    } else {
      setAutoShowSecondSell(false); // Hide it when SellSection is active
    }
  }, [showsell]);

  const handleSellInputChange = (e) => {
    const value = e.target.value;

    // Allow only valid numbers (with a single dot for decimals)
    const validValue = value.replace(/[^0-9.]/g, "");
    if (validValue.split(".").length > 2) return;

    // Update sell input value
    setSellInputValue(validValue);
    if (validValue == 0) {
      setBuyInputValue("");
    }
    if (buyToken && sellToken && validValue > 0) {
      fetchSwapQuote(buyToken, sellToken);
    }
  };

  const handleBuyInputChange = (e) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9.]/g, "");
    if (validValue.split(".").length > 2) return;
    setBuyInputValue(validValue);
  };

  const SwapSellBuy = () => {
    // Temporary variables to store current state values
    const tempSellInputValue = sellInputValue;
    const tempBuyInputValue = buyInputValue;
    const tempSellToken = sellToken;

    // Swap input values
    setSellInputValue(tempBuyInputValue);
    setBuyInputValue(tempSellInputValue);

    // Swap tokens
    setSellToken(buyToken); // Set sell token to current buy token
    setBuyToken(tempSellToken); // Set buy token to current sell token

    // Toggle visibility of Sell and Buy sections if needed
    setShowSell((prev) => !prev);
    setShowBuy((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (e.key === "-") {
      e.preventDefault();
    }
  };
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (!window.ethereum) {
        console.warn("MetaMask not installed");
     
   
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error.message);

      }
    };

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
      }
    };

    checkWalletConnection();

    // Add the event listener for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

   const fetchSwapQuote = async (buyToken, sellToken, chainId = 8453) => {
    if (!buyToken || !sellToken) {
        console.error("Tokens are not selected.");
        return;
    }

    setLoading(true);
    setError(null); // Reset error state before fetching new data

    const params = {
        chainId,
        buyToken: buyToken.address,
        sellToken: sellToken.address,
        sellAmount: sellInputValue * 1e18, // Assuming 18 decimals
        taker: walletAddress,
    };

    try {
        const response = await fetch(
            `http://localhost:3001/api/swap-quote?` + new URLSearchParams(params), // Call your backend API
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
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
    <div className="w-full min-h-screen">
      <div className="flex justify-center items-center h-screen bg-black p-4">
        {showPlaceOrder && <PlaceOrder setShowPlaceOrder={setShowPlaceOrder} />}
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
                  autoShowSecondSell={autoShowSecondSell}
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
                  onChange={(e) => handleSellInputChange(e)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Display SellSearchBar */}
            {showSellSearchBar && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <SellSearchBar closeModal={() => setShowSellSearchBar(false)} />
              </div>
            )}

            {/* Divider */}
            <div className="relative w-full h-[1px] bg-[#f1f2f4]"></div>
            <div className="relative flex justify-center -mt-3">
              <div className="bg-white border rounded-full p-1 flex items-center justify-center">
                <IoMdArrowDown className="h-5 w-5" onClick={SwapSellBuy} />
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
                  autoShowSecondSell={autoShowSecondSell}
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
                <BuySearchBar closeModal={() => setShowBuySearchBar(false)} />
              </div>
            )}

            {/* Divider */}
            <div className="relative w-full h-[1px] bg-[#f1f2f4]"></div>

            <div className="px-[1.5rem] py-[1rem] justify-center flex items-center">
              {balance < parseFloat(sellInputValue || 0) ? (
                "Not Enough Balance"
              ) : (
                <CustomButton setShowPlaceOrder={setShowPlaceOrder} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
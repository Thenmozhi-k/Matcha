import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { PiDotDuotone } from "react-icons/pi";
import { LuArrowRightLeft } from "react-icons/lu";
import TransactionPending from '../transaction pending/TransactionPending';
import ConfirmDenied from '../order confirm denied/ConfirmDenied';


const PlaceOrder = () => {
  const [buyToken, setBuyToken] = useState(() => {
    return JSON.parse(localStorage.getItem("buySelectedToken")) || null;
  });

  const [sellToken, setSellToken] = useState(() => {
    return JSON.parse(localStorage.getItem("sellSelectedToken")) || null;
  });

  const [seconds, setSeconds] = useState(25); // Default 25 seconds
  const [isTimeout, setIsTimeout] = useState(false); // Track whether we're in the timeout section
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [isWalletDenied, setIsWalletDenied] = useState(false); 


  useEffect(() => {
    let timerId;
    if (seconds > 0 && !isTimeout) {
      timerId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsTimeout(true); // Switch to the timeout section when the timer hits 0
    }
    return () => clearInterval(timerId); // Clean up the interval when the component unmounts or the timer reaches 0
  }, [seconds, isTimeout]);

  const formattedTime = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  const handleRefresh = () => {
    setIsTimeout(false); // Reset to timein section
    setSeconds(25); // Reset the timer
  };


  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const chainId = "0x1"; // Mainnet. Update as necessary.
  const sellInputValue = 1; // Example sell amount

  const params = {
    chainId,
    buyToken: buyToken?.address,
    sellToken: sellToken?.address,
    sellAmount: sellInputValue * 1e18, // Assuming 18 decimals
    taker: "0x9BC9DfcF26c3dA16058Aa604E01Bbe85B9903bbA",
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
  };

  const handleConfirmWallet = async () => {
    if (window.ethereum) {
      try {
        // Request a transaction via MetaMask
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const from = accounts[0];

        // Example transaction parameters
        const transactionParams = {
          from,
          to: params.taker,
          value: "0x0", // Replace with actual value if required
          data: "0x", // Add appropriate data for the transaction
          chainId: params.chainId,
        };

        await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParams],
        });

        alert("Transaction sent successfully!");
      } catch (error) {
        console.error("Error sending transaction:", error);
        alert("Transaction failed.");
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  const handleWalletConnectionDenied = () => {
    setIsWalletDenied(true); // Set the state to true if the wallet connection is denied
  };

  if (isTransactionPending) {
    return <TransactionPending/>;
  }

  if (isWalletDenied) {
    return <ConfirmDenied/>; // Show ConfirmDenied if wallet connection was denied
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black p-4">
      {/* ===================== Timein Section ==================== */}
      {!isTimeout && (
        <div className="bg-white h-[350px] border rounded-[1.625rem] w-full sm:h-[500px] sm:w-[500px]">
          <div className="relative py-1 sm:py-3">
            <FaArrowLeftLong className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-activeHead" />
            <p className="text-center text-activeHead font-semibold">
              Quote <span className="text-inactiveHead">Expires in {formattedTime}</span>
            </p>
          </div>

          {/* Token details */}
          <div className="relative flex pl-[1.25rem] py-1 pr-[1.25rem] gap-2 justify-between">
            <div className="absolute top-[3.7rem] left-1/2 -translate-x-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center flex">
                <MdKeyboardArrowRight className="w-7 h-7" />
              </div>
            </div>

            {/* Sell div */}
            <div className="bg-gray-100 rounded-3xl w-1/2 h-[150px] flex flex-col items-center justify-center">
              <div>
                <img src={sellToken?.logo} alt="" className="h-12 w-12 rounded-full" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-activeHead">1.00e-7 ETH</p>
                <p className="text-inactiveHead">s0.01</p>
              </div>
            </div>

            {/* Buy div */}
            <div className="bg-gray-100 rounded-3xl w-1/2 h-[150px] flex flex-col items-center justify-center">
              <div>
                <img src={buyToken?.logo} alt="" className="h-12 w-12 rounded-full" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-activeHead">1.00e-7 ETH</p>
                <p className="text-inactiveHead">s0.01</p>
              </div>
            </div>
          </div>
          <div>
          {/* Network cost */}
          <div className="flex justify-between pl-[1.25rem] pt-4 pr-[1.25rem] text-sm">
            <div className="flex text-center justify-center items-center gap-2">
              <GoDotFill className="text-gray-500 w-3 h-3" />
              <p className="text-gray-500 font-medium">Network cost</p>
            </div>
            <div className="flex text-gray-800">
              <p>0.0000000 </p>
              <p>ETH</p>
              <p className="text-gray-500">(0.132)</p>
            </div>
          </div>

          {/* Dotted flow */}
          <div className="flex justify-start pl-[1.50rem] pr-[1.25rem] -mt-1">
            <div className="border-l-2 border-dotted border-gray-300 h-4"></div>
          </div>

          {/* Received */}
          <div className="flex justify-between pr-[1.25rem] -mt-2 text-sm">
            <div className="flex text-center justify-center items-center">
              <PiDotDuotone className="text-black w-12 h-12" />
              <p className="text-gray-500 font-medium -ml-2">You receive (0% fee)</p>
            </div>
            <div className="flex text-gray-800 items-center">
              <p>0.0000000 </p>
              <p>ETH</p>
            </div>
          </div>
        </div>

        {/* Further details */}
        <div className='gap-2 flex flex-col mt-7'>
          {/* Route */}
          <div className='flex pl-[1.50rem] pr-[1.25rem] justify-between text-sm'>
            <div>
              <p className='text-gray-500 font-medium'>Route</p>
            </div>
            <div className='flex'>
              {/* Image */}
              <div className="flex justify-center items-center">
                <img 
                  src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                  alt="" 
                  className="w-4 h-4 z-30" 
                />
                <img 
                  src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                  alt="" 
                  className="w-4 h-4 -ml-2 z-20" 
                />
                <img 
                  src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                  alt="" 
                  className="w-4 h-4 -ml-2 z-10" 
                />
              </div>

              <div>
                <p className='text-gray-500 font-medium'>3 sources</p>
              </div>
            </div>
          </div>

          {/* Slippage */}
          <div className='flex pl-[1.50rem] pr-[1.25rem] justify-between text-sm'>
            <div>
              <p className='text-gray-500 font-medium'>Max. slippage</p>
            </div>
            <div>
              <p className='text-gray-500 font-medium'>0.5%</p>
            </div>
          </div>

          {/* Rate */}
          <div className='flex pl-[1.50rem] pr-[1.25rem] justify-between text-sm'>
            <div>
              <p className='text-gray-500 font-medium'>Rate</p>
            </div>
            <div className='flex gap-2'>
              <div className='bg-gray-200 p-1 rounded-full'>
                <LuArrowRightLeft className='' />
              </div>
              <div>
                <p className='text-gray-500 font-medium'>1 USDC = 0.00029 ETH</p>
              </div>
            </div>
          </div>
        </div>
          {/* Place Order Button */}
           {/* Buttons */}
        <div className="pl-[2.50rem] pr-[2.25rem] mt-8">
          {!isPlacingOrder ? (
            <button
              onClick={handlePlaceOrder}
              className="bg-[#17171c] sm:mt-2 sm:text-[16px] font-[500] border rounded-[1.625rem] shadow-[0_1px_2px_rgba(0,0,0,0.2)] w-full flex items-center justify-center h-12 text-[15px] text-white"
            >
              Place Order
            </button>
          ) : (
            <button
              onClick={handleConfirmWallet}
              className="bg-[#17171c] sm:mt-2 sm:text-[16px] font-[500] border rounded-[1.625rem] shadow-[0_1px_2px_rgba(0,0,0,0.2)] w-full flex items-center justify-center h-12 text-[15px] text-white"
            >
              Confirm in Your Wallet
            </button>
          )}
        </div>
        </div>
      )}

      {/* ================== Timeout Section ======================= */}
      {isTimeout && (
        <div className="bg-white h-[350px] border rounded-[1.625rem] w-full sm:h-[500px] sm:w-[500px]">
          <div className="relative py-1 sm:py-3">
            <FaArrowLeftLong className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-activeHead" />
            <p className="text-center text-red-600 font-semibold">
            Price Update
            </p>
          </div>

          {/* Token details */}
          <div className="relative flex pl-[1.25rem] py-1 pr-[1.25rem] gap-2 justify-between">
            <div className="absolute top-[3.7rem] left-1/2 -translate-x-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center flex">
                <MdKeyboardArrowRight className="w-7 h-7" />
              </div>
            </div>

            {/* Sell div */}
            <div className="bg-gray-100 rounded-3xl w-1/2 h-[150px] flex flex-col items-center justify-center">
              <div>
                <img src={sellToken?.logo} alt="" className="h-12 w-12 rounded-full" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-activeHead">1.00e-7 ETH</p>
                <p className="text-inactiveHead">s0.01</p>
              </div>
            </div>

            {/* Buy div */}
            <div className="bg-gray-100 rounded-3xl w-1/2 h-[150px] flex flex-col items-center justify-center">
              <div>
                <img src={buyToken?.logo} alt="" className="h-12 w-12 rounded-full" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-activeHead">1.00e-7 ETH</p>
                <p className="text-inactiveHead">s0.01</p>
              </div>
            </div>
          </div>

          <div>
          {/* Network cost */}
          <div className="flex justify-between pl-[1.25rem] pt-4 pr-[1.25rem] text-sm">
            <div className="flex text-center justify-center items-center gap-2">
              <GoDotFill className="text-gray-500 w-3 h-3" />
              <p className="text-gray-500 font-medium">Network cost</p>
            </div>
            <div className="flex text-gray-800">
              <p>0.0000000 </p>
              <p>ETH</p>
              <p className="text-gray-500">(0.132)</p>
            </div>
          </div>

          {/* Dotted flow */}
          <div className="flex justify-start pl-[1.50rem] pr-[1.25rem] -mt-1">
            <div className="border-l-2 border-dotted border-gray-300 h-4"></div>
          </div>

          {/* Received */}
          <div className="flex justify-between pr-[1.25rem] -mt-2 text-sm">
            <div className="flex text-center justify-center items-center">
              <PiDotDuotone className="text-black w-12 h-12" />
              <p className="text-gray-500 font-medium -ml-2">You receive (0% fee)</p>
            </div>
            <div className="flex text-gray-800 items-center">
              <p>0.0000000 </p>
              <p>ETH</p>
            </div>
          </div>
        </div>

        {/* Further details */}
        <div className='gap-2 flex flex-col mt-7'>
          {/* Route */}
          <div className='flex pl-[1.50rem] pr-[1.25rem] justify-between text-sm'>
            <div>
              <p className='text-gray-500 font-medium'>Route</p>
            </div>
            <div className='flex'>
              {/* Image */}
              <div className="flex justify-center items-center">
                <img 
                  src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                  alt="" 
                  className="w-4 h-4 z-30" 
                />
                <img 
                  src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                  alt="" 
                  className="w-4 h-4 -ml-2 z-20" 
                />
                <img 
                  src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp" 
                  alt="" 
                  className="w-4 h-4 -ml-2 z-10" 
                />
              </div>

              <div>
                <p className='text-gray-500 font-medium'>3 sources</p>
              </div>
            </div>
          </div>

          {/* Slippage */}
          <div className='flex pl-[1.50rem] pr-[1.25rem] justify-between text-sm'>
            <div>
              <p className='text-gray-500 font-medium'>Max. slippage</p>
            </div>
            <div>
              <p className='text-gray-500 font-medium'>0.5%</p>
            </div>
          </div>

          {/* Rate */}
          <div className='flex pl-[1.50rem] pr-[1.25rem] justify-between text-sm'>
            <div>
              <p className='text-gray-500 font-medium'>Rate</p>
            </div>
            <div className='flex gap-2'>
              <div className='bg-gray-200 p-1 rounded-full'>
                <LuArrowRightLeft className='' />
              </div>
              <div>
                <p className='text-gray-500 font-medium'>1 USDC = 0.00029 ETH</p>
              </div>
            </div>
          </div>
        </div>

          {/* Place Order Button */}
          <div className="pl-[2.50rem] pr-[2.25rem] mt-8">
            <button
              onClick={handleRefresh}
              className="bg-[#17171c] sm:mt-2 sm:text-[16px] font-[500] border rounded-[1.625rem] shadow-[0_1px_2px_rgba(0,0,0,0.2)] w-full flex items-center justify-center h-12 text-[15px] text-white"
            >
              Refresh Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;

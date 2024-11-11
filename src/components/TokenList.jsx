import React from 'react';

const TokenList = () => {
  return (
    <div className='token-list overflow-y-auto'>
      <div className='pl-[1.25rem] pr-[0.75rem]'>
        <div>
          <p className='sm:text-sm text-xs text-inactiveHead font-semibold mt-4 sm:-mt-1'>Most Popular</p>
        </div>
        <div className='flex mt-2 sm:gap-3 gap-3 flex-wrap '>
          
          {[...Array(6)].map((_, i) => (

             <div className='flex bg-[#f1f2f4] text-black text-[11px] font-[500] sm:py-[.35rem] rounded-[1.625rem]  sm:px-[.45rem] py-[3px] px-[5px]'>
              <div>
              <img
              key={i}
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
              alt="Token"
              className="sm:w-[18px] sm:h-[18px] w-4 h-4 rounded-full"
            />
              </div>
            <div><span className='text-black sm:text-xs text-xs'>ETH</span></div>
            
            </div>
          ))}
        </div>
      </div>

      <div className='sm:mt-1 pt-3'>
        <div>
          <p className='sm:text-sm text-xs text-inactiveHead font-semibold pl-[1.25rem] pr-[0.75rem]'>Trending</p>
        </div>

        {/* Container with fixed height and scroll overflow */}
        <div className=' h-64  pl-[1.25rem] pr-[0.75rem]'>
          {[...Array(10)].map((_, i) => (
            <div key={i} className='flex justify-between sm:mt-5 mt-4'>
              <div className='flex gap-2'>
                <img
                  src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
                  alt="Token"
                  className="w-[30px] h-[30px] p-[0.375rem] bg-gray-100 rounded-full"
                />
                <div className='flex flex-col ml-2'>
                  <span className='text-xs font-[500]'>MAGA</span>
                  <span className='text-xs text-gray-500 font-[500]'>TRUMP</span>
                </div>
              </div>
              <div>
                <span className='text-xs text-inactiveHead'>Ethereum</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenList;

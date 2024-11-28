import React, { useEffect, useState } from 'react';

const TransactionPending = () => {
  const [timeLeft, setTimeLeft] = useState(6);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <div className="flex justify-center items-center h-screen bg-black p-4">
      <div className="bg-white h-[350px] border rounded-[1.625rem] w-full sm:h-[500px] sm:w-[500px] flex flex-col justify-center items-center gap-14">
        {/* Timeline */}
        <div className="relative flex flex-col items-center">
          <div className="relative h-[170px] w-[170px]">
            <svg className="absolute inset-0" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="0.5"
                strokeDasharray="100"
                strokeDashoffset={100 - (100 / 6) * (6 - timeLeft)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex justify-center items-center text-3xl font-bold text-black flex-col">
              <p className="mb-1 text-inactiveHead text-xs font-medium">Time Left</p>
              {`00:0${timeLeft}`}
            </div>
          </div>
        </div>

        {/* pending */}
        <div>
          <p className='text-activeHead font-semibold text-lg'>Transaction pending....</p>
        </div>

        {/* button */}
        <div className='pl-[2.50rem]  pr-[2.25rem] mt-8 w-full'>
                <button className='bg-gray-100 sm:mt-2 sm:text-[16px] font-[500]  rounded-[1.625rem] w-full flex items-center justify-center h-12 text-[15px] text-activeHead '> See details</button>
            </div>
      </div>
    </div>
  );
};

export default TransactionPending;

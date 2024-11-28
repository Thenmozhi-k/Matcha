import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const CustomButton = ({ sellToken, sellInput }) => {
  const [isMatching, setIsMatching] = useState(false);
  const [isBalanceSufficient, setIsBalanceSufficient] = useState(true);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        useEffect(() => {
          if (connected && account && sellToken) {
            setIsMatching(account.address.toLowerCase() === sellToken.address?.toLowerCase());
          }
          if (connected && account?.balance && sellInput) {
            const accountBalance = parseFloat(account.balance.replace(/[^\d.-]/g, '')); // Convert balance to number
            setIsBalanceSufficient(accountBalance >= sellInput);
          }
        }, [connected, account, sellToken, sellInput]);

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            className="w-full"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={`bg-[#17171c] sm:mt-2 sm:text-[16px] font-[500] border rounded-[1.625rem] shadow-[0_1px_2px_rgba(0,0,0,0.2)] w-full flex items-center justify-center h-12 text-[15px] ${
                      !isBalanceSufficient ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    {!isBalanceSufficient
                      ? 'Insufficient Balance'
                      : 'Connect Wallet'}
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 w-full text-white flex items-center justify-center h-12"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex flex-col w-full gap-2">
                  <div className="flex w-full justify-center items-center">
                    {/* <button
                      onClick={openChainModal}
                      className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-lg"
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button> */}
                    <button
                      onClick={openAccountModal}
                      className="bg-gray-800 text-white py-2 px-4 rounded-lg"
                      type="button"
                    >
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                  {isMatching ? (
                    <p className="text-green-500 text-sm">
                      Token matches connected wallet.
                    </p>
                  ) : (
                    <p className="text-red-500 text-sm">
                      Token does not match connected wallet.
                    </p>
                  )}
                  {!isBalanceSufficient && (
                    <p className="text-red-500 text-sm">
                      Insufficient balance for transaction.
                    </p>
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
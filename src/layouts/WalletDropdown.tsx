import {Dispatch, SetStateAction} from 'react';
import {useResetRecoilState} from 'recoil';
import {useActiveAccount} from 'thirdweb/react';

import useThirdWeb from '../hooks/useThirdWeb';
import {formState} from '../atoms/form';

interface WalletDropdownPropsType {
  type: 'pc' | 'mobile';
  isShowDropdown: boolean;
  setIsShowDropdown: Dispatch<SetStateAction<boolean>>;
}

const walletIcons: Record<string, string> = {
  'io.metamask': '/icons/metamask.png',
  'com.coinbase.wallet': '/icons/coinbase.png',
  'com.ledger': '/icons/ledger.png',
};

const WalletDropdown = ({
  type,
  isShowDropdown,
  setIsShowDropdown,
}: WalletDropdownPropsType) => {
  const {wallet, connectWallet, disconnectWallet} = useThirdWeb();
  const activeAccount = useActiveAccount();
  const resetFormState = useResetRecoilState(formState);

  const handleDisconnect = () => {
    disconnectWallet();
    resetFormState();
    setIsShowDropdown(false);
  };

  return (
    <div
      className={`relative z-40 ${type === 'pc' ? 'hidden lg:flex' : 'flex lg:hidden'}`}>
      {activeAccount?.address && wallet ? (
        <button
          onClick={() => setIsShowDropdown((prev) => !prev)}
          className="flex h-10 items-center gap-1 rounded-[38px] border border-[#FFFFFF14] bg-[#000000] px-5 py-[7px] text-[#E5E5E5]">
          <img
            src={walletIcons[wallet.id] ?? '/icons/metamask.png'}
            alt="wallet image"
            width={24}
            height={24}
          />
          <span className="text-sm leading-[21px] text-[#918E99]">
            {activeAccount.address.slice(0, 4)}...
            {activeAccount.address.slice(-4)}
          </span>
        </button>
      ) : (
        <button className="hover_button" onClick={connectWallet}>
          Wallet Connect
        </button>
      )}

      {isShowDropdown && (
        <button
          onClick={handleDisconnect}
          className="absolute right-0 top-12 w-[280px] rounded-xl border border-[#1B1D21] bg-[#0C0D0E80] p-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button">
          <div className="flex items-center gap-2 px-4 py-2.5">
            <img
              src="/signout.svg"
              alt="sign out icon"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium leading-[16.8px] text-[#F26464]">
              Disconnect
            </span>
          </div>
        </button>
      )}
    </div>
  );
};

export default WalletDropdown;

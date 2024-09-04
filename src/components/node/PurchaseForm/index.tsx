import {useActiveAccount} from 'thirdweb/react';
import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import * as Dialog from '@radix-ui/react-dialog';

import {TierData} from '../../../constants/tiers';
import CardWrapper from '../../CardWrapper';
import TermsModal from '../../modal/TermsModal';
import {tierState} from '../../../atoms/tier';
import useClaimNFT from '../../../hooks/useClaimNFT';
import {formState} from '../../../atoms/form';
import SaleInfoDetail from './SaleInfoDetail';
import SaleAmount from './SaleAmount';
import PaybackCode from './PaybackCode';
import {useSalePeriod} from '../../../contexts/SalePeriodProvider';
import {useCheckUserByCode, useCheckWhitelist} from '../../../apis';

const PurchaseForm = () => {
  const address = useActiveAccount()?.address;

  const {period} = useSalePeriod();
  const {claimNft, isLoading} = useClaimNFT();

  const tier = useRecoilValue(tierState);
  const form = useRecoilValue(formState);
  const {isLoading: isCheckingCode} = useCheckUserByCode({code: form.code});
  const {data: exist} = useCheckWhitelist({address});

  const [agree, setAgree] = useState({
    terms: false,
    rewards: false,
  });

  const onConfirm = async () => {
    await claimNft(TierData[tier].tier - 1, form.amount);
  };

  return (
    <>
      {/* tier card */}
      <SaleInfoDetail />

      {/* count card */}
      <SaleAmount />
      {/* Payback Code card */}
      <PaybackCode />
      {/* Total card */}
      <CardWrapper className="mb-3 flex h-[154px] flex-col justify-between lg:h-[98px] lg:flex-row lg:items-center">
        <div>
          <p className="text-[20px] font-medium leading-[24px] -tracking-[0.3px]">
            Total
          </p>
          <p className="text-sm font-medium leading-[19.6px] text-[#8E9199]">
            per Node {TierData[tier].price}ETH
          </p>
        </div>

        <p className="text-end text-[28px] font-medium leading-[33.6px] text-[#FFFFFF]">
          {(form.amount * parseFloat(TierData[tier].price)).toFixed(4)} ETH
        </p>
      </CardWrapper>
      {/* Agree card */}
      <div className="mb-3 flex flex-col gap-2 rounded-2xl bg-[#171717] p-6">
        <div className="flex items-center">
          <button
            onClick={() =>
              setAgree((prev) => {
                return {...prev, terms: !prev.terms};
              })
            }>
            {agree.terms ? (
              <img
                src="/agree_check.svg"
                alt="agree check icon"
                width={14}
                height={14}
              />
            ) : (
              <img
                src="/agree_uncheck.svg"
                alt="agree uncheck icon"
                width={14}
                height={14}
              />
            )}
          </button>
          <span className="ms-2 text-sm leading-[16.8px] text-[#8E9199]">
            Agree to the{' '}
            <Dialog.Trigger asChild>
              <span className="cursor-pointer underline">terms</span>
            </Dialog.Trigger>{' '}
            of the GPGPU Node
          </span>
        </div>

        <div className="flex items-start">
          <button
            onClick={() =>
              setAgree((prev) => {
                return {...prev, rewards: !prev.rewards};
              })
            }>
            {agree.rewards ? (
              <img
                src="/agree_check.svg"
                alt="agree check icon"
                width={14}
                height={14}
              />
            ) : (
              <img
                src="/agree_uncheck.svg"
                alt="agree uncheck icon"
                width={14}
                height={14}
              />
            )}
          </button>
          <span className="ms-2 flex-1 text-sm leading-[16.8px] text-[#8E9199]">
            I understand that I can receive rewards through KYC
          </span>
        </div>
      </div>
      {/* Confirm Button */}
      <button
        onClick={onConfirm}
        disabled={
          form.amount === 0 ||
          !(agree.terms && agree.rewards) ||
          period === 'pre' ||
          isLoading ||
          isCheckingCode ||
          (period === 'whitelist' && !exist)
        }
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#3676F8] p-2.5 font-medium leading-[24px] text-[#FFFFFF] disabled:bg-[#222426] disabled:text-[#44474D]">
        {isLoading ? (
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          'Confirm'
        )}
      </button>
      <TermsModal />
    </>
  );
};

export default PurchaseForm;

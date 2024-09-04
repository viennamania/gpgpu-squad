import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {TierData} from '../../../constants/tiers';
import {useWsPrice} from '../../../contexts/WsProvider';
import {tierState} from '../../../atoms/tier';
import CardWrapper from '../../CardWrapper';
import {useClaimedAmount} from '../../../apis';

const SaleInfoDetail = () => {
  const {price} = useWsPrice();
  const tier = useRecoilValue(tierState);
  const {data: claimedAmount} = useClaimedAmount();
  const [percentage, setPercentage] = useState('0%');

  useEffect(() => {
    if (!claimedAmount) return;
    const width = Math.floor(
      (Number(claimedAmount[tier + 1]) / TierData[tier].amount) * 100,
    );
    setPercentage(`${width}%`);
  }, [tier, claimedAmount]);

  return (
    <CardWrapper className="mb-3 lg:flex lg:justify-between lg:gap-3">
      <div className="flex gap-3">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#4C4C4C]">
          <img src="/logo.svg" alt="logo icon" width={16.91} height={16} />
        </div>

        <div>
          <p
            className={`text-[20px] font-medium leading-[24px] -tracking-[0.3px] ${TierData[tier].walletPerCap ? '' : 'pb-[19.6px]'}`}>
            GPGPU NODE - Tier {TierData[tier].tier}
          </p>
          {TierData[tier].walletPerCap && (
            <p className="text-sm font-medium leading-[19.6px] text-[#8E9199]">
              You can buy {TierData[tier].walletPerCap} per wallet
            </p>
          )}

          <p className="text-linear mt-3 text-[24px] font-semibold leading-[33.6px]">
            {TierData[tier].price}ETH
          </p>
          <p className="text-sm font-medium leading-[16.8px] text-[#8E9199]">
            {price
              ? `≈ ${(price * parseFloat(TierData[tier].price)).toFixed(2)}USD`
              : '= n/a'}
          </p>
        </div>
      </div>
      <div
        style={{
          background:
            'linear-gradient(79.77deg, #070707 2.23%, #171717 154.25%)',
        }}
        className="mt-4 rounded-2xl border border-[#222222] p-5 lg:mt-0 lg:w-[300px]">
        <p className="text-sm leading-[16.71px] text-[#FCFCFF]">
          Remaining Node
        </p>
        <div className="relative my-2">
          <div className="h-2.5 w-full rounded-[5px] bg-[#272B33]"></div>
          <div
            style={{
              width: percentage,
            }}
            className={`absolute left-0 top-0 h-2.5 rounded-[5px] bg-[#3676F8]`}></div>
        </div>
        <div className="flex items-center justify-between text-sm leading-[16.71px] text-[#6B6E75]">
          <p>
            {claimedAmount
              ? `${claimedAmount[tier + 1]}/${TierData[tier].amount}`
              : '/'}
          </p>
          <p>{percentage}</p>
        </div>
      </div>
    </CardWrapper>
  );
};

export default SaleInfoDetail;

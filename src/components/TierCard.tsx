import {useEffect, useState} from 'react';

import {TierData} from '../constants/tiers';
import useContractGetOwnedNfts from '../hooks/useContractGetOwnedNfts';
import {useClaimedAmount} from '../apis';

interface TierCardPropsType {
  tier: number;
  eth: string;
  selected?: boolean;
}

const TierCard = ({tier, eth, selected = false}: TierCardPropsType) => {
  const [percentage, setPercentage] = useState('0%');
  const {nfts} = useContractGetOwnedNfts();
  const {data: claimedAmount} = useClaimedAmount();

  useEffect(() => {
    if (!claimedAmount) return;
    const width = Math.floor(
      (Number(claimedAmount[String(tier)]) / TierData[tier - 1].amount) * 100,
    );
    setPercentage(`${width}%`);
  }, [tier, claimedAmount]);

  return (
    <div className="relative">
      <div
        className={`bg-[${selected ? '#0A0F1A' : '#010101'}] w-[180px] rounded-2xl border border-[${selected ? '#3676F8' : '#40444B'}] px-5 py-4`}>
        <div className="mb-2 flex h-5 items-center justify-between">
          <span className="font-medium leading-[19.2px] -tracking-[0.3px]">
            Tier {tier}
          </span>
          <span className="text-sm leading-[19.6px] text-[#8E9199]">
            {eth}ETH
          </span>
        </div>
        <div className="relative">
          <div className="h-1 w-[140px] rounded-[5px] bg-[#272B33]"></div>
          {selected ? (
            <div
              style={{width: percentage}}
              className={`absolute left-0 top-0 h-1 rounded-[5px] bg-[#3676F8]`}></div>
          ) : (
            <div
              style={{width: percentage}}
              className={`absolute left-0 top-0 h-1 rounded-[5px] bg-[#62656D]`}></div>
          )}
        </div>
      </div>
      {nfts &&
        nfts.some((n) => Number(n.id) + 1 === tier) &&
        (selected ? (
          <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md bg-[#3676F8] px-[6px] py-[2px] text-[11px] font-medium leading-[14.3px]">
            <p>Participated</p>
          </div>
        ) : (
          <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md bg-[#62656D] px-[6px] py-[2px] text-[11px] font-medium leading-[14.3px]">
            <p>Participated</p>
          </div>
        ))}
    </div>
  );
};

export default TierCard;

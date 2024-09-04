import {useEffect, useRef, useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import CardWrapper from '../CardWrapper';
import MyNodeFirstTable from '../table/MyNodeFirstTable';
import MyNodeSecondTable from '../table/MyNodeSecondTable';
import TierCard from '../TierCard';
import CaretRight from '../CaretRight';
import CaretLeft from '../CaretLeft';
import PlusButton from '../PlusButton';
import MinusButton from '../MinusButton';
import TermsModal from '../modal/TermsModal';
import useToast from '../../hooks/useToast';
import useThirdWeb from '../../hooks/useThirdWeb';
import {TierData} from '../../constants/tiers';

const Public = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {addToast} = useToast();
  const {wallet, connectWallet} = useThirdWeb();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [countNumber, setCountNumber] = useState(0);
  const [agree, setAgree] = useState({
    terms: false,
    rewards: false,
  });
  const [isApply, setIsApply] = useState(false);

  const tierCards = [
    {tier: 1, eth: 0.1, barWidth: 136.77, participated: false},
    {
      tier: 2,
      eth: 0.108,
      barWidth: 61.81,
      participated: false,
    },
    {
      tier: 3,
      eth: 0.1166,
      barWidth: 20.18,
      participated: false,
    },
    {
      tier: 4,
      eth: 0.1166,
      barWidth: 20.18,
      participated: false,
    },
    {
      tier: 5,
      eth: 0.1166,
      barWidth: 20.18,
      participated: false,
    },
  ];
  const [selectedTierCard, setSelectedTierCard] = useState(0);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => {
      checkScrollPosition();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTier = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      direction === 'left'
        ? scrollRef.current.scrollBy({left: -150, behavior: 'smooth'})
        : scrollRef.current.scrollBy({left: 150, behavior: 'smooth'});
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <Dialog.Root>
      <div>
        <div className="mt-11 flex flex-col items-center gap-3">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full border border-[#4C4C4C]"
            // onClick={changePeriod}
          >
            <img src="/logo.svg" alt="logo icon" width={23.26} height={22} />
          </div>
          <p className="text-linear text-[24px] font-medium leading-[32px]">
            GPGPU NODE Sale
          </p>
        </div>

        <div className={`px-4 lg:px-6`}>
          <div className="relative mx-auto mt-9 max-w-[640px] lg:mt-7">
            {!wallet && (
              <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border border-[#323233]">
                <img src="/lock.svg" width={32} height={32} alt="lock icon" />
                <span className="leading-[22.4px] text-[#8E9199]">
                  Connect your wallet to participate.
                </span>
                <button
                  onClick={connectWallet}
                  className="h-10 rounded-[100px] bg-[#FFFFFF] px-6 py-2.5 leading-[20.8px] text-[#04080F]">
                  Connect Wallet
                </button>
              </div>
            )}

            <div className={wallet ? '' : 'blur-md'}>
              <div className="flex flex-col">
                {/* referral link card */}
                <CardWrapper className="mb-10">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <div>
                      <p className="text-[20px] font-medium leading-[24px] -tracking-[0.3px]">
                        Copy Referral Link
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('QQA5UT');
                          addToast('success', 'Payback Code copied');
                        }}
                        className="mb-1.5 mt-2 flex items-center">
                        <p className="text-[24px] font-medium leading-[33.6px] text-[#3676F8]">
                          QQA5UT
                        </p>
                        <img
                          src="/copy.svg"
                          width={28}
                          height={28}
                          alt="copy icon"
                        />
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('COPY REFERRAL LINK');
                          addToast('success', 'Payback Code copied');
                        }}
                        className="flex items-center gap-1 rounded-[100px] border border-[#737780] px-2.5 py-1.5">
                        <p className="text-xs font-medium leading-[15.6px]">
                          COPY REFERRAL LINK
                        </p>
                        <img
                          src="/link.svg"
                          width={12}
                          height={12}
                          alt="link icon"
                        />
                      </button>
                    </div>
                    <div className="rounded-lg bg-[#141414] px-4 py-[18px] text-xs leading-[19.2px]">
                      <p>
                        10%{' '}
                        <span className="text-[#8E9199]">
                          Discount on nodes
                        </span>
                      </p>
                      <p>
                        5% <span className="text-[#8E9199]">Cashback</span>
                      </p>
                      <p className="text-[#8E9199]">
                        Qualification for representative staker.
                      </p>
                    </div>
                  </div>
                </CardWrapper>

                {/*  tier card list */}
                <div className="relative mb-3">
                  <div
                    ref={scrollRef}
                    className="no-scrollbar flex max-w-[640px] gap-2 overflow-hidden">
                    {TierData.map((tierCard, index) => (
                      <button
                        key={tierCard.tier}
                        onClick={() => {
                          setSelectedTierCard(index);
                        }}>
                        <TierCard
                          tier={tierCard.tier}
                          eth={tierCard.price}
                          //barWidth={tierCard.barWidth}
                          selected={index === selectedTierCard}
                          //participated={tierCard.participated}
                        />
                      </button>
                    ))}
                  </div>
                  {showLeftArrow && (
                    <button
                      onClick={() => scrollTier('left')}
                      className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 bg-[#252526]">
                      <CaretLeft width="24" height="24" fillColor="#8D8E90" />
                    </button>
                  )}
                  {showRightArrow && (
                    <button
                      onClick={() => scrollTier('right')}
                      className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 bg-[#252526]">
                      <CaretRight width="24" height="24" fillColor="#8D8E90" />
                    </button>
                  )}
                </div>

                {/* tier card */}
                <CardWrapper className="mb-3 lg:flex lg:justify-between lg:gap-3">
                  <div className="flex gap-3">
                    <div
                      className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#4C4C4C]"
                      //onClick={changePeriod}
                    >
                      <img
                        src="/logo.svg"
                        alt="logo icon"
                        width={16.91}
                        height={16}
                      />
                    </div>

                    <div>
                      <p className="text-[20px] font-medium leading-[24px] -tracking-[0.3px]">
                        GPGPU NODE - Tier {tierCards[selectedTierCard].tier}
                      </p>
                      <p className="text-sm font-medium leading-[19.6px] text-[#8E9199]">
                        You can buy 5 per wallet
                      </p>

                      <p className="text-linear mt-3 text-[24px] font-semibold leading-[33.6px]">
                        {tierCards[selectedTierCard].eth}ETH
                      </p>
                      <p className="text-sm font-medium leading-[16.8px] text-[#8E9199]">
                        ≈ 302.77USD
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
                        style={{width: tierCards[selectedTierCard].barWidth}}
                        className={`absolute left-0 top-0 h-2.5 rounded-[5px] bg-[#3676F8]`}></div>
                    </div>
                    <div className="flex items-center justify-between text-sm leading-[16.71px] text-[#6B6E75]">
                      <p>4892/5000</p>
                      <p>97%</p>
                    </div>
                  </div>
                </CardWrapper>

                {/* count card */}
                <CardWrapper className="mb-3">
                  <div className="flex items-center justify-between">
                    <MinusButton
                      onClick={() =>
                        countNumber > 0 && setCountNumber((prev) => (prev -= 1))
                      }
                      width="40"
                      height=" 40"
                      color={countNumber === 0 ? '#4A4B4D' : '#FFFFFF'}
                    />
                    <p
                      className={`text-[32px] font-medium leading-[38.4px] ${countNumber > 0 ? 'text-[#FFFFFF]' : 'text-[#6B6E75]'} `}>
                      {countNumber}
                    </p>
                    <div className="flex items-center gap-2">
                      <PlusButton
                        onClick={() =>
                          countNumber < 5 &&
                          setCountNumber((prev) => (prev += 1))
                        }
                        width="40"
                        height="40"
                        color={countNumber === 5 ? '#4A4B4D' : '#FFFFFF'}
                      />
                      <button
                        onClick={() => setCountNumber(5)}
                        className="h-[40px] rounded-[100px] border border-[#4A4B4D] px-6 py-[9.5px] leading-[20.8px] text-[#C7C3D2]">
                        MAX
                      </button>
                    </div>
                  </div>
                </CardWrapper>

                {/* Payback Code card */}
                <CardWrapper className="mb-3 flex h-[154px] flex-col justify-between lg:h-[92px] lg:flex-row lg:items-center">
                  <div>
                    <p className="text-[20px] font-medium leading-[24px] -tracking-[0.3px]">
                      Payback Code
                    </p>
                    <p className="text-sm font-medium leading-[19.6px] text-[#8E9199]">
                      10% Payback applied
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col items-start lg:items-end">
                      <input
                        disabled={isApply}
                        className="w-full bg-transparent text-[24px] font-medium leading-[28.8px] placeholder-[#5B5E66] outline-none lg:text-right"
                        placeholder="Enter code"></input>
                      {isApply && (
                        <span className="text-sm leading-[16.8px] text-[#03C397]">
                          correct code
                        </span>
                        // <span className="text-sm leading-[16.8px] text-[#F26464]">
                        //   Invalid promo code.
                        // </span>
                      )}
                    </div>
                    <button
                      disabled={isApply}
                      onClick={() => setIsApply(true)}
                      className={`h-[40px] rounded-[100px] border border-[#4A4B4D] px-6 py-[9.5px] leading-[20.8px] ${isApply ? 'text-[#5F6166]' : 'text-[#FFFFFF]'} `}>
                      Apply
                    </button>
                  </div>
                </CardWrapper>

                {/* Total card */}
                <CardWrapper className="mb-3 flex h-[154px] flex-col justify-between lg:h-[98px] lg:flex-row lg:items-center">
                  <div>
                    <p className="text-[20px] font-medium leading-[24px] -tracking-[0.3px]">
                      Total
                    </p>
                    <p className="text-sm font-medium leading-[19.6px] text-[#8E9199]">
                      per Node 0.1ETH
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-right text-sm leading-[16px] text-[#8E9199]">
                      10% <span className="line-through">0.5 ETH</span>
                    </p>
                    <p className="text-end text-[28px] font-medium leading-[33.6px] text-[#FFFFFF]">
                      0.45 ETH
                    </p>
                  </div>
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
                  disabled={!(agree.terms && agree.rewards)}
                  className={`h-14 w-full rounded-2xl p-2.5 font-medium leading-[24px] ${agree.rewards && agree.terms ? 'bg-[#3676F8] text-[#FFFFFF]' : 'bg-[#222426] text-[#44474D]'} `}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4">
          <div className="mx-auto mt-12 max-w-[640px] lg:mx-auto lg:mt-10 lg:flex-row">
            <CardWrapper className="px-0">
              <p className="text-linear px-4 pb-5 text-[20px] font-medium leading-[28px]">
                My Node
              </p>

              <MyNodeFirstTable />
            </CardWrapper>
          </div>
        </div>

        <div className="mb-[42px] px-4">
          <div className="mx-auto mt-12 max-w-[640px] lg:mx-auto lg:mt-10 lg:flex-row">
            <CardWrapper className="overflow-hidden px-0 py-0">
              <MyNodeSecondTable />
            </CardWrapper>
          </div>
        </div>
      </div>
      <TermsModal />
    </Dialog.Root>
  );
};

export default Public;

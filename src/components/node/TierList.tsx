import {useCallback, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {TierData} from '../../constants/tiers';
import TierCard from '../TierCard';
import CaretRight from '../CaretRight';
import CaretLeft from '../CaretLeft';
import {tierState} from '../../atoms/tier';
import useTierList from '../../hooks/useTierList';
import {useClaimedAmount} from '../../apis';
import {formState} from '../../atoms/form';

const TierList = () => {
  const {tiersContainerRef, tiersListRef, scrollBackwardRef, scrollForwardRef} =
    useTierList();
  const {data: claimedAmount} = useClaimedAmount();

  const [tier, setTier] = useRecoilState(tierState);
  const setForm = useSetRecoilState(formState);

  const handleArrowButtonOnClick = (
    evt: React.MouseEvent<HTMLButtonElement>,
  ) => {
    evt.preventDefault();
    if (
      !tiersContainerRef.current ||
      !tiersListRef.current ||
      !scrollForwardRef.current ||
      !scrollBackwardRef.current
    )
      return;

    const left = new WebKitCSSMatrix(tiersListRef.current.style.transform).m41;
    const chipsContainerWidth = parseInt(
      tiersContainerRef.current.style.width,
      10,
    );
    const chipsListWidth = tiersListRef.current.offsetWidth;

    const {id} = evt.target as HTMLButtonElement;

    if (id === 'forward') {
      let newDistance = 350 - left;
      const shouldEnd = newDistance >= chipsListWidth - chipsContainerWidth;
      if (shouldEnd) {
        scrollForwardRef.current.style.display = 'none';
        newDistance = chipsListWidth - chipsContainerWidth;
      }

      tiersListRef.current.style.transform = `translateX(${
        newDistance * -1
      }px)`;
      scrollBackwardRef.current.style.display = 'inline-flex';
    } else if (id === 'backward') {
      let newDistance = left + 350;
      const shouldEnd = newDistance >= 0;
      if (shouldEnd) {
        scrollBackwardRef.current.style.display = 'none';
        newDistance = 0;
      }
      tiersListRef.current.style.transform = `translateX(${newDistance}px)`;
      scrollForwardRef.current.style.display = 'inline-flex';
    }
  };

  const findFirstTier = useCallback(() => {
    for (const tier of TierData) {
      const tierKey = tier.tier;
      if (Number(claimedAmount[tierKey]) / tier.amount < 1) {
        return tier.tier;
      }
    }
    return 1;
  }, [claimedAmount]);

  useEffect(() => {
    if (!tiersContainerRef.current || !tiersListRef.current || !claimedAmount)
      return;
    const firstSale = findFirstTier() - 1;

    const cardWidth = tiersListRef.current.children[0].clientWidth;

    const tiersListWidth = tiersListRef.current.offsetWidth;
    const initialDistance = cardWidth * firstSale;
    const boundingWidth =
      tiersContainerRef.current.getBoundingClientRect().width;
    const isBoundingRectExceeded =
      tiersListWidth - initialDistance < boundingWidth;

    if (isBoundingRectExceeded) {
      const toEnd = tiersListWidth - boundingWidth;
      tiersListRef.current.style.transform = `translateX(${-toEnd}px)`;
    } else {
      tiersListRef.current.style.transform = `translateX(${-initialDistance}px)`;
    }

    if (scrollBackwardRef.current)
      scrollBackwardRef.current.style.display =
        firstSale === 0 ? 'none' : 'inline-flex';
    if (scrollForwardRef.current) {
      scrollForwardRef.current.style.display = isBoundingRectExceeded
        ? 'none'
        : 'inline-flex';
    }
    setTier(firstSale);
  }, [
    claimedAmount,
    tiersContainerRef,
    tiersListRef,
    scrollBackwardRef,
    scrollForwardRef,
    setTier,
    findFirstTier,
  ]);

  return (
    <div ref={tiersContainerRef} className="relative mb-3 touch-pan-y">
      <div className="overflow-hidden whitespace-nowrap">
        <div ref={scrollBackwardRef} className="hidden">
          <button
            id="backward"
            aria-label="이전"
            className="absolute left-0 top-1/2 z-40 h-6 w-6 -translate-y-1/2 bg-[#252526]"
            onClick={handleArrowButtonOnClick}>
            <CaretLeft
              className="pointer-events-none h-6 w-6 flex-none"
              width="24"
              height="24"
              fillColor="#8D8E90"
            />
          </button>
        </div>
        <ul
          ref={tiersListRef}
          className="z-10 inline-block h-full gap-2 overflow-hidden whitespace-nowrap transition-all duration-75 will-change-transform">
          {TierData.map((tierCard, index) => (
            <li
              className={`inline-flex flex-row ${TierData.length === index + 1 ? '' : 'pr-2'}`}
              key={tierCard.tier}>
              <button
                key={tierCard.tier}
                onClick={() => {
                  setTier(index);
                  setForm((prev) => ({...prev, amount: 0}));
                }}>
                <TierCard
                  tier={tierCard.tier}
                  eth={tierCard.price}
                  selected={index === tier}
                />
              </button>
            </li>
          ))}
        </ul>
        <div
          ref={scrollForwardRef}
          className="absolute right-0 top-1/2 z-40 h-6 w-6 -translate-y-1/2 bg-[#252526]">
          <button
            id="forward"
            aria-label="다음"
            onClick={handleArrowButtonOnClick}>
            <CaretRight
              className="pointer-events-none h-6 w-6 flex-none"
              width="24"
              height="24"
              fillColor="#8D8E90"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TierList;

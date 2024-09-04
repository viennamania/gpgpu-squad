import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';

import {TierData} from '../../constants/tiers';
import TierCard from '../TierCard';
import CaretRight from '../CaretRight';
import CaretLeft from '../CaretLeft';
import {tierState} from '../../atoms/tier';

const TierSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useRecoilState(tierState);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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
    <div className="relative mb-3">
      <div
        ref={scrollRef}
        className="no-scrollbar flex max-w-[640px] gap-2 overflow-hidden">
        {TierData.map((tierCard, index) => (
          <button
            key={tierCard.tier}
            onClick={() => {
              setTier(index);
            }}>
            <TierCard
              tier={tierCard.tier}
              eth={tierCard.price}
              selected={index === tier}
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
  );
};

export default TierSlider;

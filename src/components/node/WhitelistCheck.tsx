import {useActiveAccount} from 'thirdweb/react';

import CardWrapper from '../CardWrapper';
import {
  useAddWhiteList,
  useCheckWhitelist,
  useRemoveWhiteList,
} from '../../apis';
import {useSalePeriod} from '../../contexts/SalePeriodProvider';

const WhitelistCheck = () => {
  const address = useActiveAccount()?.address;
  const {period} = useSalePeriod();

  const {
    data: exist,
    refetch: checkWhitelist,
    isFetching,
  } = useCheckWhitelist({address});

  const {mutateAsync: addWhitelist, isPending} = useAddWhiteList();
  const {mutateAsync: removeWhitelist} = useRemoveWhiteList();

  const addWhiteList = async () => {
    await addWhitelist({address});
    await checkWhitelist();
  };

  const removeWhiteList = async () => {
    await removeWhitelist({address});
    await checkWhitelist();
  };

  return (
    <div className="relative mb-10">
      <CardWrapper className="flex h-[166px] flex-col items-center gap-3">
        <p className="text-[20px] font-medium leading-[24px] tracking-[-0.3px]">
          Whitelist
        </p>
        <div className="flex items-center gap-1">
          <span className="leading-[22.4px] text-[#46484D]">
            {address
              ? address.slice(0, 15) + '...' + address.slice(-13)
              : '0xed6d74c3Ad2A2...Cb820C530da28'}
          </span>
          {exist && (
            <img src="/checked.svg" width={16} height={16} alt="checked icon" />
          )}
        </div>

        <button
          onClick={addWhiteList}
          disabled={
            exist ||
            isFetching ||
            isPending ||
            (period === 'whitelist' && !exist)
          }
          className={`rounded-full px-6 py-2.5 leading-[20.8px] ${
            exist === false &&
            !isPending &&
            !isFetching &&
            !(period === 'whitelist' && !exist)
              ? 'bg-white text-[#0A0A0A]'
              : 'border border-[#4A4B4D] bg-[#0A0A0A] text-[#5F6166]'
          }`}>
          Add
        </button>
        {/** 추후 삭제 */}
        <button
          onClick={removeWhiteList}
          disabled={!exist}
          className={`rounded-full px-6 py-2.5 leading-[20.8px] ${
            exist
              ? 'bg-white text-[#0A0A0A]'
              : 'border border-[#4A4B4D] bg-[#0A0A0A] text-[#5F6166]'
          }`}>
          Remove (테스트용)
        </button>
      </CardWrapper>
      {exist && (
        <img
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          src="/whitelist_background.png"
          alt="whitelist background image"
        />
      )}
    </div>
  );
};

export default WhitelistCheck;

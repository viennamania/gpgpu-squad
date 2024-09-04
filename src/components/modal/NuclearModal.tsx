import * as Dialog from '@radix-ui/react-dialog';
import MinusButton from '../MinusButton';
import PlusButton from '../PlusButton';
import React, {useState} from 'react';

const NuclearModal = () => {
  const [countNumber, setCountNumber] = useState(0);
  const maxNum = 15;

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 1 && Number(e.target.value) <= maxNum) {
      setCountNumber(Number(e.target.value));
    }
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="dialogOverlayAnimation fixed inset-0 z-50 bg-[#00000080] backdrop-blur-md" />
      <Dialog.Content className="dialogContentAnimation fixed left-1/2 top-1/2 z-50 flex w-[343px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-[#1B1D21] bg-[#0A0A0A] px-[18px] py-4 focus:outline-none">
        <div className="flex flex-col gap-4">
          <Dialog.Title className="text-[16px] font-medium leading-[25.6px] text-white">
            <Dialog.Description>Nuclear purchase</Dialog.Description>
          </Dialog.Title>

          <div className="h-[1px] w-full bg-[#1B1D21]"></div>

          <div className="flex items-center justify-between px-6 py-4">
            <MinusButton
              onClick={() =>
                countNumber > 1 && setCountNumber((prev) => (prev -= 1))
              }
              width="40"
              height=" 40"
              color={countNumber === 1 ? '#4A4B4D' : '#FFFFFF'}
            />
            <input
              value={countNumber}
              type="number"
              min={1}
              max={maxNum}
              onChange={(e) => handleChangeCount(e)}
              className={`w-full bg-transparent text-center text-[32px] font-medium leading-[38.4px] placeholder-[#5B5E66] outline-none ${countNumber > 0 ? 'text-[#FFFFFF]' : 'text-[#6B6E75]'} `}></input>
            <PlusButton
              onClick={() =>
                countNumber < maxNum && setCountNumber((prev) => (prev += 1))
              }
              width="40"
              height="40"
              color={countNumber === maxNum ? '#4A4B4D' : '#FFFFFF'}
            />
          </div>

          <div className="h-[1px] w-full bg-[#1B1D21]"></div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                possessive nuclear
              </span>
              <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                ⚡️ 5
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                Squad points
              </span>
              <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                293,824,120
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                Points to be used
              </span>
              <span className="text-[14px] font-normal leading-[22.4px] text-[#E5E5E5]">
                10,000
              </span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-[#1B1D21]"></div>

          <div className="flex items-center justify-between">
            <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
              Total Coat
            </span>
            <span className="text-[14px] font-normal leading-[22.4px] text-[#E5E5E5]">
              150,000
            </span>
          </div>

          <Dialog.Close asChild>
            <button className="h-12 w-full rounded-lg bg-white p-2.5 text-center text-[16px] font-medium leading-[24px] text-[#010101]">
              Buy
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default NuclearModal;

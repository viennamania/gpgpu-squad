import {useState} from 'react';

import CardWrapper from '../components/CardWrapper';
import Title from '../layouts/Title';
import PendingTable from '../components/table/PendingTable';
import Pagination from '../components/table/Pagination';
import useThirdWeb from '../hooks/useThirdWeb';

const GpPage = () => {
  const {wallet, connectWallet} = useThirdWeb();
  const [quantity, setQuantity] = useState('152,263.65');
  const [selectedDays, setSelectedDays] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <Title title="$GP" subtitle="Redeem your rewards" />

      <div className={`px-4 lg:px-6`}>
        <div className="relative mx-auto my-6 max-w-[1200px]">
          {!wallet && (
            <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border border-[#323233]">
              <img src="/lock.svg" width={32} height={32} alt="lock icon" />
              <span className="leading-[22.4px] text-[#8E9199]">
                Connect your wallet to check.
              </span>
              <button
                onClick={connectWallet}
                className="h-10 rounded-[100px] bg-[#FFFFFF] px-6 py-2.5 leading-[20.8px] text-[#04080F]">
                Connect Wallet
              </button>
            </div>
          )}

          <div className={wallet ? '' : 'blur-md'}>
            <div className="flex flex-col items-center gap-3 lg:flex-row">
              <CardWrapper>
                <span
                  className={`rounded-md border border-[#1A1A1A] bg-[#0A0A0A] px-2 py-1 text-[#969696]`}>
                  My Token
                </span>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-[32px] font-medium leading-[38.4px]">
                    10,563,356.26
                  </p>
                </div>
              </CardWrapper>

              <CardWrapper>
                <span
                  className={`rounded-md bg-[#15372E] px-2 py-1 text-[#50E3C2]`}>
                  Redeem possible
                </span>

                <p className="mt-4 text-[32px] font-medium leading-[38.4px]">
                  15,263.65
                </p>
              </CardWrapper>
            </div>

            <div className="mt-6 flex flex-col gap-3 lg:mt-8 lg:flex-row">
              <CardWrapper className="lg:w-[calc(66%+24px)]">
                <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
                  <span
                    className={`font-medium leading-[22.4px] text-[#737780]`}>
                    Quantity held
                  </span>

                  <div className="flex items-center justify-between gap-2">
                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      className="w-full bg-[#0A0A0A] text-left text-[24px] font-medium leading-[33.6px] text-white placeholder-[#6B6E75] outline-none lg:text-right"></input>
                    <button className="rounded-[100px] border border-[#4A4B4D] px-4 py-2 text-sm leading-[18.2px] text-[#C3C8D2]">
                      MAX
                    </button>
                  </div>
                </div>

                <div className="my-5 h-[1px] w-full bg-[#323233]"></div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div
                    onClick={() => setSelectedDays(15)}
                    className={`flex-1 cursor-pointer rounded-xl border p-5 ${selectedDays === 15 ? 'border-[#3676F8] bg-[#0A0F1A]' : 'border-[#40444B] bg-[#010101]'}`}>
                    <p className="font-medium leading-[19.2px] -tracking-[0.3px]">
                      15 days
                    </p>
                    <span className="text-sm leading-[19.6px] text-[#8E9199]">
                      28.5% of quantity
                    </span>
                  </div>
                  <div
                    onClick={() => setSelectedDays(30)}
                    className={`flex-1 cursor-pointer rounded-xl border p-5 ${selectedDays === 30 ? 'border-[#3676F8] bg-[#0A0F1A]' : 'border-[#40444B] bg-[#010101]'}`}>
                    <p className="font-medium leading-[19.2px] -tracking-[0.3px]">
                      30 days
                    </p>
                    <span className="text-sm leading-[19.6px] text-[#8E9199]">
                      62.5% of quantity
                    </span>
                  </div>
                  <div
                    onClick={() => setSelectedDays(90)}
                    className={`flex-1 cursor-pointer rounded-xl border p-5 ${selectedDays === 90 ? 'border-[#3676F8] bg-[#0A0F1A]' : 'border-[#40444B] bg-[#010101]'}`}>
                    <p className="font-medium leading-[19.2px] -tracking-[0.3px]">
                      90 days
                    </p>
                    <span className="text-sm leading-[19.6px] text-[#8E9199]">
                      100% of quantity
                    </span>
                  </div>
                </div>
              </CardWrapper>

              <CardWrapper className="lg:w-1/3">
                <span className={`font-medium leading-[22.4px] text-[#737780]`}>
                  Receive quantity
                </span>

                <p className="mt-4 text-[32px] font-medium leading-[38.4px]">
                  {quantity || '-'}
                </p>
                {quantity ? (
                  <button
                    type="button"
                    className={`mt-[50px] h-[56px] w-full rounded-xl bg-[${quantity ? '#FFFFFF' : '#222326'}] px-4 py-2 font-medium leading-[22.4px] text-[${quantity ? '#010101' : '#44474D'}]`}>
                    Redeem
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mt-[50px] h-[56px] w-full rounded-xl bg-[#222326] px-4 py-2 font-medium leading-[22.4px] text-[#44474D]">
                    Redeem
                  </button>
                )}
              </CardWrapper>
            </div>
            <div className="mt-6 lg:mt-8 lg:flex-row">
              <CardWrapper className="p-0">
                <p className="text-linear px-4 pb-5 text-[20px] font-medium leading-[28px]">
                  Pending
                </p>

                <PendingTable />
              </CardWrapper>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={32}
                className="mb-14 mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpPage;

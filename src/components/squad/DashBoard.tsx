import {useEffect, useState} from 'react';
import SquadChart from './Chart';
import SquadHistoryTable from '../table/SquadHistoryTable';
import SquadLeaderboardTable from '../table/SquadLeaderboardTable';
import PersonalLeaderboardTable from '../table/PersonalLeaderboardTable';
import useToast from '../../hooks/useToast';
import * as Dialog from '@radix-ui/react-dialog';
import NuclearModal from '../modal/NuclearModal';
import SquadAttackModal from '../modal/SquadAttackModal';
import {squadState} from '../../atoms/squad';
import {useRecoilValue} from 'recoil';
const items = [
  {
    type: 'Attacker',
    typeCount: 13,
    name: 'coinboys',
    target: 'Victim',
    targetCount: 4,
    targetName: 'airdopfinder',
    points: '-300,000,000 Point',
    timeAgo: '3m ago',
  },
  {
    type: 'Attacker2',
    typeCount: 13,
    name: 'coinboys2',
    target: 'Victim2',
    targetCount: 4,
    targetName: 'airdopfinder2',
    points: '-300,000,000 Point2',
    timeAgo: '3m ago',
  },
  {
    type: 'Attacker3',
    typeCount: 13,
    name: 'coinboys3',
    target: 'Victim3',
    targetCount: 4,
    targetName: 'airdopfinder3',
    points: '-300,000,000 Point3',
    timeAgo: '3m ago',
  },
];
const DashBoard = () => {
  const {addToast} = useToast();
  const squad = useRecoilValue(squadState);
  const [gpuGage, setGpuGage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === items.length) {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => {
          setIsTransitioning(true);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 1);
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  useEffect(() => {
    if (squad === 'member') {
      setGpuGage(5);
    } else {
      setGpuGage(43);
    }
  }, [squad]);

  return (
    <div className="w-full">
      {/* status bar */}
      <div className="hidden h-[49px] items-center overflow-hidden lg:flex">
        <div
          className={`flex h-full w-full flex-col px-2 ${isTransitioning ? 'transition-transform duration-700' : 'duration-0'}`}
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
          }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="hidden min-h-[49px] w-full items-center gap-4 lg:flex">
              {/* 슬라이드 내용 */}
              <div className="flex flex-1 items-center gap-2">
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  ⚡️New Nuclear
                </span>
                <span className="text-[12px] leading-[19.2px] text-[#999EA7]">
                  {item.timeAgo}
                </span>
              </div>

              <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

              <div className="flex flex-1 gap-1.5">
                <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                  {item.type}
                </span>
                <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                  {item.typeCount}
                </span>
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  {item.name}
                </span>
              </div>

              <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

              <div className="flex flex-1 gap-1.5">
                <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                  {item.target}
                </span>
                <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                  {item.targetCount}
                </span>
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  {item.targetName}
                </span>
              </div>

              <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

              <div className="flex-1">
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  {item.points}
                </span>
              </div>
            </div>
          ))}
          {/* 페이크 아이템 추가 */}
          <div className="hidden min-h-[49px] w-full items-center gap-4 lg:flex">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                ⚡️New Nuclear
              </span>
              <span className="text-[12px] leading-[19.2px] text-[#999EA7]">
                {items[0].timeAgo}
              </span>
            </div>

            <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

            <div className="flex flex-1 gap-1.5">
              <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                {items[0].type}
              </span>
              <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                {items[0].typeCount}
              </span>
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                {items[0].name}
              </span>
            </div>

            <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

            <div className="flex flex-1 gap-1.5">
              <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                {items[0].target}
              </span>
              <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                {items[0].targetCount}
              </span>
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                {items[0].targetName}
              </span>
            </div>

            <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

            <div className="flex-1">
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                {items[0].points}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[49px] items-center overflow-hidden lg:hidden">
        <div
          className={`flex h-full w-full flex-col px-2 ${isTransitioning ? 'transition-transform duration-700' : 'duration-0'}`}
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
          }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex min-h-[49px] w-full items-center justify-between gap-2 lg:hidden">
              <div className="flex flex-1 items-center gap-2">
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  ⚡️New
                </span>
                <span className="text-[12px] leading-[19.2px] text-[#999EA7]">
                  {item.timeAgo}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                  {item.type}
                </span>
                <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                  {item.typeCount}
                </span>
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
          <div className="flex min-h-[49px] w-full items-center justify-between gap-2 lg:hidden">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                ⚡️New
              </span>
              <span className="text-[12px] leading-[19.2px] text-[#999EA7]">
                {items[0].timeAgo}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                {items[0].type}
              </span>
              <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                {items[0].typeCount}
              </span>
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                {items[0].name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* chart */}
      <div className="gap-4 rounded-xl border border-[#323233] bg-[#0A0A0A1A] p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <div>
              <span className="rounded-md border border-[#242424] bg-[#14141480] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#909296]">
                Squad Dashboard
              </span>
              <div className="flex items-center gap-2">
                <p className="text-[36px] font-medium leading-[43.2px] text-white">
                  coinboys
                </p>
                <span className="rounded-[100px] border border-[#1F1F1F] bg-[#0A0A0A4D] px-4 py-2 text-[16px] font-normal leading-[19.2px] text-[#8E9199]">
                  x2.5
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {squad === 'leader' && <SquadAttackModal />}

              <button
                className="hover_button"
                onClick={() => addToast('success', 'Squad link copied')}>
                Invite Squad
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:w-[800px] lg:flex-row">
            <div className="flex flex-1 flex-col gap-1 py-2">
              <p className="text-[14px] font-normal leading-[19.6px] text-[#737780]">
                Squad Point
              </p>
              <span className="text-[18px] font-medium leading-[25.2px] text-[#E5E5E5]">
                10,563,356
              </span>
            </div>
            <div className="hidden h-[65px] w-[1px] bg-[#323233] lg:block"></div>
            <div className="h-[1px] w-full bg-[#323233] lg:hidden"></div>
            <div className="flex flex-1 flex-col gap-1 py-2">
              <p className="text-[14px] font-normal leading-[19.6px] text-[#737780]">
                Squad Member
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-medium leading-[25.2px] text-[#E5E5E5]">
                  10,345
                </span>
                <span className="rounded-[100px] bg-[#1D1E1F] px-2 py-1 text-[12px] font-medium leading-[15.6px] text-[#888E99]">
                  today 12
                </span>
              </div>
            </div>
            <div className="hidden h-[65px] w-[1px] bg-[#323233] lg:block"></div>
            <div className="flex flex-1 flex-col gap-1 py-2">
              <p className="text-[14px] font-normal leading-[19.6px] text-[#737780]">
                Squad Rank
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-medium leading-[25.2px] text-[#E5E5E5]">
                  13
                </span>
                <div className="flex items-center">
                  <img src="/triangle.svg" />
                  <span className="text-[12px] font-normal leading-[16.8px] text-[#CC2929]">
                    2
                  </span>
                  <img src="/reverse_triangle.svg" />
                  <span className="text-[12px] font-normal leading-[16.8px] text-[#0078FF]">
                    2
                  </span>
                  <img src="/zero_bar.svg" />
                  <span className="text-[12px] font-normal leading-[16.8px] text-[#484A4D]">
                    0
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden h-[65px] w-[1px] bg-[#323233] lg:block"></div>
            <div className="flex flex-1 flex-col gap-1 py-2">
              <p className="text-[14px] font-normal leading-[19.6px] text-[#737780]">
                Nuclear
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-medium leading-[25.2px] text-[#E5E5E5]">
                  15
                </span>
                {squad === 'leader' && (
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button>
                        <img src="/circle_plus.svg" alt="circle plus" />
                      </button>
                    </Dialog.Trigger>
                    <NuclearModal />
                  </Dialog.Root>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <SquadChart />
        </div>
      </div>

      {/* gpu & history  */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#323233] bg-[#0A0A0A] p-6 lg:w-[392px]">
          <div className="flex flex-col gap-4">
            <span className="self-start rounded-md bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
              My Virtual GPU
            </span>
            <span className="text-[32px] font-medium leading-[41.6px] text-white">
              523,670
            </span>
            <div className="flex gap-1">
              {Array.from({length: 43}).map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-1"
                  style={{
                    background:
                      index < gpuGage
                        ? 'linear-gradient(180deg, #E6E8EC 23.4%, #C1C5CE 77.66%)'
                        : '#FFFFFF1A',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#323233]"></div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="h-8 self-start rounded-md bg-[#1B1C1F] px-3 py-[5px] text-[16px] font-normal leading-[19.2px] text-[#999EA7]">
                0h 0m 0s
              </span>
              <p className="text-[14px] font-normal leading-[16.8px] text-[#5D6066]">
                Earn <span className="text-[#E5E5E5]">20</span> points per
                active
              </p>
            </div>
            <button
              disabled={gpuGage !== 43}
              className={`rounded-[100px] px-6 py-2.5 text-[16px] font-medium leading-[20.8px] ${gpuGage !== 43 ? 'border border-[#4A4B4D] bg-transparent text-[#999EA7]' : 'bg-white text-[#010101]'}`}>
              Active
            </button>
          </div>
        </div>

        <SquadHistoryTable />
      </div>

      {/* tables */}
      <div className="mb-[46px] mt-8 flex flex-col gap-2 lg:mb-[185px] lg:flex-row lg:gap-4">
        <SquadLeaderboardTable />
        <PersonalLeaderboardTable />
      </div>
    </div>
  );
};

export default DashBoard;

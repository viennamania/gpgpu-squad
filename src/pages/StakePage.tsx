import CardWrapper from '../components/CardWrapper';
import Title from '../layouts/Title';
import useThirdWeb from '../hooks/useThirdWeb';

const StakePage = () => {
  const {wallet, connectWallet} = useThirdWeb();

  return (
    <div>
      <Title title="Stake & Reward" subtitle="Stake and Earn Rewards" />

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
                  className={`rounded-md bg-[#15372E] px-2 py-1 text-[#50E3C2]`}>
                  Total Staking Node
                </span>

                <p className="mt-4 text-[32px] font-medium leading-[38.4px]">
                  10,563,356,26
                </p>
              </CardWrapper>
              <CardWrapper>
                <span
                  className={`rounded-md bg-[#1A1A1A] px-2 py-1 text-[#969696]`}>
                  My Node (Staking)
                </span>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-[32px] font-medium leading-[38.4px]">15</p>
                  <button className="h-10 rounded-[100px] border border-[#4A4B4D] bg-[#0A0A0A] px-6 py-2.5 leading-[20.8px] text-[#C7C3D2]">
                    Unstake
                  </button>
                </div>
              </CardWrapper>
              <CardWrapper className="py-[36.5px]">
                <button
                  type="button"
                  className="h-[56px] w-full rounded-xl bg-[#3676F8] px-4 py-2 font-medium leading-[22.4px]">
                  Buy Node
                </button>
              </CardWrapper>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-white lg:mt-8 lg:flex-row">
              <CardWrapper className="lg:w-[calc(66%+24px)]">
                <div className="flex items-center gap-2">
                  <img width={24} height={24} alt="logo" src="/logo.svg" />
                  <p className="text-[24px] font-medium leading-[32px]">
                    My assets
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 text-[18px] font-medium leading-[25.2px] lg:flex-row lg:items-center lg:gap-4">
                  <div className="flex-1 py-2">
                    <p className="text-sm leading-[19.6px] text-[#737780]">
                      My Staking
                    </p>
                    <p className="text-[#50E3C2]">10,563,356,26</p>
                  </div>

                  <div className="hidden h-[65px] w-[1px] bg-[#323233] lg:block" />
                  <div className="block h-[1px] w-full bg-[#323233] lg:hidden" />

                  <div className="flex-1 py-2">
                    <p className="text-sm leading-[19.6px] text-[#737780]">
                      Staking available
                    </p>
                    <p>10,563,356,26</p>
                  </div>

                  <div className="hidden h-[65px] w-[1px] bg-[#323233] lg:block" />
                  <div className="block h-[1px] w-full bg-[#323233] lg:hidden" />

                  <div className="flex-1 py-2">
                    <p className="text-sm leading-[19.6px] text-[#737780]">
                      My node
                    </p>
                    <p>15</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
                  <p className="text-[20px] leading-[24px] -tracking-[0.3px] text-[#737780]">
                    Compensation
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[24px] font-medium leading-[28.8px]">
                      15,263.65
                    </p>
                    <button className="h-10 rounded-[100px] bg-[#FFFFFF] px-6 py-2.5 leading-[20.8px] text-[#04080F]">
                      Claim
                    </button>
                  </div>
                </div>
              </CardWrapper>

              <CardWrapper className="lg:w-1/3">
                <span
                  className={`rounded-md border border-[#1A1A1A] bg-[#0A0A0A] px-2 py-1 text-[#969696]`}>
                  Node Staking
                </span>

                <p className="mt-4 text-[32px] font-medium leading-[38.4px]">
                  152,363.25
                </p>
                <button
                  type="button"
                  className="mt-[50px] h-[56px] w-full rounded-xl bg-[#FFFFFF] px-4 py-2 font-medium leading-[22.4px] text-[#010101]">
                  Staking Now
                </button>
              </CardWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakePage;

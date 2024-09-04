import CardWrapper from '../CardWrapper';
import MyNodeFirstTable from '../table/MyNodeFirstTable';
import MyNodeSecondTable from '../table/MyNodeSecondTable';
import {useSalePeriod} from '../../contexts/SalePeriodProvider';
import WhitelistCountdown from './WhitelistCountdown';
import useThirdWeb from '../../hooks/useThirdWeb';
import WhitelistCheck from './WhitelistCheck';
import ReferralLink from './ReferralLink';
import PurchaseForm from './PurchaseForm';
import TierList from './TierList';

const NodeSale = () => {
  const {period} = useSalePeriod();
  const {wallet, connectWallet} = useThirdWeb();

  return (
    <>
      <div>
        <div className="mt-11 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#4C4C4C]">
            <img src="/logo.svg" alt="logo icon" width={23.26} height={22} />
          </div>
          <p className="text-linear text-[24px] font-medium leading-[32px]">
            {period === 'public'
              ? 'GPGPU NODE Sale'
              : 'GPGPU NODE Sale - Whitelist'}
          </p>
        </div>

        <div className="px-4 lg:px-6">
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
                {/* whitelist card */}
                {period !== 'public' && <WhitelistCheck />}

                {/* referral link card */}
                <ReferralLink />

                <div className="relative">
                  {period === 'pre' && (
                    <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border border-[#323233]">
                      <WhitelistCountdown />
                    </div>
                  )}

                  <div className={period === 'pre' ? 'blur-md' : ''}>
                    {/*  tier card list */}
                    <TierList />
                    {/*  purchase form */}
                    <PurchaseForm />
                  </div>
                </div>
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
    </>
  );
};

export default NodeSale;

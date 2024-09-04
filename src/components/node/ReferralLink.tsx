import {useActiveAccount} from 'thirdweb/react';

import useToast from '../../hooks/useToast';
import CardWrapper from '../CardWrapper';
import {useAddUser} from '../../apis';

const ReferralLink = () => {
  const address = useActiveAccount()?.address;

  const {addToast} = useToast();
  const {data: userCode} = useAddUser({address});

  return (
    <CardWrapper className="mb-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <p className="text-[20px] font-medium leading-[24px] -tracking-[0.3px]">
            Copy Referral Link
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(userCode);
              addToast('success', 'Payback Code copied');
            }}
            className="mb-1.5 mt-2 flex items-center">
            <p className="text-[24px] font-medium leading-[33.6px] text-[#3676F8]">
              {userCode ?? '-'}
            </p>
            <img src="/copy.svg" width={28} height={28} alt="copy icon" />
          </button>
          <button
            disabled={!userCode}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.href}?code=${userCode}`,
              );
              addToast('success', 'Payback Code copied');
            }}
            className="flex items-center gap-1 rounded-[100px] border border-[#737780] px-2.5 py-1.5">
            <p className="text-xs font-medium leading-[15.6px]">
              COPY REFERRAL LINK
            </p>
            <img src="/link.svg" width={12} height={12} alt="link icon" />
          </button>
        </div>
        <div className="rounded-lg bg-[#141414] px-4 py-[18px] text-xs leading-[19.2px]">
          <p>
            10%{' '}
            <span className="text-[#8E9199]">Payback for Node Purchaser</span>
          </p>
          <p>
            3% <span className="text-[#8E9199]">Referral Rewards</span>
          </p>
          <p className="text-[#8E9199]">
            Qualification for representative Staker
          </p>
        </div>
      </div>
    </CardWrapper>
  );
};

export default ReferralLink;

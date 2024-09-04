import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import CardWrapper from '../../CardWrapper';
import MinusButton from '../../MinusButton';
import {formState} from '../../../atoms/form';
import {TierData} from '../../../constants/tiers';
import {tierState} from '../../../atoms/tier';
import PlusButton from '../../PlusButton';
import {useClaimedAmount} from '../../../apis';
import useContractGetOwnedNfts from '../../../hooks/useContractGetOwnedNfts';
import useUserBalance from '../../../hooks/useUserBalance';

const SaleAmount = () => {
  const {data: claimedAmount} = useClaimedAmount();
  const {nfts} = useContractGetOwnedNfts();
  const {balance} = useUserBalance();
  //const balance = 1.4563192858443306;
  const [form, setForm] = useRecoilState(formState);
  const tier = useRecoilValue(tierState);

  useEffect(() => {
    if (!claimedAmount || !nfts) return;
    const walletPerCap = TierData[tier].walletPerCap;
    const quantityOwned = nfts.find(
      (n) => Number(n.id) === tier + 1,
    )?.quantityOwned;
    const remaining = TierData[tier].amount - claimedAmount[tier + 1];
    const price = parseFloat(TierData[tier].price);
    const availableAmount = Math.floor(balance / price);
    let maxAvailableAmount = 0;
    if (availableAmount === 0) {
      maxAvailableAmount = 0;
    } else if (walletPerCap === null) {
      maxAvailableAmount = Math.min(remaining, availableAmount);
    } else {
      const quantityLeft = walletPerCap - (Number(quantityOwned) || 0);
      if (quantityLeft <= 0) {
        maxAvailableAmount = 0;
      } else {
        maxAvailableAmount = Math.min(remaining, quantityLeft, availableAmount);
      }
    }
    setForm({...form, maxAmount: maxAvailableAmount});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, claimedAmount, nfts, tier]);

  return (
    <CardWrapper className="mb-3">
      <div className="flex items-center justify-between">
        <MinusButton
          onClick={() =>
            form.amount > 0 && setForm({...form, amount: form.amount - 1})
          }
          width="40"
          height=" 40"
          color={form.amount === 0 ? '#4A4B4D' : '#FFFFFF'}
        />
        <input
          value={form.amount}
          onChange={(e) => {
            const amount = e.target.value;

            const isNumber = /^[0-9]*$/.test(amount);

            if (isNumber) {
              if (Number(amount) >= form.maxAmount) {
                setForm((prevForm) => ({
                  ...prevForm,
                  amount: form.maxAmount,
                }));
              } else {
                setForm((prevForm) => ({
                  ...prevForm,
                  amount: Number(amount),
                }));
              }
            }
          }}
          className={`w-full bg-[#0A0A0A] text-center text-[32px] font-medium leading-[38.4px] focus-within:outline-none focus-within:ring-0 ${form.amount > 0 ? 'text-[#FFFFFF]' : 'text-[#6B6E75]'} `}
        />

        <div className="flex items-center gap-2">
          <PlusButton
            onClick={() =>
              form.amount < form.maxAmount &&
              setForm({...form, amount: form.amount + 1})
            }
            width="40"
            height="40"
            color={form.amount === form.maxAmount ? '#4A4B4D' : '#FFFFFF'}
          />
          <button
            onClick={() => setForm({...form, amount: form.maxAmount})}
            disabled={form.amount === form.maxAmount}
            className="h-[40px] rounded-[100px] border border-[#4A4B4D] px-6 py-[9.5px] leading-[20.8px] text-[#C7C3D2] disabled:text-[#4A4B4D]">
            MAX
          </button>
        </div>
      </div>
    </CardWrapper>
  );
};

export default SaleAmount;

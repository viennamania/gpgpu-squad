import {useCallback, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useActiveAccount} from 'thirdweb/react';

import {formState} from '../../../atoms/form';
import CardWrapper from '../../CardWrapper';
import {useAddUser, useCheckUserByCode, useCheckWhitelist} from '../../../apis';
import {useSalePeriod} from '../../../contexts/SalePeriodProvider';

const PaybackCode = () => {
  const {period} = useSalePeriod();
  const address = useActiveAccount()?.address;
  const {data: userCode} = useAddUser({address});
  const [form, setForm] = useRecoilState(formState);
  const {refetch, isLoading} = useCheckUserByCode({code: form.code});
  const {data: exist} = useCheckWhitelist({address});

  const [message, setMessage] = useState('');
  const [autoApplied, setAutoApplied] = useState(false);

  const onCheck = useCallback(async () => {
    const data = await refetch();
    if (data.data && data.data.message === 'Success') {
      setMessage('');
      setForm((prev) => ({
        ...prev,
        code: data.data?.userCode,
        isCodeChecked: true,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        isCodeChecked: false,
      }));
      setMessage('Invalid payback code');
    }
  }, [refetch, setForm]);

  useEffect(() => {
    if (window.location.search && form.code && !autoApplied && userCode) {
      if (form.code === userCode) {
        setForm((prev) => ({
          ...prev,
          code: '',
          isCodeChecked: false,
        }));
        setMessage('Invalid payback code.');
      } else {
        onCheck();
      }
      setAutoApplied(true);
    }
  }, [form.code, autoApplied, onCheck, userCode, setForm]);

  return (
    <CardWrapper className="mb-3 flex h-[154px] flex-col justify-between lg:h-[92px] lg:flex-row lg:items-center">
      <div>
        <p className="text-[20px] font-medium leading-[24px] -tracking-[0.3px]">
          Payback Code
        </p>
        <p className="text-sm font-medium leading-[19.6px] text-[#8E9199]">
          10% Payback applied
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <input
            className="w-full bg-transparent text-[24px] font-medium leading-[28.8px] text-[#5b5e66] placeholder-[#5B5E66] outline-none lg:text-right"
            placeholder="Enter code"
            value={form.code}
            onChange={(e) => {
              if (message) {
                setMessage('');
              }
              setForm((prev) => ({...prev, code: e.target.value}));
            }}
          />
          {form.isCodeChecked && (
            <span className="flex items-start justify-start whitespace-nowrap text-right text-[14px] font-normal leading-[16.8px] text-[#03c397] lg:justify-end">
              Correct code
            </span>
          )}
          {message && (
            <span className="flex items-start justify-start whitespace-nowrap text-right text-[14px] font-normal leading-[16.8px] text-[#f26464] lg:justify-end">
              Invalid payback code
            </span>
          )}
        </div>
        <button
          onClick={onCheck}
          disabled={
            isLoading ||
            form.code.length === 0 ||
            userCode === form.code ||
            (period === 'whitelist' && !exist)
          }
          className="h-[40px] rounded-[100px] border border-[#4A4B4D] px-6 py-[9.5px] leading-[20.8px] text-[#C3C8D2] disabled:text-[#4A4B4D]">
          Apply
        </button>
      </div>
    </CardWrapper>
  );
};

export default PaybackCode;

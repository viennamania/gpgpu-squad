import * as Dialog from '@radix-ui/react-dialog';
import MinusButton from '../MinusButton';
import PlusButton from '../PlusButton';
import React, {useEffect, useState} from 'react';

import {useActiveAccount} from 'thirdweb/react';


import {
  useGetUserGpuId,
  useGetUserSquad,
  usePurchangeNuclear,
} from '../../apis';







const NuclearModal = () => {
  const [countNumber, setCountNumber] = useState(0);
  const maxNum = 15;


  const activeAccount = useActiveAccount();


  const address = activeAccount?.address;



  const [gpuId, setGpuId] = useState('');

  const {refetch: getGpuId} = useGetUserGpuId({address: address || ''});
  

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getGpuId();

      console.log('getGpuId result===', result);

      if (result?.data?.gpuId) {
        
        ///setIsJoined(true);

        setGpuId(result?.data?.gpuId);

        

      } else {
        setGpuId('');
      }

    }

    address && fetch();

  }, [address]);

  console.log('gpuId===', gpuId);


  const [squad, setSquad] = useState('');

  const [squadName, setSquadName] = useState('');

  const [nuclear, setNuclear] = useState(0);
  const [squadPoint, setSquadPoint] = useState(0);

  console.log('squdName======', squadName);


  const {refetch: getUserSquad, } = useGetUserSquad({address: address || ''});
  
  
  useEffect(() => {

    const fetch = async () => {
      const result = await getUserSquad();

      console.log('getUserSquad result===', result);

      if (result?.data?.squadName) {

        setSquadName(result?.data?.squadName);

        setSquad(result?.data?.squad === 'leader' ? 'leader' : result?.data?.squad === 'member' ? 'member' : '');

        setNuclear(result?.data?.nuclear || 0);
        setSquadPoint(result?.data?.squadPoint || 0);
 
      } else {
        setSquadName('');
        setNuclear(0);
        setSquadPoint(0);
      }
      
    }

    address && fetch();

  }, [address]);


  console.log('squadName===', squadName);
  console.log('squad===', squad);









  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 1 && Number(e.target.value) <= maxNum) {
      setCountNumber(Number(e.target.value));
    }
  };



  const {mutateAsync: purchaseNuclearAsync} = usePurchangeNuclear();

  const purchaseNuclear = async ()  => {

    const result = await purchaseNuclearAsync({
      address: address || '',
      gpuId: gpuId || '',
      squadName: squadName || '',
      nuclear: countNumber,
      payment: countNumber * 100,
    });

    console.log('result', result);

    return result;
  };



  const [isLoading, setIsLoading] = useState(false);

  const handlePurchaseNuclear = async () => {

    setIsLoading(true);

    const result = await purchaseNuclear();

    console.log('purchaseNuclear result.data', result?.data);

    if (result) {

      setCountNumber(0);



      const fetch = async () => {
        const result = await getUserSquad();
  
        console.log('getUserSquad result===', result);
  
        if (result?.data?.squadName) {
  
          setSquadName(result?.data?.squadName);
  
          setSquad(result?.data?.squad === 'leader' ? 'leader' : result?.data?.squad === 'member' ? 'member' : '');
  
          setNuclear(result?.data?.nuclear || 0);
          setSquadPoint(result?.data?.squadPoint || 0);
   
        } else {
          setSquadName('');
          setNuclear(0);
          setSquadPoint(0);
        }

      }

      address && fetch();




   
    } else {
      
    }

    setIsLoading(false);
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
                ⚡️ {nuclear}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                Squad points
              </span>
              <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                {
                  Number(squadPoint).toLocaleString('en-US')
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                Points to be used
              </span>
              <span className="text-[14px] font-normal leading-[22.4px] text-[#E5E5E5]">
                {
                  Number(countNumber * 100).toLocaleString('en-US')
                }
              </span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-[#1B1D21]"></div>

          <div className="flex items-center justify-between">
            <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
              Total Coat
            </span>
            <span className="text-[14px] font-normal leading-[22.4px] text-[#E5E5E5]">
              {
                Number(squadPoint - countNumber * 100).toLocaleString('en-US')
              }
            </span>
          </div>

          <Dialog.Close asChild>

            {isLoading ? (
              <button
                className="h-12 w-full rounded-lg bg-[#4A4B4D] p-2.5 text-center text-[16px] font-medium leading-[24px] text-[#010101]"
              >
                Buying...
              </button>
            ) : (
              <button
                onClick={handlePurchaseNuclear}
                className="h-12 w-full rounded-lg bg-white p-2.5 text-center text-[16px] font-medium leading-[24px] text-[#010101]"
              >
                Buy
              </button>
            )}


          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default NuclearModal;

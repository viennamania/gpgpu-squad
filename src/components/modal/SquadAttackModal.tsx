import * as Dialog from '@radix-ui/react-dialog';

import {useActiveAccount} from 'thirdweb/react';

import {useEffect, useState} from 'react';

import {
  useGetUserGpuId,
  useGetUserSquad,
  useAttackSquad,
} from '../../apis';



const SquadAttackModal = () => {



  const [isAttacked, setIsAttacked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  ///const victimSquad = 'airdropfinder';
  const [victimSquad, setVictimSquad] = useState('');




  const activeAccount = useActiveAccount();


  const address = activeAccount?.address;



  const [gpuId, setGpuId] = useState('');

  const {refetch: getGpuId} = useGetUserGpuId({address: address || ''});
  

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getGpuId();

      //console.log('getGpuId result===', result);

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

  //console.log('squdName======', squadName);

  const {refetch: getUserSquad, } = useGetUserSquad({address: address || ''});
  
  useEffect(() => {

    const fetch = async () => {
      const result = await getUserSquad();

      ///console.log('getUserSquad result===', result);

      if (result?.data?.squadName) {

        setSquadName(result?.data?.squadName);

        setSquad(result?.data?.squad === 'leader' ? 'leader' : result?.data?.squad === 'member' ? 'member' : '');
 
      } else {
        setSquadName('');
      }
      
    }

    address && fetch();

  }, [address]);


  console.log('squadName===', squadName);
  console.log('squad===', squad);



  const {mutateAsync: attackSquadAsync} = useAttackSquad();

  const attackSquad = async ()  => {

    const result = await attackSquadAsync({
      address: address || '',
      gpuId: gpuId || '',
      squadName: squadName || '',
      attackedSquadName: '',
    });

    console.log('result', result);

    return result;
  };




  const handleAttack = async () => {
    setIsLoading(true);

    const result = await attackSquad();

    console.log('attackSquad result.data', result?.data);

    if (result) {
      setVictimSquad(result?.data?.attackedSquadName);

      setIsAttacked(true);
    } else {
      setIsAttacked(false);
    }

    setIsLoading(false);
  };

  console.log('victimSquad===', victimSquad);



  return (
    <Dialog.Root>
      {!isAttacked ? (
        <Dialog.Trigger asChild>
          <button
            className="h-10 rounded-[38px] bg-[#000000] py-[7px] pe-[20px] ps-[18px] text-[14px] leading-[22.4px] text-[#E5E5E5]"
          >
            ⚡️Attack Squad
          </button>
        </Dialog.Trigger>
      ) : (
        <button
          disabled
          className="h-10 rounded-[38px] border border-[#323233] bg-[#0000001A] px-3 py-[7px] text-[14px] leading-[22.4px] text-[#7E828A] grayscale">
          ⚡️Next 03h 20m 30s
        </button>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="dialogOverlayAnimation fixed inset-0 z-50 bg-[#00000080] backdrop-blur-md" />
        <Dialog.Content className="dialogContentAnimation fixed left-1/2 top-1/2 z-50 flex w-[343px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-[#1B1D21] bg-[#0A0A0A] px-[18px] py-4 focus:outline-none">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <Dialog.Title className="text-[16px] font-medium leading-[25.6px] text-white">
                <Dialog.Description>Squad Attack</Dialog.Description>
              </Dialog.Title>
              {isAttacked && (
                <Dialog.Close className="outline-none">
                  <img
                    width={16.5}
                    height={16.5}
                    className="p-1"
                    alt="close icon"
                    src="/close.svg"
                  />
                </Dialog.Close>
              )}
            </div>
            <div className="h-[1px] w-full bg-[#1B1D21]"></div>

            {!isAttacked ? (
              <img
                src="squad_attack.png"
                alt="squad_attack"
                className="h-full w-full"
              />
            ) : (
              <div className="relative">
                <img
                  className="w-full"
                  src="random_attack.png"
                  alt="random_attack"
                />
                <span className="absolute left-1/2 top-[calc(50%+5px)] -translate-x-1/2 -translate-y-1/2 text-[16px] font-normal leading-[25.6px] text-[#E5E5E5]">
                  {victimSquad}
                </span>
              </div>
            )}

            {!isAttacked ? (
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
                    Until the next attack
                  </span>
                  <span className="text-[14px] font-normal leading-[22.4px] text-[#E5E5E5]">
                    24h
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                    Victim Squad
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#FFFFFF14]">
                      <span className="text-[12px] leading-[16.8px] text-white">
                        13
                      </span>
                    </div>
                    <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                      {victimSquad}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-normal leading-[22.4px] text-[#999EA7]">
                    Damage
                  </span>
                  <span className="text-[14px] font-normal leading-[22.4px] text-[#E5E5E5]">
                    -30,000,000 point
                  </span>
                </div>
              </div>
            )}

            {!isAttacked &&
              (isLoading ? (
                <button
                  onClick={handleAttack}
                  className="flex h-12 w-full items-center justify-center rounded-lg border border-[#323233] bg-transparent p-2.5 text-center text-[16px] font-medium leading-[24px] text-[#999EA7]">
                  <img
                    className="h-7 w-7"
                    alt="loading animation"
                    src="/loading_animation.gif"
                  />
                  Targeting in progress
                </button>
              ) : (
                <button
                  onClick={handleAttack}
                  className="h-12 w-full rounded-lg bg-white p-2.5 text-center text-[16px] font-medium leading-[24px] text-[#010101]">
                  Random Attack
                </button>
              ))}

          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SquadAttackModal;

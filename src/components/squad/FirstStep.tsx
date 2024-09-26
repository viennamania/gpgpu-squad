import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {useActiveAccount} from 'thirdweb/react';


import {useGetUserGpuId, useSetUserGpuId} from '../../apis';



interface FirstStepPropsType {
  setStep: Dispatch<SetStateAction<number>>;
}

const FirstStep = ({setStep}: FirstStepPropsType) => {

  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;

  const [gpuId, setGpuId] = useState('');



  const {refetch: getGpuId, isLoading} = useGetUserGpuId({address: address || ''});
  

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getGpuId();

      console.log('result===', result);

      if (result?.data?.gpuId) {
        
        setApplyState('valid');

        setGpuId(result?.data?.gpuId);

      }

      

      
    }

    fetch();


  }, [address]);


  const [applyState, setApplyState] = useState<'valid' | 'invalid' | 'default'>(
    'default',
  );



  const {mutateAsync: setUserGpuIdAsync, isPending} = useSetUserGpuId();


  const setUserGpuId = async ()  => {

    const result = await setUserGpuIdAsync({
      address,
      gpuId,
    });

    console.log('setUserGpuIdAsync result', result);

    return result ? true : false;
  };

  const handleApply = async () => {
    
    //const result = true; // 유효하지 않을 경우 false
    const result = await setUserGpuId();

    if (result) {
      ///setApplyState('valid');


      const fetch = async () => {
        const result = await getGpuId();
  
        console.log('result===', result);
  
        if (result?.data?.gpuId) {
          
          setApplyState('valid');

          setGpuId(result?.data?.gpuId);
  
        }
        
      }
  
      fetch();

    

    } else {
      setGpuId('');
      ///setApplyState('invalid');
    }
  };



  const handleNextStep = () => {
    setStep(2);
  };

  useEffect(() => {
    
    ///setApplyState('default');

    setApplyState('invalid');

  }, [gpuId]);






  return (
    <div className="my-8 w-full">
      <button
        onClick={() => setStep(0)}
        className="mb-[30px] flex items-center gap-1.5">
        <img
          src="/chevron_left.svg"
          width={16}
          height={16}
          alt="chevron left"
        />
        <span className="text-[16px] leading-[22.4px] text-[#999EA7]">
          Back to main
        </span>
      </button>

      <div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
        {/* Description */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <div className="h-[26px] w-[26px] rounded-full border border-[#FFFFFF14] bg-white text-center text-[12px] leading-[26px] text-[#010101]">
              1
            </div>
            <div className="h-[1px] w-[10px] bg-[#FFFFFF1A]"></div>
            <div className="h-[26px] w-[26px] rounded-full border border-[#FFFFFF14] bg-transparent text-center text-[12px] leading-[26px] text-[#999EA7]">
              2
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[32px] font-medium leading-[38.4px] text-[#5B5E66]">
              {gpuId || 'gpuid'} <span className="text-[#FFFFFF]">.GPU</span>
            </p>

            {applyState === 'invalid' && (
              <p className="text-[14px] leading-[19.6px] text-[#8E9199]">
                Please set the GPU ID to be active in the squad to 2 to 8
                <br className="hidden lg:block" />
                characters consisting of English and numbers
                <br />
                <br /> You cannot change it later
              </p>
            )}
          </div>


          <button
            onClick={handleNextStep}
            
            disabled={applyState !== 'valid'}
            

            className={`self-start rounded-[100px] px-6 py-[10px] text-[16px] leading-[20.8px] ${applyState !== 'valid' ? 'border border-[#4A4B4D] text-[#999EA7]' : 'bg-[#ffffff] text-[#010101]'} `}>
            Next Step
          </button>
        </div>

        {/* GPU ID */}
        {applyState === 'valid' ? (
        
          <div>

          </div>

        ) : (

          <div>
          <div className="flex w-full items-center justify-between gap-2 rounded-xl border border-[#40444B] bg-[#0101011A] p-6">
            <div className="flex flex-1 flex-col">
              <input
                
                disabled={isPending}

                value={gpuId}
                onChange={(e) => setGpuId(e.target.value)}
                className="w-full bg-transparent text-[24px] font-medium leading-[28.8px] placeholder-[#5B5E66] outline-none"
                placeholder="GPU ID"></input>

              {/*applyState !== 'default' &&
                (applyState === 'valid' ? (
                  <span className="text-sm leading-[16.8px] text-[#03C397]">
                    available names
                  </span>
                ) : (
                  <span className="text-sm leading-[16.8px] text-[#F26464]">
                    
                    It's already in use

                  </span>
                ))*/}
            </div>

           

              <button
                onClick={handleApply}
                
                disabled={!gpuId || isPending }

                className={`rounded-[100px] border border-[#4A4B4D] px-6 py-[9.5px] leading-[20.8px] ${!gpuId ? 'text-[#5F6166]' : 'text-[#FFFFFF]'} `}>
                Apply
              </button>

       


          </div>
        </div>


        )}


      </div>
    </div>
  );
};

export default FirstStep;

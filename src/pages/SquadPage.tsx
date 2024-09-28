
import Title from '../layouts/Title';
import FirstStep from '../components/squad/FirstStep';
import SecondStep from '../components/squad/SecondStep';
import DashBoard from '../components/squad/DashBoard';
import {useRecoilState} from 'recoil';
import {joinState, squadState} from '../atoms/squad';
import useThirdWeb from '../hooks/useThirdWeb';
import {useActiveAccount} from 'thirdweb/react';

import {useEffect, useState} from 'react';




import {
  useGetUserGpuId,
  useGetUserSquad,
} from '../apis';



const SquadPage = () => {

  const {connectWallet} = useThirdWeb();
  const activeAccount = useActiveAccount();
  const [step, setStep] = useState(0);
  const [squad, setSquad] = useRecoilState(squadState);
  const [isJoined, setIsJoined] = useRecoilState(joinState);



  const address = activeAccount?.address;



  const [gpuId, setGpuId] = useState('');

  const {refetch: getGpuId, isLoading} = useGetUserGpuId({address: address || ''});
  

  console.log('isLoading===', isLoading);


  
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
  


  
  useEffect(() => {

    if (!address) {

      setStep(0);

      setIsJoined(false);

      setGpuId('');

      setSquadName('');

    }

  } , [address]);








  const [squadName, setSquadName] = useState('');

  console.log('squdName======', squadName);

  const {refetch: getUserSquad, } = useGetUserSquad({address: address || ''});
  
  useEffect(() => {

    const fetch = async () => {
      const result = await getUserSquad();

      console.log('getUserSquad result===', result);

      if (result?.data?.squadName) {
        
        setIsJoined(true);

        //setSquad('member');

        setSquadName(result?.data?.squadName);

        setSquad(result?.data?.squad === 'leader' ? 'leader' : result?.data?.squad === 'member' ? 'member' : '');
 
      } else {
        setSquadName('');
      }
      
    }

    address && fetch();

  }, [address]);




  useEffect(() => {

    if (!squadName) {

      setStep(0);

      setIsJoined(false);

    }

  } , [squadName]);

  console.log('step===', step);





  return (
    <div>
      <Title title="Squad" subtitle="Get points by playing in the squad" />

      <div className="px-4 lg:px-6">

        {/*
        <div className="mx-auto flex max-w-[1200px] flex-1">
          <button
            onClick={() =>
              setSquad((prev) => (prev === 'member' ? 'leader' : 'member'))
            }
            className="rounded-lg border p-2">
            {squad}
          </button>
          <button
            onClick={() => setIsJoined((prev) => !prev)}
            className="rounded-lg border p-2">
            {isJoined ? 'join o' : 'join x'}
          </button>
        </div>
        */}

        {address && gpuId && (
          <div className="mx-auto flex max-w-[1200px] flex-1 mt-5 mb-5">
            <h3 className="text-[24px] font-medium ">
           
            {squad}{' '}gpuId: {gpuId}

            </h3>
          </div>
        )}

      




        <div className="mx-auto flex max-w-[1200px] flex-1">
          {!isJoined ? (
            step === 0 ? (
              <div className="my-[100px] flex w-full flex-col items-center justify-center gap-4 lg:my-[228px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#4C4C4C]">
                  <img
                    src="/logo.svg"
                    alt="logo icon"
                    width={23.26}
                    height={22}
                  />
                </div>
                <h3 className="text-[24px] font-medium leading-[28.8px]">
                  Join the Squad
                </h3>

                <p className="text-center text-[14px] font-normal leading-[19.6px] text-[#8E9199]">
                  Join the squad and earn points.
                  <br />
                  You can earn both personal and squad rewards
                </p>

                {activeAccount?.address ? (
                  <button
                    onClick={() => setStep(1)}
                    className="leading-20.8px] mt-5 flex h-10 items-center gap-1 rounded-[100px] border bg-white px-[18px] py-2.5 text-center">
                    <span className="text-[16px] font-medium text-black">
                      Join the Squad
                    </span>
                    <img src="/chevron_right.svg" width={16} height={16} />
                  </button>
                ) : (
                  <button
                    style={{boxShadow: '0px 0px 16px 0px #FFFFFF14 inset'}}
                    onClick={connectWallet}
                    className="mt-5 h-10 rounded-[100px] border border-[#FFFFFF14] px-5 py-2.5 text-[16px] font-medium leading-[20.8px] text-[#FFFFFF]">
                    Wallet Connect
                  </button>
                )}
              </div>
            ) : step === 1 ? (
              <FirstStep setStep={setStep} />
            ) : (
              <SecondStep setStep={setStep} setIsJoined={setIsJoined} />
            )
          ) : (
            <DashBoard />
          )}
        </div>
      </div>
    </div>
  );
};

export default SquadPage;

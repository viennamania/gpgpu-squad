import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import SquadListTable from '../table/SquadListTable';



import {useActiveAccount} from 'thirdweb/react';


import {
  useGetUserGpuId,
  useGetUserSquad,
  useMakeSquad,
  useJoinSquad,
  useGetSquadList,
} from '../../apis';




interface SecondStepPropsType {
  setStep: Dispatch<SetStateAction<number>>;
  setIsJoined: Dispatch<SetStateAction<boolean>>;
}

const SecondStep = ({setStep, setIsJoined}: SecondStepPropsType) => {

  const [selectedSquadType, setSelectedSquadType] = useState<
    'leader' | 'member'
  >('leader');



 

  const [applyState, setApplyState] = useState<'valid' | 'invalid' | 'default'>(
    'default',
  );




  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;



  const [gpuId, setGpuId] = useState('');

  const {refetch: getGpuId, isLoading} = useGetUserGpuId({address: address || ''});
  
  console.log('isLoading===', isLoading);



  useEffect(() => {
    
    const fetch = async () => {
      const result = await getGpuId();

      console.log('result===', result);

      if (result?.data?.gpuId) {

        setGpuId(result?.data?.gpuId);

      }
      
    }

    fetch();

  }, [address]);



  const [startSquad, setStartSquad] = useState(false);




  const [squadName, setSquadName] = useState('');

  console.log('squdName======', squadName);

  const {refetch: getUserSquad, } = useGetUserSquad({address: address || ''});
  
  useEffect(() => {

    const fetch = async () => {
      const result = await getUserSquad();

      console.log('getUserSquad result===', result);

      if (result?.data?.squadName) {
        
        setIsJoined(true);

        ///setSquad('leader');

        setSquadName(result?.data?.squadName);

        setStartSquad(true);

 
      } else {
        setSquadName('');
      }
      
    }

    address && fetch();

  }, [address]);












  const [squadNameInput, setSquadNameInput] = useState('');




  const {mutateAsync: makeSquadAsync} = useMakeSquad();

  const makeSquad = async ()  => {

    console.log('useMakeSquad address', address);
    console.log('useMakeSquad gpuId', gpuId);
    console.log('useMakeSquad squadNameInput', squadNameInput);

    const result = await makeSquadAsync({
      address: address || '',
      gpuId: gpuId || '',
      squadName: squadNameInput,
    });

    console.log('result', result);

    return result ? true : false;
  };


  const handleApply = async () => {
    
    ///const result = true; // 유효하지 않을 경우 false
    const result = await makeSquad();


    if (result) {
      setApplyState('valid');

      setSquadName(squadNameInput);
      setStep(0);

    } else {
      setSquadName('');
      setApplyState('invalid');
    }
  };




  const {mutateAsync: joinSquadAsync, } = useJoinSquad();

  const joinSquad = async ()  => {

    console.log('joinSquad address', address);
    console.log('joinSquad gpuId', gpuId);
    console.log('joinSquad squadNameInput', squadNameInput);

    const result = await joinSquadAsync({
      address: address || '',
      gpuId: gpuId || '',
      squadName: squadName,
    });

    console.log('joinSquadAsync result', result);

    return result ? true : false;
  };


  const handleNextStep = async () => {

    // selectedSquadType
    // if selectedSquadType === 'member'

    ////setIsJoined(true);


    if (selectedSquadType === 'member') {
      

      const result = await joinSquad();

      if (result) {

        setIsJoined(true);
        
        setStep(0);

      } else {
        setIsJoined(false);
      }




    } else {

      setStep(0);

    }



  };




  useEffect(() => {

    if (squadName && selectedSquadType === 'member') {
      setStartSquad(true);
    } else {
      setStartSquad(false);
    }

  }, [squadName, selectedSquadType]);

  


  const tableData = [
    {
      rank: 1,
      name: 'coinboys',
      leader: 'coinboy',
      member: 98220034,
      radio: false,
    },
    {
      rank: 2,
      name: 'coinboys',
      leader: 'coinboy2',
      member: 98220034,
      radio: false,
    },
    {
      rank: 3,
      name: 'coinboys',
      leader: 'coinboy3',
      member: 98220034,
      radio: false,
    },
    {
      rank: 4,
      name: 'coinboys',
      leader: 'coinboy4',
      member: 98220034,
      radio: false,
    },
  ];



  const [squadData, setSquadData] = useState(tableData);

  const {refetch: getSquadList} = useGetSquadList();
  useEffect(() => {
    
    const fetch = async () => {
      const result = await getSquadList();

      console.log('getSquadList result', result);
      

      if (result?.data?.data) {
        /*
        [
          {
              "_id": "66f52c58bdbbcb3a37663bc3",
              "createdAt": "2024-09-26T09:41:44.698Z",
              "walletAddress": "0x164Ec01A0811207f40660e28Fa49059977EC41E5",
              "gpuId": "jack",
              "squadName": "jacks room"
          },
          {
              "_id": "66f5108b222c23c82820b1fe",
              "createdAt": "2024-09-26T07:43:07.806Z",
              "walletAddress": "0x5F218A6154FEBcB2649A88e983f7B69090BfdF47",
              "gpuId": "jenna",
              "squadName": "vienna"
          },
          {
              "_id": "66f4f367f6e7c4a43fe313d7",
              "createdAt": "2024-09-26T05:38:47.830Z",
              "walletAddress": "0x222d0Cf4c3d041B5a3ae0EAfC915D2d1aCC78b9D",
              "gpuId": "nevertry",
              "squadName": "songpa"
          }
        ]
        */

        const squadList = result?.data?.data.map((item: any) => {
          return {
            rank: 1,
            name: item.squadName,
            leader: item.gpuId,
            member: 2333,
            radio: false,
          };
        } );
          
          setSquadData(squadList);

      }
      
    }

    fetch();

  }, []);



  ///console.log('squadData==========', squadData);






  /*
  useEffect(() => {
    // get squad data from api

    const fetch = async () => {
      
      const result = await axios.get('/getSquadList');

      console.log('getSquadList result.data', result?.data);

      setSquadData(result?.data?.squadList);

    }

    fetch();

  }, []);
  */






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
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#FFFFFF] bg-[#2B2B2B] text-center text-[12px] leading-[26px] text-[#999EA7]">
              <img src="/step_checked.svg" width={9.5} height={6.33} />
            </div>
            <div className="h-[1px] w-[10px] bg-[#FFFFFF1A]"></div>
            <div className="h-[26px] w-[26px] rounded-full border border-[#FFFFFF14] bg-white text-center text-[12px] leading-[26px] text-[#010101]">
              2
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[32px] font-medium leading-[38.4px] text-[#FFFFFF]">
              Squad choice
            </p>
            <p className="text-[14px] leading-[19.6px] text-[#8E9199]">
              Create a new squad and act as a leader or participate as
              <br />a member within an already made squad
            </p>
          </div>
          <button
            onClick={handleNextStep}
            //disabled={applyState !== 'valid'}
            disabled={!startSquad}
            className={`self-start rounded-[100px] px-6 py-[10px] text-[16px] leading-[20.8px] ${!startSquad ? 'border border-[#4A4B4D] text-[#999EA7]' : 'bg-[#ffffff] text-[#010101]'} `}>
            Start Squad
          </button>
        </div>

        {/* Squad Type */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 lg:flex-row">

            <button
              className="flex-1"
              onClick={() => (
                setSelectedSquadType('leader'), setSquadNameInput(''), setSquadName('')
              )}>
              

              <div
                className={`flex w-full items-start justify-between rounded-xl border p-6 border-[${selectedSquadType === 'leader' ? '#E5E5E5' : '#40444B'}] bg-[#0101011A]`}>
                <div className="flex flex-col gap-2">
                  <div className="self-start rounded-md bg-[#292929] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                    Leader
                  </div>
                  <p className="text-linear text-[16px] font-medium leading-[22.4px]">
                    Create New Squad
                  </p>
                </div>

                <img
                  src={`${selectedSquadType === 'leader' ? '/radio_selected.svg' : '/radio.svg'}`}
                  width={24}
                  height={24}
                  alt="radio svg"
                />
              </div>
            </button>

            <button
              className="flex-1"
              onClick={() => (
                setSelectedSquadType('member'), setSquadNameInput(''), setSquadName('')
              )}>

              <div
                className={`flex items-start justify-between rounded-xl border p-6 border-[${selectedSquadType === 'member' ? '#E5E5E5' : '#40444B'}] bg-[#0101011A]`}>
                <div className="flex flex-col gap-2">
                  <div className="self-start rounded-md bg-[#292929] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                    Member
                  </div>
                  <p className="text-linear text-[16px] font-medium leading-[22.4px]">
                    Join Squad
                  </p>
                </div>

                <img
                  src={`${selectedSquadType === 'member' ? '/radio_selected.svg' : '/radio.svg'}`}
                  width={24}
                  height={24}
                  alt="radio svg"
                />
              </div>
            </button>
          </div>

          {selectedSquadType === 'leader' ? (
            <div className="flex flex-col gap-4 rounded-xl border border-[#40444B] p-6 lg:w-[700px]">
              <p className="text-linear text-[20px] font-medium leading-[28px]">
                Name Check
              </p>

              <div className="flex flex-row items-center justify-between gap-2 border-[#40444B] bg-[#0101011A] lg:flex-row">
                <div className="flex flex-1 flex-col">
                  <input
                    value={squadNameInput}
                    onChange={(e) => setSquadNameInput(e.target.value)}
                    className="w-full bg-transparent text-[24px] font-medium leading-[28.8px] placeholder-[#5B5E66] outline-none"
                    placeholder="Squad Name"></input>

                  {applyState !== 'default' &&
                    (squadNameInput ? (
                      <span className="text-sm leading-[16.8px] text-[#03C397]">
                        you can use it
                      </span>
                    ) : (
                      <span className="text-sm leading-[16.8px] text-[#F26464]">
                        not available
                      </span>
                    ))}
                </div>
                <button
                  onClick={handleApply}
                  disabled={!squadNameInput}
                  className={`rounded-[100px] border border-[#4A4B4D] px-6 py-[9.5px] leading-[20.8px] ${!squadNameInput ? 'text-[#5F6166]' : 'text-[#FFFFFF]'} `}>
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <SquadListTable
              squadData={squadData}
              setApplyState={setApplyState}
              setSelectedSquadName={setSquadName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondStep;

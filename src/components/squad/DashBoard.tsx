import {useEffect, useState} from 'react';
import SquadChart from './Chart';
import SquadHistoryTable from '../table/SquadHistoryTable';
import SquadLeaderboardTable from '../table/SquadLeaderboardTable';
import PersonalLeaderboardTable from '../table/PersonalLeaderboardTable';
import useToast from '../../hooks/useToast';
import * as Dialog from '@radix-ui/react-dialog';
import NuclearModal from '../modal/NuclearModal';
import SquadAttackModal from '../modal/SquadAttackModal';
import {squadState} from '../../atoms/squad';
import {useRecoilValue} from 'recoil';

import {useActiveAccount} from 'thirdweb/react';


import {
  useGetUserGpuId,
  useGetUserSquad,
  useActivateGpu,

  useGetSquadLeaderboard,
  
  useGetPersonalLeaderboard,

  useGetGameHistoryList,

  useGetSquadAttackHistoryList,
} from '../../apis';






const DashBoard = () => {

  const {addToast} = useToast();
  const squad = useRecoilValue(squadState);
  
  const [gpuGage, setGpuGage] = useState(43);

  const [currentIndex, setCurrentIndex] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);


  const address = useActiveAccount()?.address;

  ///const {data: userCode} = useAddUser({address});





  const [gpuId, setGpuId] = useState('');
  const [virtualGpu, setVirtualGpu] = useState(0);
  const [userSquadPoint, setUserSquadPoint] = useState(0);
  const [durationInSecond, setDurationInSecond] = useState(0);

  console.log('gpuId===', gpuId);



  const {refetch: getGpuId} = useGetUserGpuId({address: address || ''});
  

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getGpuId();

      console.log('getGpuId result===', result);

      if (result?.data?.gpuId) {
        
        ///setIsJoined(true);

        setGpuId(result?.data?.gpuId);

        setVirtualGpu(result?.data?.virtualGpu || 0);

        setDurationInSecond(result?.data?.durationInSecond || 0);

        setUserSquadPoint(result?.data?.squadPoint || 0);

        //console.log('durationInSecond===', result?.data?.durationInSecond);

         // gpuGage is between 0 and 43

         if (result?.data?.durationInSecond === 0) {

          setGpuGage(43);

         }

      }


      

      
    }

    address && fetch();

    // fetch data every 1 seconds

    const intervalId = setInterval(() => {
      address && fetch();
    }, 1000);

    return () => clearInterval(intervalId);


  }, [address]);





  const [squadName, setSquadName] = useState('');
  const [squadMemberCount, setSquadMemberCount] = useState(0);
  const [squadMemberCountToday, setSquadMemberCountToday] = useState(0);
  const [nuclear, setNuclear] = useState(0);
  const [squadPoint, setSquadPoint] = useState(0);
  const [squadRank, setSquadRank] = useState(0);

  //console.log('squdName======', squadName);
  //console.log('squadMemberCount======', squadMemberCount);

  const {refetch: getUserSquad, } = useGetUserSquad({address: address || ''});
  

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getUserSquad();

      console.log('getUserSquad result data===', result?.data);

      if (result?.data?.squadName) {
        
        //setIsJoined(true);

        //setSquad('leader');

        setSquadName(result?.data?.squadName);

        setSquadMemberCount(result?.data?.memberCount || 0);

        setSquadMemberCountToday(result?.data?.memberCountToday || 0);

        setNuclear(result?.data?.nuclear || 0);

        setSquadPoint(result?.data?.squadPoint || 0);

        setSquadRank(result?.data?.squadRank || 0);


       

      }


      
    }


    address && fetch();

    // fetch data every 5 seconds
    const intervalId = setInterval(() => {
      address && fetch();
    }, 5000);

    return () => clearInterval(intervalId);


  }, [address]);





  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === items.length) {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => {
          setIsTransitioning(true);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 1);
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);


  useEffect(() => {
    if (squad === 'member') {
      
      //setGpuGage(5);

    } else {

      //setGpuGage(43);

    }
  }, [squad]);








  const {mutateAsync: activateGpuAsync} = useActivateGpu();

  const activateGpu = async ()  => {

    const result = await activateGpuAsync({
      address: address || '',
    });

    console.log('result', result);

    return result;
  };



  const [isLoading, setIsLoading] = useState(false);

  const handleActivateGpu = async () => {

    setIsLoading(true);

    const result = await activateGpu();

    console.log('activateGpu result.data', result?.data);

    if (result) {

    } else {
      
    }

    setIsLoading(false);
  };



  /*
  const squadLeaderboardData = [
    {
      rank: 13,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    {
      rank: 1,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    {
      rank: 2,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    {
      rank: 3,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    {
      rank: 4,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
  ];
  */


  interface SquadLeaderboardItem {
    rank: number;
    name: string;
    leader: string;
    member: number;
    totalPoint: number;
    multiple: number;
  }
  
  const [squadLeaderboardData, setSquadLeaderboardData] = useState<SquadLeaderboardItem[]>([

    /*
    {
      rank: 13,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    {
      rank: 1,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    {
      rank: 2,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    {
      rank: 3,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    {
      rank: 4,
      name: 'Coinboys',
      leader: 'coinboy',
      member: 11241321,
      totalPoint: 1822923000,
      multiple: 2.5,
    },
    */
  ]);

  const {refetch: getSquadLeaderboard} = useGetSquadLeaderboard();

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getSquadLeaderboard();

      //console.log('getSquadLeaderboard result===', result);

      if (result?.data?.data) {
  

        const squadLeaderboard = result?.data?.data.map((item: any, index: number) => {
          return {
            rank: index + 1,
            name: item?.squadName,
            leader: item?.gpuId,
            member: item?.joinedMemberCount || 0,
            totalPoint: item?.squadPoint || 0,
            multiple: item?.multiple || 0,
          };
        } );
          
          
        //console.log('squadLeaderboard===', squadLeaderboard);

        // first is my squad
        setSquadLeaderboardData([
          {
            rank: 1,
            name: squadName,
            leader: gpuId,
            member: squadMemberCount,
            totalPoint: squadPoint,
            multiple: 2.5,
          },
          
          ...squadLeaderboard,
        ]);



      }
      
    }

    fetch();

    // fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetch();
    }, 5000);

    return () => clearInterval(intervalId);

  }, [squadName, gpuId, squadMemberCount, squadPoint]);





  interface PersonalLeaderboardItem {
    rank: number;
    name: string;
    totalPoint: number;
  }
 

  /*
      {
      rank: 8293,
      name: 'Coinboys',
      totalPoint: 1822923000,
    },
  */

  const [personalLeaderboardData, setPersonalLeaderboardData] = useState([] as PersonalLeaderboardItem[]);

  const {refetch: getPersonalLeaderboard} = useGetPersonalLeaderboard();

  useEffect(() => {
      
      const fetch = async () => {
        const result = await getPersonalLeaderboard();
  
        //console.log('getPersonalLeaderboard result===', result);
  
        if (result?.data?.data) {
          
          const personalLeaderboard = result?.data?.data.map((item: any, index: number) => {
            return {
              rank: index + 1,
              name: item?.gpuId,
              totalPoint: item?.squadPoint || 0,
            };
          });
  
          //console.log('personalLeaderboard===', personalLeaderboard);
  
          if (squad === 'member') {
            setPersonalLeaderboardData([
              {
                rank: squadRank,
                name: gpuId,
                totalPoint: userSquadPoint
              },
              ...personalLeaderboard,
            ])
          } else {
            setPersonalLeaderboardData(personalLeaderboard);
          }

  
        }
        
      }
  
      fetch();

      const intervalId = setInterval(() => {
        fetch();
      } , 5000);

      return () => clearInterval(intervalId);
  
    }, [userSquadPoint, squadRank, gpuId]);




  interface SquadHistoryItem {
    state: string;
    squad: string;
    content: string;
    date: Date;
  }

  const [squadHistoryData, setSquadHistoryData] = useState([] as SquadHistoryItem[]);

  const {refetch: getGameHistoryList} = useGetGameHistoryList();

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getGameHistoryList();

      ////console.log('getGameHistoryList result===', result);

      if (result?.data?.data) {

  
        const squadHistory = result?.data?.data.map((item: any) => {

          let state = '';
          if (item?.action === 'joinSquad') {
            state = 'Join';
          } else if (item?.action === 'purchaseNuclear') {
            state = 'Purchase';
          } else if (item?.action === 'attackSquad') {
            state = 'Attack';
          } else if (item?.action === 'damageSquad') {
            state = 'Damage';
          }


          // content is html
          let content = '';


          {/*(props.row.original.state === 'Attack' ||
            props.row.original.state === 'Damage') && (
            <p>
              nuclear misiile drop{' '}
              <span className="text-white">({props.getValue()})</span>
            </p>
          )}
          {props.row.original.state === 'Purchase' && (
            <p>
              Leader's bought two nuclear missiles{' '}
              <span className="text-white">({props.getValue()})</span>
            </p>
          )}
          {props.row.original.state === 'Join' && (
            <p>
              The new user,{' '}
              <span className="text-white">{props.getValue()}</span> has joined
              us
            </p>
          )*/}


          if (state === 'Attack' || state === 'Damage') {
            content = `nuclear misiile drop <span className="text-white">(${item?.nuclear})</span>`;
          } else if (state === 'Purchase') {
            content = `Leader's bought two nuclear missiles <span className="text-white">(${item?.nuclear})</span>`;
          } else if (state === 'Join') {
            content = `The new user, <span className="text-white">${item?.squadName}</span> has joined us`;
          } else {
            content = '';
          }



          return {
            state: state,
            squad: item?.squadName,
            content: content,
            date: new Date(item?.createdAt),
          };
        });

        //console.log('squadHistory===', squadHistory);

        setSquadHistoryData(squadHistory);

     

      }
      
    }

    fetch();

    // fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetch();
    }, 5000);

    return () => clearInterval(intervalId);

  }, []);




/*
const items = [
  {
    type: 'Attacker',
    typeCount: 13,
    name: 'coinboys',
    target: 'Victim',
    targetCount: 4,
    targetName: 'airdopfinder',
    points: '-300,000,000 Point',
    timeAgo: '3m ago',
  },
  {
    type: 'Attacker2',
    typeCount: 13,
    name: 'coinboys2',
    target: 'Victim2',
    targetCount: 4,
    targetName: 'airdopfinder2',
    points: '-300,000,000 Point2',
    timeAgo: '3m ago',
  },
  {
    type: 'Attacker3',
    typeCount: 13,
    name: 'coinboys3',
    target: 'Victim3',
    targetCount: 4,
    targetName: 'airdopfinder3',
    points: '-300,000,000 Point3',
    timeAgo: '3m ago',
  },
];
*/





  interface SquadAttackHistoryItem {
    type: string;
    typeCount: number;
    name: string;
    target: string;
    targetCount: number;
    targetName: string;
    points: string;
    timeAgo: string;
  }

  const [items, setItems] = useState([] as SquadAttackHistoryItem[]);


  const {refetch:
    squadAttackHistoryList,
  } = useGetSquadAttackHistoryList();



  useEffect(() => {


    // gameHistory is which is action is 'attackSquad' and sort by createdAt desc

    const fetch = async () => {


      const itemsData = [] as SquadAttackHistoryItem[];


      const result = await squadAttackHistoryList();

      if (result?.data?.data) {


        const gameHistory = result?.data?.data;

        gameHistory.forEach((item: any) => {

          let i = 0;

          if (item?.action === 'attackSquad') {

            //timeAgo is form now to createdAt
            const timeAgo = (new Date().getTime() - new Date(item?.createdAt).getTime()) / 1000 + 's ago';

            console.log('timeAgo===', timeAgo);


            // push item to first order

            

            itemsData.push({
              type: i === 0 ? 'Attacker' : i === 1 ? 'Attacker2' : 'Attacker3',
              typeCount: 13,
              name: item?.squadName,
              target: 'Victim',
              targetCount: 4,
              targetName: 'airdopfinder',
              points: '-300,000,000 Point',
              
              timeAgo: timeAgo,
            });

            i++;

          }

        });

      }



      setItems(itemsData);

    }

    fetch();

    // fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetch();
    }, 5000);

    return () => clearInterval(intervalId);

  } , []);








  return (
    <div className="w-full">

      {/* userCode */}
      {/*
      <div className="hidden lg:flex justify-end gap-4">
        <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
          User Code
        </span>
        <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
          {userCode}
        </span>
      </div>
      */}


      {/* status bar */}
      <div className="hidden h-[49px] items-center overflow-hidden lg:flex">
        <div
          className={`flex h-full w-full flex-col px-2 ${isTransitioning ? 'transition-transform duration-700' : 'duration-0'}`}
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
          }}>

          {items.map((item, index) => (
            <div
              key={index}
              className="hidden min-h-[49px] w-full items-center gap-4 lg:flex">
              {/* 슬라이드 내용 */}
              <div className="flex flex-1 items-center gap-2">
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  ⚡️New Nuclear
                </span>
                <span className="text-[12px] leading-[19.2px] text-[#999EA7]">
                  {item.timeAgo}
                </span>
              </div>

              <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

              <div className="flex flex-1 gap-1.5">
                <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                  {item.type}
                </span>
                <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                  {item.typeCount}
                </span>
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  {item.name}
                </span>
              </div>

              <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

              <div className="flex flex-1 gap-1.5">
                <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                  {item.target}
                </span>
                <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                  {item.targetCount}
                </span>
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  {item.targetName}
                </span>
              </div>

              <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

              <div className="flex-1">
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  {item.points}
                </span>
              </div>
            </div>
          ))}

          {/* 페이크 아이템 추가 */}
          {/*
          <div className="hidden min-h-[49px] w-full items-center gap-4 lg:flex">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                ⚡️New Nuclear
              </span>
              <span className="text-[12px] leading-[19.2px] text-[#999EA7]">
                {items[0].timeAgo}
              </span>
            </div>

            <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

            <div className="flex flex-1 gap-1.5">
              <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                {items[0].type}
              </span>
              <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                {items[0].typeCount}
              </span>
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                {items[0].name}
              </span>
            </div>

            <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

            <div className="flex flex-1 gap-1.5">
              <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                {items[0].target}
              </span>
              <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                {items[0].targetCount}
              </span>
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                {items[0].targetName}
              </span>
            </div>

            <div className="h-[25px] w-[1px] bg-[#4B4C4D]" />

            <div className="flex-1">
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                {items[0].points}
              </span>
            </div>
          </div>
          */}


        </div>
      </div>

      <div className="flex h-[49px] items-center overflow-hidden lg:hidden">
        <div
          className={`flex h-full w-full flex-col px-2 ${isTransitioning ? 'transition-transform duration-700' : 'duration-0'}`}
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
          }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex min-h-[49px] w-full items-center justify-between gap-2 lg:hidden">
              <div className="flex flex-1 items-center gap-2">
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  ⚡️New
                </span>
                <span className="text-[12px] leading-[19.2px] text-[#999EA7]">
                  {item.timeAgo}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                  {item.type}
                </span>
                <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                  {item.typeCount}
                </span>
                <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                  {item.name}
                </span>
              </div>
            </div>
          ))}

          {/* 페이크 아이템 추가 */}
          {/*
          <div className="flex min-h-[49px] w-full items-center justify-between gap-2 lg:hidden">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                ⚡️New
              </span>
              <span className="text-[12px] leading-[19.2px] text-[#999EA7]">
                {items[0].timeAgo}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="rounded-md border border-[#FFFFFF14] bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
                {items[0].type}
              </span>
              <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-1 text-[12px] font-medium leading-[16.8px]">
                {items[0].typeCount}
              </span>
              <span className="text-[14px] leading-[22.4px] text-[#E5E5E5]">
                {items[0].name}
              </span>
            </div>
          </div>
          */}

        </div>
      </div>

      {/* chart */}
      <div className="gap-4 rounded-xl border border-[#323233] bg-[#0A0A0A1A] p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <div>
              <span className="rounded-md border border-[#242424] bg-[#14141480] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#909296]">
                Squad Dashboard
              </span>
              <div className="flex items-center gap-2">
                <p className="text-[36px] font-medium leading-[43.2px] text-white">
                  
                  {squadName}

                </p>
                <span className="rounded-[100px] border border-[#1F1F1F] bg-[#0A0A0A4D] px-4 py-2 text-[16px] font-normal leading-[19.2px] text-[#8E9199]">
                  x2.5
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {squad === 'leader' && <SquadAttackModal />}

              <button
                className="hover_button"
                onClick={() => addToast('success', 'Squad link copied')}>
                Invite Squad
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:w-[800px] lg:flex-row">
            <div className="flex flex-1 flex-col gap-1 py-2">
              <p className="text-[14px] font-normal leading-[19.6px] text-[#737780]">
                Squad Point
              </p>
              <span className="text-[18px] font-medium leading-[25.2px] text-[#E5E5E5]">
                {
                  Number(squadPoint).toLocaleString()
                }
              </span>
            </div>
            <div className="hidden h-[65px] w-[1px] bg-[#323233] lg:block"></div>
            <div className="h-[1px] w-full bg-[#323233] lg:hidden"></div>
            <div className="flex flex-1 flex-col gap-1 py-2">
              <p className="text-[14px] font-normal leading-[19.6px] text-[#737780]">
                Squad Member
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-medium leading-[25.2px] text-[#E5E5E5]">
                  {
                    Number(squadMemberCount).toLocaleString()
                  }
                </span>
                <span className="rounded-[100px] bg-[#1D1E1F] px-2 py-1 text-[12px] font-medium leading-[15.6px] text-[#888E99]">
                  today {Number(squadMemberCountToday).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="hidden h-[65px] w-[1px] bg-[#323233] lg:block"></div>
            <div className="flex flex-1 flex-col gap-1 py-2">
              <p className="text-[14px] font-normal leading-[19.6px] text-[#737780]">
                Squad Rank
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-medium leading-[25.2px] text-[#E5E5E5]">
                  {
                    Number(squadRank).toLocaleString()
                  }
                </span>
                <div className="flex items-center">
                  <img src="/triangle.svg" />
                  <span className="text-[12px] font-normal leading-[16.8px] text-[#CC2929]">
                    2
                  </span>
                  <img src="/reverse_triangle.svg" />
                  <span className="text-[12px] font-normal leading-[16.8px] text-[#0078FF]">
                    2
                  </span>
                  <img src="/zero_bar.svg" />
                  <span className="text-[12px] font-normal leading-[16.8px] text-[#484A4D]">
                    0
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden h-[65px] w-[1px] bg-[#323233] lg:block"></div>

            <div className="flex flex-1 flex-col gap-1 py-2">
              <p className="text-[14px] font-normal leading-[19.6px] text-[#737780]">
                Nuclear
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-medium leading-[25.2px] text-[#E5E5E5]">
                  {
                    Number(nuclear).toLocaleString()
                  }
                </span>
                {squad === 'leader' && (
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button>
                        <img src="/circle_plus.svg" alt="circle plus" />
                      </button>
                    </Dialog.Trigger>
                    <NuclearModal />
                  </Dialog.Root>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="h-[300px] w-full">
          <SquadChart />
        </div>
      </div>

      {/* gpu & history  */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#323233] bg-[#0A0A0A] p-6 lg:w-[392px]">
          <div className="flex flex-col gap-4">
            <span className="self-start rounded-md bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
              My Virtual GPU
            </span>
            <span className="text-[32px] font-medium leading-[41.6px] text-white">
              {
                Number(virtualGpu).toLocaleString()
              }
            </span>
            <div className="flex gap-1">
              {Array.from({length: 43}).map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-1"
                  style={{
                    background:
                      index < gpuGage
                        ? 'linear-gradient(180deg, #E6E8EC 23.4%, #C1C5CE 77.66%)'
                        : '#FFFFFF1A',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#323233]"></div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="h-8 self-start rounded-md bg-[#1B1C1F] px-3 py-[5px] text-[16px] font-normal leading-[19.2px] text-[#999EA7]">
                
                {/*0h 0m 0s*/}
                {/* durationInSecond */}

                {
                  new Date(durationInSecond * 1000).toISOString().substr(11, 8)
                }


              </span>
              <p className="text-[14px] font-normal leading-[16.8px] text-[#5D6066]">
                Earn <span className="text-[#E5E5E5]">20</span> points per
                active
              </p>
            </div>

            {isLoading ? (
              <button
                className="h-12 w-36 rounded-lg bg-[#4A4B4D] p-2.5 text-center text-[16px] font-medium leading-[24px] text-[#010101]"
              >
                Activating...
              </button>
            ) : (
              <button
                disabled={gpuGage !== 43 || squad === 'leader'}
                className={`rounded-[100px] px-6 py-2.5 text-[16px] font-medium leading-[20.8px]
                  ${ (gpuGage !== 43 || squad === 'leader') ? 'border border-[#4A4B4D] bg-transparent text-[#999EA7]' : 'bg-white text-[#010101]'}`}
                onClick={handleActivateGpu}
              >
                
                Active
              </button>
            )}


          </div>
        </div>

        <SquadHistoryTable
          squadHistoryData={squadHistoryData}
        />

      </div>

      {/* tables */}
      <div className="mb-[46px] mt-8 flex flex-col gap-2 lg:mb-[185px] lg:flex-row lg:gap-4">
        
        <SquadLeaderboardTable
          squadLeaderboardData={squadLeaderboardData}
        />

        <PersonalLeaderboardTable
          personalLeaderboardData={personalLeaderboardData}
        />

      </div>
    </div>
  );
};

export default DashBoard;

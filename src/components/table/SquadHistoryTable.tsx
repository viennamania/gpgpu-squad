import {
  CellContext,
  FilterFnOption,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import StateTypeDropdown from '../squad/StateTypeDropdown';
import {useRecoilValue} from 'recoil';
import {squadState} from '../../atoms/squad';

import {useActiveAccount} from 'thirdweb/react';



import {
  useGetUserGpuId,
  useGetUserSquad,
} from '../../apis';

import {useEffect, useState} from 'react';




type TableData = {
  state: string;
  squad: string;
  content: string;
  date: Date;
};


interface SquadHistoryTablePropsType {
  squadHistoryData: TableData[];
}



const SquadHistoryTable = ({squadHistoryData}: SquadHistoryTablePropsType) => {

  const [stateType, setStateType] = useState('All');
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const squad = useRecoilValue(squadState);




  const address = useActiveAccount()?.address;

  ///const {data: userCode} = useAddUser({address});





  const [gpuId, setGpuId] = useState('');

  const {refetch: getGpuId} = useGetUserGpuId({address: address || ''});
  

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getGpuId();

      //console.log('getGpuId result===', result);

      if (result?.data?.gpuId) {
        
        ///setIsJoined(true);

      }


      setGpuId(result?.data?.gpuId || '');

      
    }

    address && fetch();


  }, [address]);


  const [squadName, setSquadName] = useState('');
  
  console.log('squdName======', squadName);



  const {refetch: getUserSquad, } = useGetUserSquad({address: address || ''});
  

  useEffect(() => {
    
    const fetch = async () => {
      const result = await getUserSquad();

      ///console.log('getUserSquad result===', result);

      if (result?.data?.squadName) {
        
        //setIsJoined(true);

        //setSquad('leader');

        

      }


      setSquadName(result?.data?.squadName || '');

      
    }


    address && fetch();


  }, [address]);




  const handleStateType = (type: string) => {
    setStateType(type);
  };




  const [tableData, setTableData] = useState([] as TableData[]);

  useEffect(() => {
    setTableData(squadHistoryData);
  } , [squadHistoryData]);


  /*
  const [tableData] = useState([
    {
      state: 'Attack',
      squad: 'Coingraph',
      content: '-300,000 points',
      date: new Date(),
    },
    {
      state: 'Damage',
      squad: 'Coingraph',
      content: '-80,000 points',
      date: new Date(),
    },
    {
      state: 'Purchase',
      squad: '-',
      content: '-80,000 points',
      date: new Date(),
    },
    {
      state: 'Join',
      squad: '-',
      content: 'Orange',
      date: new Date(),
    },
    {
      state: 'Join',
      squad: '-',
      content: 'Orange',
      date: new Date(),
    },
  ]);
  */


  const columns = [
    {
      accessorKey: 'state',
      header: 'State',
      cell: (props: CellContext<TableData, string>) => {
        return (
          <div className="flex h-[42px] w-[60px] items-center px-6 text-left text-[12px] leading-[14.4px] text-[#E5E5E5]">
            <p>{props.getValue()}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'squad',
      header: 'Sqaud',
      cell: (props: CellContext<TableData, string>) => (
        <div className="flex h-[42px] w-[168px] items-center px-5 text-right text-[12px] leading-[14.4px]">
          <p>{props.getValue()}</p>
        </div>
      ),
    },
    {
      accessorKey: 'content',
      header: 'Content',
      cell: (props: CellContext<TableData, string>) => (
        <div className="flex h-[42px] min-w-[400px] items-center px-4 text-left text-[12px] leading-[14.4px] lg:min-w-full">
          
          
            {/*props.getValue() is html string*/}

            <div dangerouslySetInnerHTML={{__html: props.getValue()}}></div>
          

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
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (props: CellContext<TableData, Date>) => {
        
        const date = props.getValue();

        //console.log('date====', date);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
        

        //const formattedDate = props.getValue().toLocaleString();

        return (
          <div className="flex h-[42px] w-auto items-center justify-end px-5 text-right text-[12px] leading-[14.4px]">
            <p>{formattedDate}</p>
          </div>
        );
      },
    },
  ];

  const globalFilterFn: FilterFnOption<TableData> = (
    row,
    _columnId,
    filterValue,
  ) => {
    const state = String(row.getValue('state'));

    if (filterValue === 'All') {
      return true;
    } else {
      return state === filterValue;
    }
  };

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {globalFilter: stateType},
    globalFilterFn,
  });

  return (
    <div className="flex flex-1 flex-col rounded-xl border border-[#323233] bg-[#0A0A0A]">
      <div className="flex justify-between px-6 py-5 pb-3 lg:pb-5">
        <div className="flex items-center gap-5">
          <p className="text-linear text-[20px] font-medium leading-[28px]">
            Squad History
          </p>
          <div className="hidden items-center gap-2 lg:flex">
            {['All', 'Attack', 'Damage', 'Purchase', 'Join'].map((type) => (
              <button
                key={type}
                onClick={() => handleStateType(type)}
                className={`rounded-[100px] px-3 py-[5px] text-[12px] font-medium leading-[16.8px] ${type === stateType ? 'bg-white text-[#010101]' : 'border border-[#FFFFFF14] bg-transparent text-[#999EA7]'}`}>
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium leading-[16.8px] text-[#E5E5E5]">
            {gpuId}
          </span>
          <span className="rounded-md bg-[#1A1A1A] px-2 py-1 text-[12px] font-medium leading-[16.8px] text-[#999EA7]">
            {squad === 'member' ? 'Member' : 'Leader'}
          </span>
        </div>
      </div>
      <div className="block px-6 pb-[21px] lg:hidden">
        <StateTypeDropdown
          isShowDropdown={isShowDropdown}
          setIsShowDropdown={setIsShowDropdown}
          stateType={stateType}
          setStateType={setStateType}
        />
      </div>
      <div className="no-scrollbar flex-1 overflow-auto">
        <table className="w-full">
          <thead className="table h-[46px] w-full border-b border-t border-[#323233] text-xs font-medium leading-[14.4px] text-[#737780]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-4 text-left ${header.index === 0 && 'w-[100px]'} ${header.index === 1 && 'w-[128px]'} ${header.index === 2 && 'w-auto'} ${header.index === 3 && 'w-auto text-right'}`}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="block h-[171px] overflow-y-auto overflow-x-hidden text-left text-xs font-medium leading-[14.4px] text-[#737780]">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, index, arr) => (
                <tr
                  key={row.id}
                  className={`w-full table-fixed ${arr.length - 1 !== index ? 'border-b border-[#1E1E1F]' : ''} `}>
                  {row.getVisibleCells().map((cell, i) => (
                    <td
                      key={cell.id}
                      className={`${i === 0 && 'w-[100px]'} ${i === 1 && 'w-[128px]'} ${i === 2 && 'w-full'} ${i === 3 && 'flex w-[180px] justify-end'} `}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="w-full py-10 text-center text-xs font-medium text-[#FFFFFF]"
                  colSpan={4}>
                  No history
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SquadHistoryTable;

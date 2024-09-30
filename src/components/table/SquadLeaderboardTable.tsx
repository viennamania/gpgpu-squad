import {
  CellContext,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {useEffect, useState} from 'react';
import Pagination from './Pagination';

type TableData = {
  rank: number;
  name: string;
  leader: string;
  member: number;
  totalPoint: number;
  multiple: number;
};



interface SquadLeaderboardTablePropsType {
  squadLeaderboardData: TableData[];
}

const SquadLeaderboardTable = ({squadLeaderboardData}: SquadLeaderboardTablePropsType) => {

  const [currentPage, setCurrentPage] = useState(1);


  console.log('squadLeaderboardData===', squadLeaderboardData);
  

  ///const [tableData] = useState(squadLeaderboardData);

  const [tableData, setTableData] = useState([] as TableData[]);

  useEffect(() => {
    setTableData(squadLeaderboardData);
  } , [squadLeaderboardData]);


  console.log('tableData===', tableData);


  /*
  const [tableData] = useState([
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
  ]);
  */

  const columns = [
    {
      accessorKey: 'rank',
      header: 'Rank',
      cell: (props: CellContext<TableData, number>) => {
        const color =
          props.row.index === 0
            ? 'text-[#3676F8]'
            : props.getValue() === 1
              ? 'text-[#FBC56D]'
              : props.getValue() === 2
                ? 'text-[#AAC8D0]'
                : props.getValue() === 3
                  ? 'text-[#B77C7E]'
                  : 'text-white';
        return (
          <div className="relative w-[42px] px-[21.5px] py-5 text-center lg:min-w-[72px]">
            {props.row.index === 0 && (
              <>
                <div
                  className={`absolute left-0 top-[50%] h-6 w-[1px] -translate-y-1/2 bg-[#3676F8]`}></div>
                <div
                  style={{
                    background:
                      'linear-gradient(90deg, #3676F8 0%, rgba(54, 118, 248, 0) 100%)',
                  }}
                  className="absolute left-0 top-0 h-full w-[163px] opacity-[10%]"></div>
              </>
            )}
            {props.getValue() === 1 && (
              <>
                <div
                  className={`absolute left-0 top-[50%] h-6 w-[1px] -translate-y-1/2 bg-[#FBC56D]`}></div>
                <div
                  style={{
                    background:
                      'linear-gradient(294.71deg, rgba(254, 240, 174, 0) 15.76%, #FBC56D 84.24%)',
                  }}
                  className="absolute left-0 top-0 h-full w-[163px] opacity-[10%]"></div>
              </>
            )}
            {props.getValue() === 2 && (
              <>
                <div
                  className={`absolute left-0 top-[50%] h-6 w-[1px] -translate-y-1/2 bg-[#AAC8D0]`}></div>
                <div
                  style={{
                    background:
                      'linear-gradient(90deg, #AAC8D0 0%, rgba(170, 200, 208, 0) 100%)',
                  }}
                  className="absolute left-0 top-0 h-full w-[163px] opacity-[10%]"></div>
              </>
            )}
            {props.getValue() === 3 && (
              <>
                <div
                  className={`absolute left-0 top-[50%] h-6 w-[1px] -translate-y-1/2 bg-[#B77C7E]`}></div>
                <div
                  style={{
                    background:
                      'linear-gradient(90deg, #B77C7E 0%, rgba(183, 124, 126, 0) 100%)',
                  }}
                  className="absolute left-0 top-0 h-full w-[163px] opacity-[10%]"></div>
              </>
            )}
            <p className={`${color}`}>{props.getValue()}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (props: CellContext<TableData, string>) => {
        return (
          <div className="px-[21.5px] py-4 text-left lg:min-w-[52px]">
            <p className={props.row.index === 0 ? 'text-white' : ''}>
              {props.getValue()}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'leader',
      header: 'Leader',
      cell: (props: CellContext<TableData, string>) => (
        <div className="px-[21.5px] py-4 text-left">
          <p className={props.row.index === 0 ? 'text-white' : ''}>
            {props.getValue()}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'member',
      header: 'Member',
      cell: (props: CellContext<TableData, number>) => {
        return (
          <div className="w-[92px] px-[21.5px] py-4 text-left lg:min-w-[140px]">
            <p className={props.row.index === 0 ? 'text-white' : ''}>
              {
                props.getValue().toLocaleString()
              }
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'totalPoint',
      header: 'Total Point',
      cell: (props: CellContext<TableData, number>) => {
        return (
          <div className="w-[92px] px-[21.5px] py-4 text-left lg:min-w-[220px]">
            <p className={props.row.index === 0 ? 'text-white' : ''}>
              {props.getValue().toLocaleString()}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'multiple',
      header: 'Multiple',
      cell: (props: CellContext<TableData, number>) => {
        return (
          <div className="flex justify-end px-[21.5px] py-4 text-right lg:min-w-[100px]">
            <p className="rounded-md bg-[#FFFFFF1A] px-1.5 py-1 text-[12px] font-medium leading-[14.4px] text-[#BBC1CC]">
              x{props.getValue().toLocaleString()}
            </p>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-3">
        <div className="rounded-lg border border-[#323233]">
          <div className="px-6 py-5">
            <p className="text-linear text-[20px] font-medium leading-[28px]">
              Squad Leaderboard
            </p>
          </div>
          <div className="no-scrollbar overflow-auto">
            <table className="w-full">
              <thead className="border-y border-[#323233] text-xs font-medium leading-[14.4px] text-[#737780]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-[21.5px] py-4 ${header.index === 5 ? 'text-right' : 'text-left'}`}>
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

              <tbody className="text-left text-xs font-medium leading-[14.4px] text-[#737780]">
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={index % 2 === 1 ? 'bg-[#171717]' : ''}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-0">
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
                      It's a squad that doesn't exist
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.floor(tableData.length / 10) + 1}
        className="my-8"
      />
    </div>
  );
};

export default SquadLeaderboardTable;

import {
  CellContext,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Pagination from './Pagination';

type TableData = {
  rank: number;
  name: string;
  leader: string;
  member: number;
  radio: boolean;
};

interface SquadListTablePropsType {
  setApplyState: Dispatch<SetStateAction<'valid' | 'invalid' | 'default'>>;
}

const SquadListTable = ({setApplyState}: SquadListTablePropsType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([
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
  ]);

  useEffect(() => {
    const find = tableData.find((data) => data.radio);
    if (find) {
      setApplyState('valid');
    } else {
      setApplyState('default');
    }
  }, [tableData, setApplyState]);

  const columns = [
    {
      accessorKey: 'rank',
      header: 'Rank',
      cell: (props: CellContext<TableData, number>) => {
        const color =
          props.getValue() === 1
            ? 'text-[#FBC56D]'
            : props.getValue() === 2
              ? 'text-[#AAC8D0]'
              : props.getValue() === 3
                ? 'text-[#B77C7E]'
                : 'text-[#999EA7]';
        return (
          <div className="relative w-[42px] p-5 text-right lg:min-w-[72px]">
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
            <p className={`text-center ${color}`}>{props.getValue()}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (props: CellContext<TableData, string>) => {
        return (
          <div className="p-4 text-left lg:min-w-[52px]">
            <p>{props.getValue()}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'leader',
      header: 'Leader',
      cell: (props: CellContext<TableData, string>) => (
        <div className="p-4 text-left text-[#FFFFFF]">
          <p>{props.getValue()}</p>
        </div>
      ),
    },
    {
      accessorKey: 'member',
      header: 'Member',
      cell: (props: CellContext<TableData, number>) => {
        return (
          <div className="w-[92px] p-4 text-right lg:min-w-[200px]">
            <p>{props.getValue().toLocaleString()}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'radio',
      header: '',
      cell: (props: CellContext<TableData, number>) => {
        return props.getValue() ? (
          <div className="w-10 text-center lg:min-w-[72px]">
            <button
              onClick={() => {
                setTableData((prev) => {
                  return prev.map((item, idx) => {
                    if (idx === props.row.index) {
                      return {...item, radio: true};
                    } else {
                      return {...item, radio: false};
                    }
                  });
                });
              }}>
              <img src="/radio_selected.svg" />
            </button>
          </div>
        ) : (
          <div className="w-10 text-center lg:min-w-[72px]">
            <button
              onClick={() => {
                setTableData((prev) => {
                  return prev.map((item, idx) => {
                    if (idx === props.row.index) {
                      return {...item, radio: true};
                    } else {
                      return {...item, radio: false};
                    }
                  });
                });
              }}>
              <img src="/radio.svg" />
            </button>
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
    <div className="rounded-xl border border-[#323233] p-6 px-0 lg:w-[700px]">
      <p className="text-linear px-4 pb-5 text-[20px] font-medium leading-[28px]">
        List of Squad
      </p>

      <div className="flex flex-col gap-3 px-6">
        <div className="flex gap-1 rounded-lg border border-[#40444B] p-3">
          <img src="/search.svg" width={24} height={24} alt="search svg" />
          <input
            className="w-full bg-transparent text-[16px] leading-[25.6px] placeholder-[#FFFFFF33] outline-none"
            placeholder="Search"></input>
        </div>

        <div className="no-scrollbar overflow-auto rounded-lg border border-[#323233]">
          <table className="w-full">
            <thead className="border-b border-[#323233] text-xs font-medium leading-[14.4px] text-[#737780]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`p-4 px-[6.5px] ${header.index === 3 || header.index === 4 ? 'text-right' : header.index === 2 || header.index === 1 ? 'text-left' : 'text-center'}`}>
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

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.floor(tableData.length / 10) + 1}
        className="mt-6"
      />
    </div>
  );
};

export default SquadListTable;

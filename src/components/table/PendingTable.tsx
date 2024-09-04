import {
  CellContext,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {useState} from 'react';

type Time = {
  day: number;
  hours: number;
  mins: number;
};

type TableData = {
  status: string;
  quantity: string;
  firstClaim: string;
  time: Time;
};

const tableData = [
  {
    status: 'Proceeding',
    quantity: '10,563,356.26',
    firstClaim: '10,563,356.26(62.5%)',
    time: {
      day: 29,
      hours: 16,
      mins: 46,
    },
  },
  {
    status: 'Proceeding',
    quantity: '10,563,356.26',
    firstClaim: '10,563,356.26(62.5%)',
    time: {
      day: 29,
      hours: 16,
      mins: 46,
    },
  },
  {
    status: 'Completed',
    quantity: '10,563,356.26',
    firstClaim: '10,563,356.26(62.5%)',
    time: {
      day: 29,
      hours: 16,
      mins: 46,
    },
  },

  /* ... */
];

const PendingTable = () => {
  const [data] = useState([...tableData]);

  const columns = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (props: CellContext<TableData, string>) => (
        <div className="flex gap-2.5">
          <img
            src={
              props.getValue() === 'Proceeding'
                ? '/proceeding.svg'
                : '/completed.svg'
            }
            width={12}
            height={12}
            alt={props.getValue() + ' icon'}
          />
          <p>{props.getValue()}</p>
        </div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: (props: CellContext<TableData, string>) => (
        <p>{props.getValue()}</p>
      ),
    },
    {
      accessorKey: 'firstClaim',
      header: 'First claim',
      cell: (props: CellContext<TableData, string>) => (
        <p>{props.getValue()}</p>
      ),
    },
    {
      accessorKey: 'time',
      header: 'Time',
      cell: (props: CellContext<TableData, Time>) => (
        <span>
          <span className="text-xs font-medium leading-[14.4px] text-[#FFFFFF]">
            {props.getValue().day}
          </span>
          D{' '}
          <span className="text-xs font-medium leading-[14.4px] text-[#FFFFFF]">
            {props.getValue().hours}
          </span>
          Hrs{' '}
          <span className="text-xs font-medium leading-[14.4px] text-[#FFFFFF]">
            {props.getValue().mins}
          </span>
          Mins
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="no-scrollbar overflow-auto">
      <table className="max-w-[1200px]">
        <thead className="border-b border-t border-[#323233] text-left text-xs font-medium leading-[14.4px] text-[#737780]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="min-w-[300px] p-4">
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
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="min-w-[300px] p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default PendingTable;

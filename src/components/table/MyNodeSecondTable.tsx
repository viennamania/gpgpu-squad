import {
  CellContext,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {useState} from 'react';

//import {useWsPrice} from '../../contexts/WsProvider';
//import useContractTotalSupply from '../../hooks/useContractTotalSupply';
import {TierData, TierDataTypes} from '../../constants/tiers';

// const TotalSupplyCell = ({tier}: {tier: number}) => {
//   const {totalSupply, isLoading} = useContractTotalSupply(tier - 1);
//   return (
//     <div className="w-full p-4 text-right">
//       <p>{isLoading ? '-' : totalSupply}</p>
//     </div>
//   );
// };

// const PriceCell = ({sellPrice}: {sellPrice: number}) => {
//   const {price} = useWsPrice();
//   return (
//     <div className="w-full min-w-[100px] p-4 text-center text-[#979899]">
//       <p>{price ? (price * sellPrice).toLocaleString() : '-'}</p>
//     </div>
//   );
// };

const MyNodeSecondTable = () => {
  const [data] = useState([...TierData]);

  const columns = [
    {
      accessorKey: 'tier',
      header: 'Tier',
      cell: (props: CellContext<TierDataTypes, string>) => (
        <div className="w-full min-w-[54px] p-4 text-right">
          <p className="text-center">{props.getValue()}</p>
        </div>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price (ETH)',
      cell: (props: CellContext<TierDataTypes, number>) => (
        <div className="w-full min-w-[100px] p-4 text-left">
          <p>{props.getValue()}</p>
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (props: CellContext<TierDataTypes, number>) => (
        <div className="w-full min-w-[100px] p-4 text-left">
          <p>{props.getValue()}</p>
        </div>
      ),
    },
    {
      accessorKey: 'whitelist',
      header: 'Whitelist',
      cell: (props: CellContext<TierDataTypes, number>) => (
        <div className="w-full min-w-[100px] p-4 text-right text-[#979899]">
          <p>{props.getValue()}</p>
        </div>
      ),
    },
    {
      accessorKey: 'walletPerCap',
      header: 'Wallet per Cap',
      cell: (props: CellContext<TierDataTypes, number>) => (
        <div className="w-full min-w-[80px] p-4 text-right">
          <p>{props.getValue() ?? 'Unlimited'}</p>
        </div>
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
      <table className="w-full">
        <thead className="border-b border-[#323233] text-xs font-medium leading-[14.4px] text-[#737780]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`p-4 ${header.index === 3 || header.index === 4 ? 'text-right' : header.index === 1 ? 'text-left' : 'text-center'}`}>
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

        <tbody className="text-left text-xs font-medium leading-[14.4px] text-[#A6A9AD]">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? 'bg-[#010101]' : 'bg-[#171717]'}`}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
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
                No transaction history
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyNodeSecondTable;

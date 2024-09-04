import {
  CellContext,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import useContractGetOwnedNfts from '../../hooks/useContractGetOwnedNfts';
import {NFT} from 'thirdweb';
import {TierData} from '../../constants/tiers';

type NftType = NFT & {
  quantityOwned: bigint;
};

const MyNodeFirstTable = () => {
  const {nfts} = useContractGetOwnedNfts();

  const columns = [
    {
      accessorKey: 'id',
      header: 'Tier',
      cell: (props: CellContext<NftType, bigint>) => (
        <div className="w-full min-w-[54px] p-4 text-right">
          <p className="text-center text-[#A6A9AD]">
            {Number(props.getValue()) + 1}
          </p>
        </div>
      ),
    },
    {
      header: 'Price (ETH)',
      cell: (props: CellContext<NftType, bigint>) => {
        const tier = props.row.original.id;
        return (
          <div className="w-full min-w-[120px] p-4 text-left">
            <p>{TierData[Number(tier)].price}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'quantityOwned',
      header: 'Amount',
      cell: (props: CellContext<NftType, bigint>) => (
        <div className="w-full p-4 text-right text-[#FFFFFF]">
          <p>{Number(props.getValue())}</p>
        </div>
      ),
    },
    {
      header: 'Total (ETH)',
      cell: (props: CellContext<NftType, bigint>) => {
        const tier = props.row.original.id;
        const quantityOwned = Number(props.row.original.quantityOwned);
        const price = TierData[Number(tier)].price;

        return (
          <div className="w-full min-w-[100px] p-4 text-right">
            <p>{quantityOwned * parseFloat(price)}</p>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: nfts ? nfts : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="no-scrollbar overflow-auto">
      <table className="w-full">
        <thead className="border-b border-t border-[#323233] text-xs font-medium leading-[14.4px] text-[#737780]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`p-4 ${header.index === 2 || header.index === 3 || header.index === 4 ? 'text-right' : header.index === 1 ? 'text-left' : 'text-center'}`}>
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
          {nfts && table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
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

export default MyNodeFirstTable;

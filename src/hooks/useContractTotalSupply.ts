//import {useEffect} from 'react';
import {useReadContract} from 'thirdweb/react';

import useGetContract from './useGetContract';

const useContractTotalSupply = (tier: number) => {
  const {contract} = useGetContract();
  const {data: totalSupply, isLoading} = useReadContract({
    contract,
    method: 'function totalSupply(uint256) view returns (uint256)',
    params: [BigInt(tier)],
  });

  return {totalSupply: Number(totalSupply), isLoading};
};

export default useContractTotalSupply;

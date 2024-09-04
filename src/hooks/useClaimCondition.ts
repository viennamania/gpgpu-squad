import {useReadContract} from 'thirdweb/react';

import useGetContract from './useGetContract';

const useClaimCondition = () => {
  const {contract} = useGetContract();
  const {data, isLoading} = useReadContract({
    contract,
    method: 'function maxTotalSupply(uint256 id) view returns (uint256)',
    params: [0n],
  });
  // const {data, isLoading} = useReadContract(claimCondition, {
  //   contract,
  //   tokenId: 4n,
  // });

  return {condition: data, isLoading};
};

export default useClaimCondition;

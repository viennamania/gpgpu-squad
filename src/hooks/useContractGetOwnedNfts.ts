import {useActiveAccount, useReadContract} from 'thirdweb/react';
import {getOwnedNFTs} from 'thirdweb/extensions/erc1155';

import useGetContract from './useGetContract';

const useContractGetOwnedNfts = () => {
  const {contract} = useGetContract();
  const address = useActiveAccount()?.address;
  const {data, isLoading} = useReadContract(getOwnedNFTs, {
    contract,
    address: address ?? '',
  });

  return {nfts: data, isLoading};
};

export default useContractGetOwnedNfts;

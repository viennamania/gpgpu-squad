import {createThirdwebClient, getContract} from 'thirdweb';

const chain = {id: 42161, rpc: 'https://arb1.arbitrum.io/rpc'};

const client = createThirdwebClient({
  secretKey:
    'OL5oYOl6XuCI3IXvB6je_R9ZQIKl_grR8l519NMbCmwfKvgk3HN97s_A38YEwXOzXl4f9MIyUz33o_Adnifv0A',
});

export const nftContractAddress = '0x3639D871E74880333763BEeF866b4a5C50D68aB9';

const useGetContract = () => {
  const contract = getContract({
    client,
    chain,
    address: nftContractAddress,
  });
  return {contract};
};

export default useGetContract;

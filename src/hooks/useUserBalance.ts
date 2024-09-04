import {createThirdwebClient} from 'thirdweb';
import {useActiveAccount, useWalletBalance} from 'thirdweb/react';

const chain = {id: 42161, rpc: 'https://arb1.arbitrum.io/rpc'};

const client = createThirdwebClient({
  clientId: '9e701c1b898b257555977e987c3100d0',
});

const useUserBalance = () => {
  const address = useActiveAccount()?.address;

  const {data: balance, isLoading} = useWalletBalance({
    chain,
    address,
    client,
  });

  return {
    balance: balance
      ? Number(balance.value) / Math.pow(10, balance.decimals)
      : 0,
    isLoading,
  };
};

export default useUserBalance;

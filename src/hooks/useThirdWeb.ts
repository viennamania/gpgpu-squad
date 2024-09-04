import {createThirdwebClient} from 'thirdweb';
import {
  useActiveWallet,
  useConnectModal,
  useAutoConnect,
  useDisconnect,
} from 'thirdweb/react';
import {createWallet, walletConnect} from 'thirdweb/wallets';

const chain = {id: 42161, rpc: 'https://arb1.arbitrum.io/rpc'};

const wallets = [
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  walletConnect(),
];

const client = createThirdwebClient({
  clientId: '9e701c1b898b257555977e987c3100d0',
});

const useThirdWeb = () => {
  useAutoConnect({client, wallets});
  const {connect} = useConnectModal();
  const {disconnect} = useDisconnect();
  const wallet = useActiveWallet();

  const connectWallet = async () => {
    await connect({
      chain,
      client,
      wallets,
      size: 'compact',
      showThirdwebBranding: false,
    });
  };

  const disconnectWallet = () => {
    if (wallet) {
      disconnect(wallet);
    }
  };

  return {wallet, connectWallet, disconnectWallet};
};

export default useThirdWeb;

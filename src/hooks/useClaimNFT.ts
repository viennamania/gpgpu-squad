import {useRecoilValue} from 'recoil';
import {useActiveAccount, useSendTransaction} from 'thirdweb/react';
import {claimTo} from 'thirdweb/extensions/erc1155';
import {useQueryClient} from '@tanstack/react-query';

import useGetContract from './useGetContract';
import {formState} from '../atoms/form';
import {useUserClaimedInfo} from '../apis';
import {tierState} from '../atoms/tier';
import useToast from '../hooks/useToast';

const useClaimNFT = () => {
  const queryClient = useQueryClient();
  const {addToast} = useToast();

  const form = useRecoilValue(formState);
  const tier = useRecoilValue(tierState);

  const account = useActiveAccount();
  const {contract} = useGetContract();
  const {mutateAsync, isPending} = useUserClaimedInfo();
  const {mutate: sendTransaction, isPending: isSending} = useSendTransaction();

  const claimNft = async (tokenId: number, quantity: number) => {
    if (account) {
      const transaction = claimTo({
        contract,
        to: account.address,
        tokenId: BigInt(tokenId),
        quantity: BigInt(quantity),
      });
      sendTransaction(transaction, {
        onSuccess: async () => {
          const param = {
            address: account.address,
            tokenId: String(tier),
            quantity: String(form.amount),
            referralCode: form.isCodeChecked ? form.code : '',
          };

          const result = await mutateAsync(param);
          if (result.data.message === 'Success') {
            //            console.log(result);
            queryClient.refetchQueries({queryKey: ['getClaimNft']});
            addToast('success', 'Claim successful.');
          }
        },
        onError: (error) => {
          console.log(error.name, error.message);
          addToast('fail', 'Claim failed.');
        },
      });
    }
  };

  return {claimNft, isLoading: isPending || isSending};
};

export default useClaimNFT;

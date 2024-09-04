import {useMutation, UseMutationResult, useQuery} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {instance} from './instance';
import useToast from '../hooks/useToast';

interface AddUserParamsType {
  address?: string;
}

export const useAddUser = (params: AddUserParamsType) => {
  const addUser = (params: AddUserParamsType) =>
    instance.get('/addUser', {params});

  return useQuery({
    queryKey: ['addUser', params.address],
    queryFn: () => addUser({address: params.address}),
    select: (data) => data.data.userCode,
    enabled: !!params.address,
  });
};

type CheckUserResponse = {
  message: string;
  userCode: string;
};

export const useCheckUserByCode = (params: {code: string}) => {
  const checkUserByCode = async (params: {code: string}) => {
    const response = await instance.get<CheckUserResponse>('/checkUserByCode', {
      params,
    });
    return response.data;
  };

  return useQuery<CheckUserResponse, Error>({
    queryKey: ['checkUserByCode', params.code],
    queryFn: () => checkUserByCode({code: params.code}),
    select: (data) => data,
    enabled: false,
    retry: 0,
  });
};

interface CheckWhitelistParamsType {
  address?: string;
}

export const useCheckWhitelist = (params: CheckWhitelistParamsType) => {
  const checkWhitelist = (params: CheckWhitelistParamsType) =>
    instance.get('/checkWhiteList', {params});
  return useQuery({
    queryKey: ['checkWhitelist', params.address],
    queryFn: () => checkWhitelist({address: params.address}),
    select: (data) => data.data.exist,
    enabled: !!params.address,
  });
};

export const useAddWhiteList = () => {
  const {addToast} = useToast();

  const addWhitelist = (params: CheckWhitelistParamsType) =>
    instance.get('/addWhiteList', {params});
  return useMutation({
    mutationFn: (params: CheckWhitelistParamsType) => addWhitelist(params),
    onSuccess: (data) => {
      addToast('success', data.data.message);
    },
  });
};

export const useRemoveWhiteList = () => {
  const {addToast} = useToast();
  const removeWhiteList = (params: CheckWhitelistParamsType) =>
    instance.get('/removeWhiteList', {params});
  return useMutation({
    mutationFn: (params: CheckWhitelistParamsType) => removeWhiteList(params),
    onSuccess: (data) => {
      addToast('success', data.data.message);
    },
  });
};

interface SalesAmountParamsType {
  tier: number;
}

export const useSalesAmount = (params: SalesAmountParamsType) => {
  const getSalesAmount = (params: SalesAmountParamsType) =>
    instance.get('/getSaleAmountByTier', {params});
  return useQuery({
    queryKey: ['getSalesAmount', params.tier],
    queryFn: () => getSalesAmount({tier: params.tier}),
    select: (data) => data.data,
  });
};

export const useClaimedAmount = () => {
  const getClaimNft = () => instance.get('/getClaimNfts');
  return useQuery({
    queryKey: ['getClaimNft'],
    queryFn: () => getClaimNft(),
    select: (data) => data.data.data,
  });
};

interface UserClaimedParamsType {
  address: string;
  tokenId: string;
  quantity: string;
  referralCode: string;
}

interface UserClaimedResponse {
  message: string;
}

export const useUserClaimedInfo = (): UseMutationResult<
  AxiosResponse<UserClaimedResponse>,
  AxiosError<{message: string}>,
  UserClaimedParamsType
> => {
  const userClaimedInfo = async (
    params: UserClaimedParamsType,
  ): Promise<AxiosResponse<UserClaimedResponse>> => {
    return await instance.get<UserClaimedResponse>('/claimNft', {
      params,
    });
  };

  return useMutation<
    AxiosResponse<UserClaimedResponse>,
    AxiosError<{message: string}>,
    UserClaimedParamsType
  >({
    mutationFn: (params: UserClaimedParamsType) => userClaimedInfo(params),
  });
};

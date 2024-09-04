import {atom} from 'recoil';

export const formState = atom<{
  code: string;
  isCodeChecked: boolean;
  amount: number;
  maxAmount: number;
}>({
  key: 'formState',
  default: {
    code: '',
    isCodeChecked: false,
    amount: 0,
    maxAmount: 0,
  },
});

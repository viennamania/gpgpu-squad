import {atom} from 'recoil';

export const tierState = atom<number>({
  key: 'tierState',
  default: 0,
});

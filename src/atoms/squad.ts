import {atom} from 'recoil';

export const squadState = atom<'member' | 'leader'>({
  key: 'squadType',
  default: 'member',
});
export const joinState = atom<boolean>({
  key: 'joinState',
  default: false,
});

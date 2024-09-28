import {atom} from 'recoil';

export const squadState = atom<'' | 'member' | 'leader'>({
  key: 'squadType',
  default: '',
});
export const joinState = atom<boolean>({
  key: 'joinState',
  default: false,
});

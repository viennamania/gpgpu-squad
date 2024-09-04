import {atom} from 'recoil';

interface ToastMessage {
  type: 'success' | 'fail';
  id: string;
  message: string;
}

export const toastState = atom<ToastMessage[]>({
  key: 'toastState',
  default: [],
});

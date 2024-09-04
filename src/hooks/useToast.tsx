import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {v4 as uuidv4} from 'uuid';

import {toastState} from '../atoms/toast';
interface ToastMessage {
  type: 'success' | 'fail';
  id: string;
  message: string;
}

const useToast = () => {
  const [toasts, setToasts] = useRecoilState<ToastMessage[]>(toastState);

  const addToast = useCallback(
    (type: 'success' | 'fail', message: string) => {
      setToasts((prevToasts) => [...prevToasts, {id: uuidv4(), message, type}]);
    },
    [setToasts],
  );

  const removeToast = useCallback(
    (id: string) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    },
    [setToasts],
  );

  return {
    toasts,
    addToast,
    removeToast,
  };
};

export default useToast;

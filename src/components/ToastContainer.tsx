import Toast from './Toast';
import {useRecoilValue} from 'recoil';
import {toastState} from '../atoms/toast';
import useToast from '../hooks/useToast';

const ToastContainer = () => {
  const toasts = useRecoilValue(toastState);
  const {removeToast} = useToast();
  return (
    <div>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

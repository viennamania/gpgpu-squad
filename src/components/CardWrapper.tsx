import {ReactNode} from 'react';

interface CardWrapperPropsType {
  children: ReactNode;
  className?: string;
}

const CardWrapper = ({children, className = ''}: CardWrapperPropsType) => {
  return (
    <div
      className={
        'w-full rounded-xl border border-[#323233] bg-[#0A0A0A] p-6 ' +
        className
      }>
      {children}
    </div>
  );
};

export default CardWrapper;

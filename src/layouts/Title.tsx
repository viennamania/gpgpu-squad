import {useLocation} from 'react-router-dom';

interface TitlePropsType {
  title: string;
  subtitle: string;
}

const Title = ({title, subtitle}: TitlePropsType) => {
  const location = useLocation();
  return (
    <header
      className={`border-y border-[#323233] bg-[${location.pathname === '/squad' ? '#0A0A0A1A' : '0A0A0A'}] px-6 py-8`}>
      <div className="mx-auto max-w-[1200px] justify-between">
        <h1 className="text-linear text-[32px] font-medium leading-[38.4px]">
          {title}
        </h1>
        <h2 className="text-[14px] leading-[19.6px] text-[#8E9199]">
          {subtitle}
        </h2>
      </div>
    </header>
  );
};

export default Title;

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import useInterval from '../hooks/useInterval';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export const whitelistDateDefault = '2024-07-20T19:29:00Z';
export const publicDateDefault = '2024-07-28T19:30:00Z';

interface SalePeriodContextType {
  period: 'pre' | 'whitelist' | 'public' | undefined;
  d: string;
  h: string;
  m: string;
  s: string;
  formattedDate: string;
  whitelistDate: string;
  publicDate: string;
  setWhitelistDate: (date: string) => void;
  setPublicDate: (date: string) => void;
}

interface SalePeriodProviderProps {
  children: ReactNode;
}

const SalePeriodContext = createContext<SalePeriodContextType | undefined>(
  undefined,
);

const SalePeriodProvider: FC<SalePeriodProviderProps> = ({children}) => {
  const [period, setPeriod] = useState<'pre' | 'whitelist' | 'public'>();
  const [d, setD] = useState('');
  const [h, setH] = useState('00');
  const [m, setM] = useState('00');
  const [s, setS] = useState('00');
  const [formattedDate, setFormattedDate] = useState('');
  const [whitelistDate, setWhitelistDate] = useState(whitelistDateDefault);
  const [publicDate, setPublicDate] = useState(publicDateDefault);

  useEffect(() => {
    const updatePeriod = () => {
      const now = dayjs().utc(true);
      const whitelist = dayjs(whitelistDate).utc(false);
      const publicSale = dayjs(publicDate).utc(false);

      if (now.isBefore(whitelist)) {
        setPeriod('pre');
      } else if (now.isAfter(whitelist) && now.isBefore(publicSale)) {
        setPeriod('whitelist');
      } else {
        setPeriod('public');
      }
    };

    updatePeriod();
    const interval = setInterval(updatePeriod, 1000);
    return () => clearInterval(interval);
  }, [publicDate, whitelistDate]);

  useInterval(
    () => {
      const now = dayjs().utc(true);

      const whitelist = dayjs(whitelistDate).utc(false);
      const timeDiff = whitelist.diff(now, 'second');
      const seconds = Math.max(timeDiff, 0);

      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);

      const dDisplay = d > 0 ? `${d}d` : '';
      setD(dDisplay);
      const hDisplay = h >= 10 ? `${h}` : `0${h}`;
      setH(hDisplay);
      const mDisplay = m >= 10 ? `${m}` : `0${m}`;
      setM(mDisplay);
      const sDisplay = s >= 10 ? `${s}` : `0${s}`;
      setS(sDisplay);
      const formatted = whitelist.format('MMMM Do');
      setFormattedDate(formatted);
    },
    period === 'pre' ? 1000 : null,
  );

  return (
    <SalePeriodContext.Provider
      value={{
        period,
        d,
        h,
        m,
        s,
        formattedDate,
        whitelistDate,
        publicDate,
        setWhitelistDate,
        setPublicDate,
      }}>
      {children}
    </SalePeriodContext.Provider>
  );
};

export const useSalePeriod = (): SalePeriodContextType => {
  const context = useContext(SalePeriodContext);
  if (context === undefined) {
    throw new Error('useWsPrice must be used within a WsProvider');
  }
  return context;
};

export default SalePeriodProvider;

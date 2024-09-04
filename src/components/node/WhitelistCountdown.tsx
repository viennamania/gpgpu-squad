import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import {useSalePeriod} from '../../contexts/SalePeriodProvider';

dayjs.extend(utc);

const WhitelistCountdown = () => {
  const {d, h, m, s, formattedDate} = useSalePeriod();
  return (
    <>
      <span className="text-[20px] font-[350] leading-[28px] -tracking-[0.05em] text-[#CCCCCC]">
        {d && (
          <>
            {d}
            <span className="text-[#43464D]">:</span>
          </>
        )}{' '}
        {h}h <span className="text-[#43464D]">:</span> {m}m{' '}
        <span className="text-[#43464D]">: {s}s</span>
      </span>
      <p className="leading-[22.4px] text-[#8E9199]">
        Whitelist Node Sale begins on {formattedDate}
      </p>
    </>
  );
};

export default WhitelistCountdown;

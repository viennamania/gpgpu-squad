import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import CustomDot from './CustomDot';
import {useState} from 'react';

interface CustomTooltipProps extends TooltipProps<number, string> {
  dotPosition: {
    cx: number;
    cy: number;
  };
}

const data = [
  {
    name: 'A',
    value: 5000,
  },
  {
    name: 'B',
    value: 4300,
  },
  {
    name: 'C',
    value: 3600,
  },
  {
    name: 'D',
    value: 4000,
  },
  {
    name: 'E',
    value: 5000,
  },
  {
    name: 'F',
    value: 4800,
  },
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  dotPosition,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[100px] border-[1.5px] px-3 py-1"
        style={{
          background:
            'linear-gradient(0deg, #F8F8F803, rgba(248, 248, 248, 0.01), #F8F8F803, rgba(248, 248, 248, 0.01)),linear-gradient(0deg, #1212124D, rgba(18, 18, 18, 0.3), #1212124D, rgba(18, 18, 18, 0.3))',
          borderImageSource:
            'linear-gradient(158.39deg, rgba(255, 255, 255, 0.1) 14.19%, rgba(255, 255, 255, 2.5e-05) 50.59%, rgba(255, 255, 255, 2.5e-05) 68.79%, rgba(255, 255, 255, 0.025) 105.18%)',
          boxShadow:
            '0px 32px 24px -16px #00000066, 0px 0px 8px 0px #F8F8F840 inset',
          position: 'absolute',
          left: dotPosition.cx + 'px', // 툴팁의 X 위치를 dot의 X 위치로 고정
          top: dotPosition.cy - 48 + 'px', // 툴팁을 dot 바로 위에 고정 (20px 상단)
          transform: 'translate(-50%)', // 툴팁이 중앙에 위치하도록 조정
          pointerEvents: 'none', // 툴팁이 마우스 이벤트를 방해하지 않도록 설정
        }}>
        <p className="text-[14px] leading-[20px] text-[#F8F8F8F2]">
          {payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const SquadChart = () => {
  const [dotPosition, setDotPosition] = useState({cx: 0, cy: 0});
  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="-78.12%"
              stopColor="rgba(54, 118, 248, 0.3)"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="rgba(54, 118, 248, 0)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Tooltip
          content={<CustomTooltip dotPosition={dotPosition} />}
          cursor={false}
        />
        <Area
          dataKey="value"
          activeDot={<CustomDot setDotPosition={setDotPosition} />}
          stroke="#3676F8"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SquadChart;

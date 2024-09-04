const MinusButton = ({
  width,
  height,
  color = '#FFFFFF',
  onClick,
}: {
  width: string;
  height: string;
  color?: string;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="39"
          rx="19.5"
          stroke={'#4A4B4D'}
        />
        <path
          d="M11 20H29"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default MinusButton;

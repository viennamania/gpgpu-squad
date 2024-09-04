const CaretRight = ({
  fillColor = '#898F99',
  width = '12',
  height = '12',
  className = '',
}: {
  fillColor?: string;
  width?: string;
  height?: string;
  className?: string;
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 2.75L8.75 6.5L5 10.25"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CaretRight;

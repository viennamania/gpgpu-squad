import {Dispatch, SetStateAction, useEffect} from 'react';

const CustomDot = ({
  cx,
  cy,
  setDotPosition,
}: {
  cx?: number;
  cy?: number;
  setDotPosition: Dispatch<SetStateAction<{cx: number; cy: number}>>;
}) => {
  useEffect(() => {
    if (cx && cy) {
      setDotPosition({cx, cy});
    }
  }, [cx, cy, setDotPosition]);

  if (!cx || !cy) return;

  return (
    <svg
      x={cx - 18} // Adjust positioning to center the SVG
      y={cy - 10} // Adjust positioning to place the SVG above the point
      width="36"
      height="156"
      viewBox="0 0 36 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {/* Line extending downward */}
      <line
        x1="18"
        y1="0"
        x2="18"
        y2="156"
        stroke="url(#paint0_linear_238_42650)"
        strokeOpacity="0.7"
        strokeDasharray="2 2"
      />

      {/* Dot and its effects */}
      <g filter="url(#filter0_bdi_238_42655)">
        <circle
          cx="18"
          cy="10"
          r="10"
          fill="#3676F8"
          fillOpacity="0.1"
          shapeRendering="crispEdges"
          stroke="#3676F8"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
      </g>
      <circle cx="18" cy="10" r="5" fill="#3676F8" />

      {/* Gradients and filters */}
      <defs>
        <linearGradient
          id="paint0_linear_238_42650"
          x1="18"
          y1="0"
          x2="18"
          y2="156"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#3676F8" />
          <stop offset="1" stopColor="#3676F8" stopOpacity="0" />
        </linearGradient>
        <filter
          id="filter0_bdi_238_42655"
          x="-4"
          y="-12"
          width="44"
          height="72"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_238_42655"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="16"
            operator="erode"
            in="SourceAlpha"
            result="effect2_dropShadow_238_42655"
          />
          <feOffset dy="32" />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="multiply"
            in2="effect1_backgroundBlur_238_42655"
            result="effect2_dropShadow_238_42655"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_238_42655"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.972549 0 0 0 0 0.972549 0 0 0 0 0.972549 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect3_innerShadow_238_42655"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CustomDot;

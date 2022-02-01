import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const TicketsLogo = ({
  width = 100,
  height = 100,
  stroke = '#00c600',
  strokeWidth = '2.5',
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 100 100"
    {...props}>
    <Path fill={stroke} d="M20 96c-5 0-12-6-12-9l28-41c2 3 9 8 12 9" />
    <Path fill={stroke} d="M51 52c-6 1-12-3-13-9 5-1 13 5 12 8" />
    <Path
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      d="M45 45c2-16 10-25 20-23 5 0 8-1 9-5m5 3 2 7m1-11 5 3m-6-7 8-6m-11 4-1-8m-3 11-6-7"
    />
  </Svg>
);

export default TicketsLogo;

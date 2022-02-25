import { memo } from 'react';
import { getBoundingBox } from '../shared/methods';

interface Props {
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  angle: number;
  fillColor?: string;
  strokeColor?: string;
}

const Rect: React.FC<Props> = ({
  x,
  y,
  color,
  angle,
  width,
  height,
  fillColor = '#fff',
  strokeColor = '#ff0000',
}) => {
  const { boxX, boxY, boxWidth, boxHeight } = getBoundingBox(
    x,
    y,
    width,
    height,
    angle,
  );

  const textX = x + 10;
  const textY = y + 5;

  return (
    <g>
      <rect
        transform={`rotate(${angle} ${x} ${y})`}
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        fill={color}
      ></rect>
      <circle fill={fillColor} cx={x} cy={y} r={5}></circle>
      <text x={textX} y={textY} fill={fillColor}>
        <tspan>{angle}&#176;</tspan>
      </text>
      <rect
        fill='none'
        x={boxX}
        y={boxY}
        strokeWidth={2}
        strokeOpacity={0.4}
        stroke={strokeColor}
        width={boxWidth}
        height={boxHeight}
      ></rect>
    </g>
  );
};

export default memo(Rect);

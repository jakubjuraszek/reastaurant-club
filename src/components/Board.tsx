import { memo } from 'react';
import { Rectangle } from '../shared/types';
import Rect from './Rect';

interface Props {
  width: number;
  height: number;
  rectangles: Rectangle[];
}

const Board: React.FC<Props> = ({ width, height, rectangles }) => {
  return (
    <div className='content__board'>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {rectangles.map(rect => {
          return (
            <Rect
              key={rect.id}
              x={rect.x}
              y={rect.y}
              angle={rect.rotation}
              color={rect.color}
              width={rect.width}
              height={rect.height}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default memo(Board);

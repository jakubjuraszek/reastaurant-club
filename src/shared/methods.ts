import { Point, ProjectData } from './types';

const calculatePoint = (point: Point, radians: number) => {
  const sin = Math.sin(radians);
  const cos = Math.cos(radians);

  const x = point.x * cos - point.y * sin;
  const y = point.x * sin + point.y * cos;

  return { x, y };
};

export const getBoundingBox = (
  x: number,
  y: number,
  width: number,
  height: number,
  angle: number,
) => {
  const radians = angle * (Math.PI / 180);

  const a = { x: -width / 2, y: -height / 2 };
  const b = { x: width / 2, y: -height / 2 };
  const c = { x: -width / 2, y: height / 2 };
  const d = { x: width / 2, y: height / 2 };

  const { x: aX, y: aY } = calculatePoint(a, radians);
  const { x: bX, y: bY } = calculatePoint(b, radians);
  const { x: cX, y: cY } = calculatePoint(c, radians);
  const { x: dX, y: dY } = calculatePoint(d, radians);

  const boxX = x + Math.min(aX, bX, cX, dX);
  const boxY = y + Math.min(aY, bY, cY, dY);
  const boxWidth = 2 * Math.max(aX, bX, cX, dX);
  const boxHeight = 2 * Math.max(aY, bY, cY, dY);

  return { boxX, boxY, boxWidth, boxHeight };
};

const isString = (str: string) => {
  return typeof str === 'string';
};
const isNumber = (num: number) => {
  return !isNaN(num);
};

const isPositiveNumber = (num: number) => {
  return isNumber(num) && num > 0;
};

export const isValid = (data: ProjectData) => {
  if (
    !isString(data.id) ||
    !isPositiveNumber(data.project.height) ||
    !isPositiveNumber(data.project.width)
  ) {
    return false;
  }

  return data.project.items.every(item => {
    return (
      isString(item.id) &&
      isString(item.color) &&
      isPositiveNumber(item.height) &&
      isPositiveNumber(item.width) &&
      isNumber(item.rotation)
    );
  });
};

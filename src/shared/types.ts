export type Point = {
  x: number;
  y: number;
};

export type Rectangle = {
  color: string;
  height: number;
  id: string;
  rotation: number;
  width: number;
  x: number;
  y: number;
};

type Project = {
  id: string;
  color: string;
  height: number;
  name: string;
  width: number;
  items: Rectangle[];
};

export type ProjectData = {
  id: string;
  project: Project;
};

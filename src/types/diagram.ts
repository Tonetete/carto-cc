export enum TypeOfNode {
  Source = "source",
  Layer = "layer",
  Intersection = "intersection",
}

export interface NodeData extends Record<string, unknown> {
  label: string;
  url?: string;
}

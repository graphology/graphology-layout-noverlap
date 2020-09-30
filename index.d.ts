import Graph from 'graphology-types';

type LayoutMapping = {[key: string]: {x: number, y: number}};

type NoverlapNodeAttributes = {x: number, y: number, size?: number};
type NoverlapNodeReducer = (key: string, attr: NoverlapNodeAttributes) => NoverlapNodeAttributes;

export type NoverlapSettings = {
  gridSize?: number,
  margin?: number,
  permittedExpansion?: number,
  ratio?: number,
  speed?: number
};

export type NoverlapLayoutOptions = {
  maxIterations?: number,
  inputReducer?: NoverlapNodeReducer,
  outputReducer?: NoverlapNodeReducer,
  settings?: NoverlapSettings
};

interface INoverlapLayout {
  (graph: Graph, maxIterations?: number): LayoutMapping;
  (graph: Graph, options: NoverlapLayoutOptions): LayoutMapping;

  assign(graph: Graph, maxIterations?: number): void;
  assign(graph: Graph, options: NoverlapLayoutOptions): void;
}

declare const noverlap: INoverlapLayout;

export default noverlap;

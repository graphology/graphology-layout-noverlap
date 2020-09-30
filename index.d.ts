import Graph from 'graphology-types';

type LayoutMapping = {[key: string]: {x: number, y: number}};

export type NoverlapSettings = {
  gridSize?: number,
  margin?: number,
  permittedExpansion?: number,
  ratio?: number,
  speed?: number
};

export type NoverlapLayoutOptions = {
  maxIterations?: number,
  settings?: NoverlapSettings
};

interface INoverlapLayout {
  (graph: Graph, iterations: number): LayoutMapping;
  (graph: Graph, options: NoverlapLayoutOptions): LayoutMapping;

  assign(graph: Graph, iterations: number): void;
  assign(graph: Graph, options: NoverlapLayoutOptions): void;
}

declare const noverlap: INoverlapLayout;

export default noverlap;

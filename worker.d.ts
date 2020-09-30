import Graph from 'graphology-types';
import {NoverlapSettings, NoverlapNodeReducer} from './index';

export type NoverlapLayoutSupervisorParameters = {
  inputReducer?: NoverlapNodeReducer,
  outputReducer?: NoverlapNodeReducer,
  settings?: NoverlapSettings
};

export default class NoverlapLayoutSupervisor {
  constructor(graph: Graph, params?: NoverlapLayoutSupervisorParameters);

  start(): void;
  stop(): void;
  kill(): void;
}

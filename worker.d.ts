import Graph from 'graphology-types';
import {NoverlapSettings} from './index';

export type NoverlapLayoutSupervisorParameters = {
  settings?: NoverlapSettings
};

export default class NoverlapLayoutSupervisor {
  constructor(graph: Graph, params?: NoverlapLayoutSupervisorParameters);

  start(): void;
  stop(): void;
  kill(): void;
}

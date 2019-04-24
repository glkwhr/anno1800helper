import {FactoryState, State} from '../types';

export const getLanguage = (store: State) => store.language;

export const getPopulations = (store: State) => store.populations;
export const getPopulationByGuid = (store: State, guid: number): number => {
  return getPopulations(store)[guid] || 0;
};

export const getFactoryStates = (store: State) => store.factoryStates;
export const getFactoryStateByGuid = (store: State, guid: number): FactoryState => {
  return (getFactoryStates(store) && {...getFactoryStates(store)[guid]}) || {boost: 100, count: 0, neededTpmin: 0};
};
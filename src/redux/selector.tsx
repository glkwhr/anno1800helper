import {State} from '../types';

export const getLanguage = (store: State) => store.language;

export const getPopulations = (store: State) => store.populations;
export const getPopulationByGuid = (store: State, guid: number): number => {
  return getPopulations(store)[guid] || 0;
};
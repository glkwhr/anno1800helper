import {UPDATE_LANGUAGE, UPDATE_POPULATION} from './actionTypes';

export const updateLanguage = (newLanguage: string) => {
  return {
    type: UPDATE_LANGUAGE,
    payload: {
      language: newLanguage,
    }
  };
};

export const updatePopulation = (guid: number, newPopulation: number) => {
  return {
    type: UPDATE_POPULATION,
    payload: {
      guid: guid,
      population: newPopulation,
    }
  };
};
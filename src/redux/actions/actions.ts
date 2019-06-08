import {FactoryState} from "../../types";
import {
  RESET,
  UPDATE_FACTORY_BOOST,
  UPDATE_FACTORY_COUNT,
  UPDATE_FACTORY_STATES,
  UPDATE_LANGUAGE,
  UPDATE_POPULATION
} from './actionTypes';

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

export const updateFactoryCount = (guid: number, newFactoryCount: number) => {
  return {
    type: UPDATE_FACTORY_COUNT,
    payload: {
      guid: guid,
      count: newFactoryCount,
    }
  };
};

export const updateFactoryBoost = (guid: number, newFactoryBoost: number) => {
  return {
    type: UPDATE_FACTORY_BOOST,
    payload: {
      guid: guid,
      boost: newFactoryBoost,
    }
  };
};

export const updateFactoryStates = (newFactoryStates: { [guid: number]: FactoryState }) => {
  return {
    type: UPDATE_FACTORY_STATES,
    payload: {
      newFactoryStates: newFactoryStates,
    }
  };
};

export const reset = () => {
  return {
    type: RESET,
    payload: {},
  };
};
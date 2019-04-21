import {params} from '../data/params_2019-04-17_full';
import {Factory, GuidMap, PopulationLevel} from "../types";

export const selectPopulationLevels = (): any => {
  return params.populationLevels;
};
export const selectFactories = (): any => {
  return params.factories;
};
export const selectLanguages = (): any => {
  return params.languages;
};


// Functions that generates guid maps
function createPopulationLevelGuidMap(): GuidMap<PopulationLevel> {
  let populationLevelGuidMap: GuidMap<PopulationLevel> = {};
  selectPopulationLevels().forEach(
    (populationLevel: PopulationLevel) => {
      populationLevelGuidMap[populationLevel.guid] = populationLevel;
    }
  );
  return populationLevelGuidMap;
}

function createFactoryGuidMap(): GuidMap<Factory> {
  let factoryGuidMap: GuidMap<Factory> = {};
  selectFactories().forEach(
    (factory: Factory) => {
      factoryGuidMap[factory.guid] = factory;
    }
  );
  return factoryGuidMap;
}


// guid maps
const populationLevelGuidMap: GuidMap<PopulationLevel> = createPopulationLevelGuidMap();
const factoryGuidMap: GuidMap<Factory> = createFactoryGuidMap();


// selector functions
export const selectPopulationLevelByGuid = (guid: number): PopulationLevel => {
  return populationLevelGuidMap[guid] || {};
};
export const selectFactoryByGuid = (guid: number): Factory => {
  return factoryGuidMap[guid] || {};
};
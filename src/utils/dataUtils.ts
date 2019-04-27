import {ICONS} from "../data/icons";
import {params} from '../data/params_2019-04-17_full';
import {Factory, GuidMap, PopulationLevel, Product} from "../types";

export const selectPopulationLevels = (): any => {
  return params.populationLevels;
};
export const selectFactories = (): any => {
  return params.factories;
};
export const selectProducts = (): any => {
  return params.products;
};
export const selectLanguages = (): any => {
  return params.languages;
};
export const selectProductFilters = (): any => {
  return params.productFilter;
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

function createProductGuidMap(): GuidMap<Product> {
  let productGuidMap: GuidMap<Product> = {};
  selectProducts().forEach(
    (product: Product) => {
      productGuidMap[product.guid] = product;
    }
  );
  return productGuidMap;
}


// guid maps
const populationLevelGuidMap: GuidMap<PopulationLevel> = createPopulationLevelGuidMap();
const factoryGuidMap: GuidMap<Factory> = createFactoryGuidMap();
const productGuidMap: GuidMap<Product> = createProductGuidMap();


// selector functions
export const selectPopulationLevelByGuid = (guid: number): PopulationLevel => {
  return populationLevelGuidMap[guid] || {};
};
export const selectFactoryByGuid = (guid: number): Factory => {
  return factoryGuidMap[guid] || {};
};
export const selectProductByGuid = (guid: number): Product => {
  return productGuidMap[guid] || {};
};
export const selectFactoryByProductGuid = (guid: number): Factory | undefined => {
  let product: Product = selectProductByGuid(guid);
  return (product.producer && selectFactoryByGuid(product.producer)) || undefined;
};
export const selectIconByName = (name: string): string | undefined => {
  return ICONS[name];
};
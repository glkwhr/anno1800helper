import {Factory, FactoryProductMeta, FactoryState, Need, PopulationLevel, Product, TotalNeeds} from "../types";
import * as DataUtils from "./dataUtils";
import {selectFactoryByGuid, selectWorkforceGuidMap} from "./dataUtils";

function calculatePopulationNeeds(populations: { [guid: number]: number }): TotalNeeds {
  // for each needed product, calculate total tpmin (depth === 0)
  let populationNeeds: TotalNeeds = {};
  Object.keys(populations).forEach((guidString: string) => {
    let guid: number = +guidString;  // convert string to number (will be 0 if cannot convert)
    let populationLevel: PopulationLevel = DataUtils.selectPopulationLevelByGuid(guid);
    populationLevel.needs.forEach((need: Need) => {
      if (need.tpmin) {
        // only look at consumable product need
        (populationNeeds[need.guid]
          && (populationNeeds[need.guid].totalTpmin += (need.tpmin * populations[guid])))
        || (populationNeeds[need.guid] = {totalTpmin: (need.tpmin * populations[guid])});
      }
    });
  });
  return populationNeeds;
}

function getNextFactoryStates(
  totalNeeds: TotalNeeds,
  preFactoryStates: { [guid: number]: FactoryState }
): { [guid: number]: FactoryState } {
  let nextFactoryStates: { [guid: number]: FactoryState } = {...preFactoryStates};
  Object.keys(totalNeeds).forEach(
    (guidString: string) => {
      let guid: number = +guidString;
      let product: Product = DataUtils.selectProductByGuid(guid);
      if (product.producer) {
        let factory: Factory = DataUtils.selectFactoryByGuid(product.producer);
        let boost: number = (preFactoryStates[factory.guid] && preFactoryStates[factory.guid].boost) || 100;
        let factoryCount: number = calculateFactoryCountFromFactoryBoost(
          boost,
          factory.tpmin,
          totalNeeds[guid].totalTpmin
        );
        (nextFactoryStates[factory.guid] = {
          boost: boost,
          count: factoryCount,
          neededTpmin: totalNeeds[guid].totalTpmin
        });
      }
    }
  );
  return nextFactoryStates;
}

export function calculateNextFactoryStates(
  populations: { [guid: number]: number },
  preFactoryStates: { [guid: number]: FactoryState },
): { [guid: number]: FactoryState } {
  // root nodes
  let populationNeeds: TotalNeeds = calculatePopulationNeeds(populations);
  // global need for each product
  let totalNeeds: TotalNeeds = {};
  Object.keys(populationNeeds).forEach(
    (guidString: string) => {
      let guid: number = +guidString;

      let treeTraverseProductionChain = (guid: number, consumeTpmin: number) => {
        // for each needed product, do DFS to update the need for the prerequisite products of this product
        (totalNeeds[guid] && (totalNeeds[guid].totalTpmin += consumeTpmin)) || (totalNeeds[guid] = {totalTpmin: consumeTpmin});
        // traverse the child (prerequisite) nodes
        let product: Product = DataUtils.selectProductByGuid(guid);
        if (product.producer) {
          let factory: Factory = DataUtils.selectFactoryByGuid(product.producer);
          if (factory.inputs) {
            // haven't reached the leaf nodes
            let boost: number = (preFactoryStates[factory.guid] && preFactoryStates[factory.guid].boost) || 100;
            // `factoryCount` here can have decimal places because it's used to calculate tpmin
            // ceiling will be done in final stage (`getNextFactoryStates`)
            let factoryCount: number =
              consumeTpmin * 100 / boost / factory.tpmin;
            factory.inputs.forEach((productMeta: FactoryProductMeta) => {
              treeTraverseProductionChain(
                productMeta.Product,
                productMeta.Amount * factory.tpmin * factoryCount,
              );
            });
          }
        }
      };
      treeTraverseProductionChain(guid, populationNeeds[guid].totalTpmin);
    }
  );

  return getNextFactoryStates(totalNeeds, preFactoryStates);
}

export function calculateFactoryCountFromFactoryBoost(boost: number, factoryTpmin: number, totalTpmin: number): number {
  return Math.ceil(totalTpmin * 100 / boost / factoryTpmin);
}

export function calculateFactoryBoostFromFactoryCount(count: number, factoryTpmin: number, totalTpmin: number): number {
  return (100 * totalTpmin / factoryTpmin / count);
}

export function calculateWorkforceNeedsFromFactoryStates(
  factoryStates: { [guid: number]: FactoryState }
): { [guid: number]: number } {
  let workforceNeeds: { [guid: number]: number } = {};
  let workforceGuidList: number[] = Object.keys(selectWorkforceGuidMap()).map((s: string) => {
    return +s;
  });
  Object.keys(factoryStates).forEach(
    (guidString: string) => {
      let guid: number = +guidString;
      let factory: Factory = selectFactoryByGuid(guid);
      factory.maintenances && factory.maintenances.forEach(
        (maintenanceNeed: { Product: number, Amount: number }) => {
          if (workforceGuidList.indexOf(maintenanceNeed.Product) > -1) {
            // cannot use `productGuid in guidList` for some reason (haven't figure out)
            let workforceNeed: number = maintenanceNeed.Amount * factoryStates[guid].count;
            (workforceNeeds[maintenanceNeed.Product]
              && (workforceNeeds[maintenanceNeed.Product] += workforceNeed))
            || (workforceNeeds[maintenanceNeed.Product] = workforceNeed);
          }
        }
      );
    }
  );
  return workforceNeeds;
}
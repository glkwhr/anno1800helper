export interface BasicItem {
  name: string,
  guid: number,
  icon: string,
  locaText: { [key: string]: string },
}

export interface Need {
  tpmin: number | null,
  guid: number,
  happiness?: number,
}

export interface PopulationLevel extends BasicItem {
  fullHouse: number,
  needs: [Need],
}

export interface Product extends BasicItem {
  producer?: number,  // producer guid
}

export interface FactoryProduct {
  guid: number,
  amount: number,
  storageAmount: number,
}

export interface Factory extends BasicItem {
  tpmin: number,  // unit per minute
  outputs: [FactoryProduct],
  inputs?: [FactoryProduct],
  maintenance?: any,  // currently don't care
}

export type FactoryState = {
  boost: number,  // in percentage (no decimal)
  count: number,
};

export type State = {
  language: string,
  populations: { [guid: number]: number },
  factoryStates: {
    [guid: number]: FactoryState;
  },
};

export type GuidMap<T> = { [key: number]: T };

export const LANG_MAP: { [key: string]: string } = {
  'zh': 'chinese',
  'zh-CN': 'chinese',
  'zh-TW': 'taiwanese',
  'en': 'english',
  'en-US': 'english',
};
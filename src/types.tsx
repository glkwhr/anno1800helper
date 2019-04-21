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
}

export type State = {
  language: string,
  populations: {[guid: number]: number},
  // factoryBoosts: {[guid: number]: number},
}

export const LANG_MAP: { [key: string]: string } = {
  'zh': 'chinese',
  'zh-CN': 'chinese',
  'zh-TW': 'taiwanese',
  'en': 'english',
  'en-US': 'english',
};
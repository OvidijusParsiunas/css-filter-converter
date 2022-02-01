export enum BasicColorTypes {
  HEX = 'Hex',
  RGB = 'RGB',
  HSL = 'HSL',
  KEYWORD = 'Keyword',
}

export enum SpecialColorTypes {
  FILTER = 'Filter',
}

export type AllColorTypes = BasicColorTypes | SpecialColorTypes;

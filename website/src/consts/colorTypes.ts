export const BASIC_COLOR_TYPES = {
  HEX: 'Hex',
  RGB: 'RGB',
  HSL: 'HSL',
  KEYWORD: 'Keyword',
} as const;

export const ALL_COLOR_TYPES = {
  ...BASIC_COLOR_TYPES,
  FILTER: 'Filter',
} as const;

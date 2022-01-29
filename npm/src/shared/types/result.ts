interface Error {
  message: string;
}

// WORK - optionals will need to be set as required
export interface FilterToColorResult {
  result: string | null;
  error?: Error;
}

export interface ColorToFilterResult extends FilterToColorResult {
  values?: number[];
  loss?: number;
}

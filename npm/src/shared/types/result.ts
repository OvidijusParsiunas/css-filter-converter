interface Error {
  message: string;
}

export interface FilterToColorResult {
  color: string | null;
  error?: Error;
}

export interface ColorToFilterResult extends FilterToColorResult {
  loss?: number;
}

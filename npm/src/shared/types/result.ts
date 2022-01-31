interface Error {
  message: string;
}

export interface ColorResult<T = string | null> {
  color: T;
}

export interface FilterToColorResult extends ColorResult {
  error?: Error;
}

export interface ColorToFilterResult extends FilterToColorResult {
  loss?: number;
}

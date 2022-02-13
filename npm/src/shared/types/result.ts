interface Error {
  message: string;
}

export interface ColorResult<T = null> {
  color: T | null;
}

export interface FilterToColorResult<T = null> extends ColorResult<T> {
  error?: Error;
}

export interface ColorToFilterResult<T = string | null> extends FilterToColorResult<T> {
  loss?: number;
}

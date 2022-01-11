interface Error {
  message: string;
}

// WORK - optionals will need to be set as required
export interface Result {
  values?: number[];
  loss?: number;
  filter: string | null;
  error?: Error;
}

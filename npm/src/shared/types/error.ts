// The reason why we are overriding the implicit Error type is because this is a custom error
// that is used quite heavily within this project and due to the fact that there is a line
// length limit set by eslint, it is preferred to use this shorter syntax.
// Used exclusively for internal API error handling
export interface Error {
  errorMessage: string;
}

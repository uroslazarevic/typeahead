type SharedTypeaheadProps = {
  noResultsLabel?: string;
  options: string[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
};

export type OutsideMultipleTypeaheadProps = {
  onSelectionChange?: (selections: string[]) => void;
};
export type OutsideAsyncTypeaheadProps = {
  onSearch: (query: string) => Promise<unknown>;
  debounceTimeMS?: number;
};
export type BasicTypeaheadProps = SharedTypeaheadProps;
export type MultiSelectTypeaheadProps = {
  onSelectionChange?: (selections: string[]) => void;
} & SharedTypeaheadProps;

export type AsyncTypeaheadProps = {
  onSearch: (query: string) => Promise<unknown>;
  debounceTimeMS?: number;
} & SharedTypeaheadProps;

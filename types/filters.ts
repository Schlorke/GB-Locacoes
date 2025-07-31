export interface FilterOption {
  value: string;
  label: string;
}

export interface Filter {
  label: string;
  value: string;
  options: FilterOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
}

// Allowing auto complete for IconSize and also allowing string

type IconSize = 'sm' | 'md' | 'lg';

type LooseAutocomplete<T extends string> = T | Omit<string, T>;

export const iconSize: LooseAutocomplete<IconSize> = 'sm';

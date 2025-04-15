import { Checkbox } from '@shared/shadcn/ui/checkbox';

type MultiSelectProps<T> = {
  items: T[];
  selectedItems: string[];
  onChange: (selected: string[]) => void;
  getKey: (item: T) => string;
  renderLabel: (item: T) => React.ReactNode;
};

export function MultiSelect<T>({
  items,
  selectedItems,
  onChange,
  getKey,
  renderLabel,
}: MultiSelectProps<T>) {
  const handleCheckedChange = (key: string, checked: boolean) => {
    onChange(
      checked ? [...selectedItems, key] : selectedItems.filter((k) => k !== key)
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const key = getKey(item);
        return (
          <label key={key} className="flex items-center gap-1 text-sm">
            <Checkbox
              checked={selectedItems.includes(key)}
              onCheckedChange={(checked) =>
                handleCheckedChange(key, Boolean(checked))
              }
            />
            {renderLabel(item)}
          </label>
        );
      })}
    </div>
  );
}

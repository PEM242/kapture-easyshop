import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const OrderFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateRange,
  onDateRangeChange,
}: OrderFiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      <Input
        placeholder="Rechercher une commande..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="non traité">Non traité</SelectItem>
            <SelectItem value="traité">Traité</SelectItem>
          </SelectContent>
        </Select>

        <DatePickerWithRange
          date={dateRange}
          onDateChange={onDateRangeChange}
        />
      </div>
    </div>
  );
};

export default OrderFilters;
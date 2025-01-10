import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  stockFilter: string;
  onStockFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const ProductFilters = ({
  searchTerm,
  onSearchChange,
  stockFilter,
  onStockFilterChange,
  statusFilter,
  onStatusFilterChange,
}: ProductFiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      <Input
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <div className="flex gap-4">
        <Select value={stockFilter} onValueChange={onStockFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="inStock">En stock</SelectItem>
            <SelectItem value="outOfStock">Rupture de stock</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductFilters;
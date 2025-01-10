import { StoreData } from "../../store-creator/types";
import { Button } from "@/components/ui/button";
import { Plus, Share2, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import ProductForm from "../../store-creator/ProductForm";
import { useToast } from "@/hooks/use-toast";
import ProductFilters from "./products/ProductFilters";

interface ProductsViewProps {
  storeData: StoreData;
  onUpdateStore: (data: StoreData) => void;
}

const ProductsView = ({ storeData, onUpdateStore }: ProductsViewProps) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{ index: number; product: any } | null>(null);
  const { toast } = useToast();

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProducts = storeData.products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "inStock" && product.inStock) ||
      (stockFilter === "outOfStock" && !product.inStock);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && product.isActive) ||
      (statusFilter === "inactive" && !product.isActive);

    return matchesSearch && matchesStock && matchesStatus;
  });

  const handleAddProduct = (product: any) => {
    const updatedStore = {
      ...storeData,
      products: [...(storeData.products || []), product],
    };
    onUpdateStore(updatedStore);
    setShowAddProduct(false);
  };

  const handleEditProduct = (product: any) => {
    if (editingProduct) {
      const updatedProducts = [...storeData.products];
      updatedProducts[editingProduct.index] = product;
      const updatedStore = {
        ...storeData,
        products: updatedProducts,
      };
      onUpdateStore(updatedStore);
      setEditingProduct(null);
      toast({
        title: "Produit modifié",
        description: "Le produit a été modifié avec succès.",
      });
    }
  };

  const handleDeleteProduct = (index: number) => {
    const updatedProducts = storeData.products.filter((_, i) => i !== index);
    const updatedStore = {
      ...storeData,
      products: updatedProducts,
    };
    onUpdateStore(updatedStore);
    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé avec succès.",
    });
  };

  const handleShare = async (product: any) => {
    const storeUrl = `${window.location.origin}/store`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Découvrez ${product.name} dans notre boutique`,
          url: storeUrl,
        });
        toast({
          title: "Partage réussi !",
          description: "Le produit a été partagé avec succès.",
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast({
            title: "Erreur",
            description: "Impossible de partager le produit. Veuillez réessayer.",
            variant: "destructive",
          });
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(storeUrl);
        toast({
          title: "Lien copié !",
          description: "Le lien du produit a été copié dans le presse-papier.",
        });
      } catch (err) {
        toast({
          title: "Erreur",
          description: "Impossible de copier le lien. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    }
  };

  if (showAddProduct) {
    return (
      <div className="py-6">
        <Button
          variant="ghost"
          onClick={() => setShowAddProduct(false)}
          className="mb-4"
        >
          Retour
        </Button>
        <ProductForm onAddProduct={handleAddProduct} storeType={storeData.type} />
      </div>
    );
  }

  if (editingProduct) {
    return (
      <div className="py-6">
        <Button
          variant="ghost"
          onClick={() => setEditingProduct(null)}
          className="mb-4"
        >
          Retour
        </Button>
        <ProductForm 
          onAddProduct={handleEditProduct} 
          storeType={storeData.type} 
          initialData={editingProduct.product}
        />
      </div>
    );
  }

  return (
    <div className="py-6 space-y-4">
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {filteredProducts?.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-accent/10 transition-colors"
        >
          <div className="flex items-center space-x-4">
            {product.images?.main && (
              <img
                src={product.images.main}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{product.price} €</span>
                <span>•</span>
                <span className={product.inStock ? "text-green-500" : "text-red-500"}>
                  {product.inStock ? "En stock" : "Rupture de stock"}
                </span>
                <span>•</span>
                <span className={product.isActive ? "text-green-500" : "text-yellow-500"}>
                  {product.isActive ? "Actif" : "Inactif"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleShare(product)}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setEditingProduct({ index, product })}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleDeleteProduct(index)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      <Button
        onClick={() => setShowAddProduct(true)}
        className="fixed bottom-20 right-4 shadow-lg"
      >
        <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
      </Button>
    </div>
  );
};

export default ProductsView;

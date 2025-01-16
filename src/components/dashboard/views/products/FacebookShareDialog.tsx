import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/components/store-creator/types";

interface FacebookShareDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  storeName: string;
  storeUrl: string;
}

const FacebookShareDialog = ({
  open,
  onClose,
  product,
  storeName,
  storeUrl,
}: FacebookShareDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(`${product.name} - ${storeName}`);
  const [description, setDescription] = useState(product.description || "");

  const handleShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      storeUrl
    )}&quote=${encodeURIComponent(
      `${title}\n\n${description}\n\nPrix: ${product.price}€`
    )}`;

    window.open(shareUrl, "_blank", "width=600,height=400");

    toast({
      title: "Partage sur Facebook",
      description: "La fenêtre de partage Facebook s'est ouverte",
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Partager sur Facebook</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Titre</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de la publication"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du produit"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Aperçu de l'image</label>
            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
              {product.images?.main ? (
                <img
                  src={product.images.main}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Pas d'image
                </div>
              )}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Prix: {product.price}€
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleShare} className="gap-2">
            <Facebook className="h-4 w-4" />
            Partager
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FacebookShareDialog;
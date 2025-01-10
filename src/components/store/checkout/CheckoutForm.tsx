import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StoreData } from "@/components/store-creator/types";
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormProps {
  storeData: StoreData;
  onClose: () => void;
}

const CheckoutForm = ({ storeData, onClose }: CheckoutFormProps) => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: storeData.paymentMethods[0],
    deliveryMethod: storeData.deliveryMethods[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    if (formData.deliveryMethod === "delivery" && !formData.address) {
      toast({
        title: "Adresse requise",
        description: "Veuillez fournir une adresse de livraison",
        variant: "destructive",
      });
      return;
    }

    // Créer l'objet de commande
    const order = {
      customer: formData.name,
      phone: formData.phone,
      address: formData.address,
      payment: formData.paymentMethod === "cash" ? "Paiement à la livraison" : "Paiement sur place",
      delivery: formData.deliveryMethod === "delivery" ? "Livraison à domicile" : "Retrait en boutique",
      total,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    // Sauvegarder la commande dans localStorage
    localStorage.setItem('pendingOrder', JSON.stringify(order));

    toast({
      title: "Commande confirmée !",
      description: "Nous vous contacterons bientôt pour confirmer votre commande.",
    });

    clearCart();
    onClose();
  };

  const getPaymentMethodLabel = (method: string) => {
    if (formData.deliveryMethod === "pickup") {
      return "Paiement sur place";
    }
    return "Paiement à la livraison";
  };

  // Filter unique payment methods based on delivery method
  const getFilteredPaymentMethods = () => {
    const uniqueMethods = new Set();
    return storeData.paymentMethods.filter(method => {
      const label = getPaymentMethodLabel(method);
      if (!uniqueMethods.has(label)) {
        uniqueMethods.add(label);
        return true;
      }
      return false;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nom complet *
        </label>
        <Input
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Numéro de téléphone *
        </label>
        <Input
          required
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          placeholder="Votre numéro"
          type="tel"
        />
      </div>

      {storeData.deliveryMethods.length > 1 && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Mode de livraison
          </label>
          <div className="space-y-2">
            {storeData.deliveryMethods.map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={method}
                  checked={formData.deliveryMethod === method}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryMethod: e.target.value,
                      paymentMethod: storeData.paymentMethods[0],
                    })
                  }
                  className="rounded-full"
                />
                <span>
                  {method === "delivery"
                    ? "Livraison à domicile"
                    : "Retrait en magasin"}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {formData.deliveryMethod === "delivery" && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Adresse de livraison *
          </label>
          <Input
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Votre adresse complète"
          />
        </div>
      )}

      {storeData.paymentMethods.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Méthode de paiement
          </label>
          <div className="space-y-2">
            {getFilteredPaymentMethods().map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="rounded-full"
                />
                <span>{getPaymentMethodLabel(method)}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-4">
        <p className="font-semibold mb-4">
          Total à payer: {total.toLocaleString()} CFA
        </p>
        <Button type="submit" className="w-full">
          Confirmer la commande
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;

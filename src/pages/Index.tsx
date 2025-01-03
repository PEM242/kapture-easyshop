import StoreCreator from "@/components/store-creator/StoreCreator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">
          Créez votre boutique en ligne
        </h1>
        <p className="text-gray-600 text-center mb-12 animate-fade-in">
          Suivez les étapes simples pour configurer votre boutique personnalisée
        </p>
        <StoreCreator />
      </div>
    </div>
  );
};

export default Index;
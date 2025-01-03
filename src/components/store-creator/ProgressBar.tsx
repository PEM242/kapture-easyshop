interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const steps = [
    "Type de boutique",
    "Configuration",
    "Thème",
    "Produits",
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              index + 1 <= currentStep ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${
                index + 1 <= currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm text-center">{step}</span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
import { StoreData } from "@/components/store-creator/types";

export const useStoreTheme = (storeData: StoreData) => {
  const getThemeClasses = (element: 'header' | 'footer' | 'button' | 'text' | 'background') => {
    if (!storeData.theme) return '';

    const themeStyles = {
      theme1: {
        header: 'bg-theme1-bg text-theme1-text font-helvetica h-16 md:h-20',
        footer: 'bg-white text-theme1-textAlt font-helvetica py-6 md:py-8',
        button: 'bg-theme1-button text-theme1-text border-2 border-theme1-buttonBorder hover:bg-theme1-buttonBorder hover:text-white transition-colors font-helvetica',
        text: 'text-theme1-text font-helvetica',
        background: 'bg-white',
      },
      theme2: {
        header: 'bg-theme2-bg text-theme2-text font-sans h-16 md:h-20',
        footer: 'bg-white text-theme2-textAlt font-serif py-6 md:py-8',
        button: 'bg-theme2-button text-white hover:bg-theme2-buttonHover transition-colors font-sans',
        text: 'text-theme2-text',
        background: 'bg-white',
      },
      theme3: {
        header: 'bg-theme3-bg text-theme3-text font-serif h-16 md:h-20',
        footer: 'bg-white text-theme3-textAlt font-serif py-6 md:py-8',
        button: 'bg-theme3-button text-white hover:bg-theme3-buttonHover transition-colors font-serif',
        text: 'text-theme3-text font-serif',
        background: 'bg-white',
      },
    };

    return themeStyles[storeData.theme as keyof typeof themeStyles]?.[element] || '';
  };

  const getThemeFont = () => {
    switch (storeData.theme) {
      case 'theme1':
        return 'font-helvetica';
      case 'theme2':
        return 'font-sans';
      case 'theme3':
        return 'font-serif';
      default:
        return 'font-sans';
    }
  };

  return {
    getThemeClasses,
    getThemeFont,
  };
};
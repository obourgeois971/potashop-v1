import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        greeting: "Hello, world!",
        // Autres traductions en anglais...
      },
    },
    fr: {
      translation: {
        greeting: "Bonjour tout le monde !",
        // Autres traductions en français...
      },
    },
    // Ajoutez d'autres langues si nécessaire
  },
  lng: "en", // Langue par défaut
  fallbackLng: "en", // Langue de secours si la langue actuelle n'est pas disponible
  interpolation: {
    escapeValue: false, // Ne pas échapper les valeurs HTML
  },
});

export default i18n;

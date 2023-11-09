import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EN_TRANSLATE from "./locale/en/translate";
import VI_TRANSLATE from "./locale/vi/translate";

const resources = {
  en: { translation: EN_TRANSLATE },
  vi: { translation: VI_TRANSLATE },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigate"],
      lookupQuerystring: "lng",
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
      caches: ["localStorage", "cookie"],
    },
    lng: "vi",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
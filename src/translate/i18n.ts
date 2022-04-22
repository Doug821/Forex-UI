import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { messages } from "./languages/index";

i18n.use(LanguageDetector).init({
  debug: false,
  defaultNS: "translation",
  fallbackLng: "en",
  ns: "translation",
  resources: messages,
});

export { i18n };

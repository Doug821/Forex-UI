import { messages as englishMessages } from "./en-US/index";
import { messages as portugueseMessages } from "./pt-BR/index";

const messages = {
  ...englishMessages,
  ...portugueseMessages
};

export { messages };

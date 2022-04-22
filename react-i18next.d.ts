import "i18next";

import ns from "./src/translate/languages/en-US/index";

declare module "i18next" {
  interface Resources {
    ns: typeof ns;
  }
}

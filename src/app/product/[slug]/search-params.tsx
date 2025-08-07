import { createLoader, parseAsString } from "nuqs/server";

export const variantSearchParam = {
  variant: parseAsString.withDefault(""),
};

export const loadSerachParams = createLoader(variantSearchParam);

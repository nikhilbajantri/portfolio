import { SEARCH_WEIGHTS } from "../../constants";

export const weights = {
  ...SEARCH_WEIGHTS,
  EXACT_ALIAS: 85,
  TYPO_CORRECTION_PENALTY: 0.8
};

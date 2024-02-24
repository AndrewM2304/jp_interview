import { AssetClass } from "../../utilities/types-and-enums";

export const assetClassComparator = (
  valueA: AssetClass,
  valueB: AssetClass
) => {
  const AssetClassValues: Record<AssetClass, number> = {
    Commodities: 1,
    Credit: 3,
    Equities: 2,
  };
  if (AssetClassValues[valueA] == AssetClassValues[valueB]) return 0;
  return AssetClassValues[valueA] > AssetClassValues[valueB] ? 1 : -1;
};

export const stylePositiveAndNegativeValues = (value: number) => {
  /* 
      requirements doc states red and blue - I am using shades of red and blue that pass colour contrast levels with background white / green / blue rows.

      Clarification required on if 0 counts as a positve figure - currently I am not styling this as blue or red but can discuss at interview
      */

  let textColor;

  if (value > 0) {
    textColor = "#09099e";
  } else if (value < 0) {
    textColor = "#b80606";
  } else {
    textColor = "#000000";
  }
  return { color: textColor };
};

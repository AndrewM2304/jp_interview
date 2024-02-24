import { AssetClass } from "../utilities/types-and-enums";

export const generateData = () => {
  const tickerValues = [
    "ALPHA",
    "BETA",
    "GAMMA",
    "EPSILON",
    "ZETA",
    "ETA",
    "THETA",
  ];
  const assetClassValues = [
    AssetClass.COMMODITIES,
    AssetClass.EQUITIES,
    AssetClass.CREDIT,
  ];

  const generateRandomNumber = () => {
    const num = (Math.random() - 0.5) * 20000;
    return num.toFixed(2);
  };

  const generateRandomArrayItem = (items: string[]) => {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  };

  return Array.from({ length: 50 }).map((_) => ({
    ticker: generateRandomArrayItem(tickerValues),
    price: generateRandomNumber(),
    assetClass: generateRandomArrayItem(assetClassValues),
    id: crypto.randomUUID().toString(),
  }));
};

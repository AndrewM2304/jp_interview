export enum AssetClass {
  "COMMODITIES" = "Commodities",
  "EQUITIES" = "Equities",
  "CREDIT" = "Credit",
}

export type FinancialInstrument = {
  assetClass: AssetClass;
  price: number;
  ticker: string;
  id: string;
};

import { expect, it } from "vitest";
import {
  assetClassComparator,
  stylePositiveAndNegativeValues,
} from "./GridHelpers";
import { AssetClass } from "../../utilities/types-and-enums";

describe("asset class comparator", () => {
  it("sorts Commodities ahead of Equities ", () => {
    const comVsEq = assetClassComparator(
      AssetClass.COMMODITIES,
      AssetClass.EQUITIES
    );
    expect(comVsEq).toBe(-1);

    const eqVsCom = assetClassComparator(
      AssetClass.EQUITIES,
      AssetClass.COMMODITIES
    );
    expect(eqVsCom).toBe(1);
  });

  it("sorts Equities ahead of Credit ", () => {
    const eqVsCre = assetClassComparator(
      AssetClass.EQUITIES,
      AssetClass.CREDIT
    );
    expect(eqVsCre).toBe(-1);

    const creVsEq = assetClassComparator(
      AssetClass.CREDIT,
      AssetClass.EQUITIES
    );
    expect(creVsEq).toBe(1);
  });

  it("sorts Commodities ahead of Credit ", () => {
    const comVsCre = assetClassComparator(
      AssetClass.COMMODITIES,
      AssetClass.CREDIT
    );
    expect(comVsCre).toBe(-1);

    const creVsCom = assetClassComparator(
      AssetClass.CREDIT,
      AssetClass.COMMODITIES
    );
    expect(creVsCom).toBe(1);
  });

  it("does not sort equivalent assetClasses", () => {
    const comVsCom = assetClassComparator(
      AssetClass.COMMODITIES,
      AssetClass.COMMODITIES
    );
    expect(comVsCom).toBe(0);

    const eqVsEq = assetClassComparator(
      AssetClass.EQUITIES,
      AssetClass.EQUITIES
    );
    expect(eqVsEq).toBe(0);

    const creVsCre = assetClassComparator(AssetClass.CREDIT, AssetClass.CREDIT);
    expect(creVsCre).toBe(0);
  });
});

describe("stylePositiveAndNegativeValues", () => {
  it("returns blue for positive numbers", () => {
    const blue = "#09099e";

    const blueColor = stylePositiveAndNegativeValues(1);
    expect(blueColor).toStrictEqual({ color: blue });
  });

  it("returns black for 0", () => {
    const black = "#000000";

    const blackColor = stylePositiveAndNegativeValues(0);
    expect(blackColor).toStrictEqual({ color: black });
  });

  it("returns red for negative numbers", () => {
    const red = "#b80606";

    const redColor = stylePositiveAndNegativeValues(-1);
    expect(redColor).toStrictEqual({ color: red });
  });
});

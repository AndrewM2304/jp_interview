import { useQuery } from "@tanstack/react-query";
import { FINANCIAL_INSTRUMENTS_URL } from "../utilities/constants";
import { FinancialInstrument } from "../utilities/types-and-enums";

export const useGetFinancialInstruments = () => {
  return useQuery<FinancialInstrument[]>({
    queryKey: ["grid-data"],
    queryFn: getFinancialInstruments,
    retry: false,
  });
};

const getFinancialInstruments = async () => {
  try {
    const response = await fetch(FINANCIAL_INSTRUMENTS_URL);

    if (!response.ok) {
      throw new Error(`${response.statusText} - ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
};

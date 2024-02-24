import { http, HttpResponse, delay } from "msw";
import { FINANCIAL_INSTRUMENTS_URL } from "../utilities/constants";
import { generateData } from "./generate-data";

export const mswServerErrorResponse = new HttpResponse(null, {
  status: 500,
  statusText: "Someone unplugged the back end",
});

export const handlers = [
  http.get(FINANCIAL_INSTRUMENTS_URL, async () => {
    const mockData = generateData();

    await delay(2000);
    return HttpResponse.json(mockData);
  }),
];

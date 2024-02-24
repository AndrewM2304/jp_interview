/// <reference types="cypress" />
// ***********************************************
import { http, HttpResponse, type RequestHandler } from "msw";
import { FINANCIAL_INSTRUMENTS_URL } from "../../src/utilities/constants";
import { mswServerErrorResponse } from "../../src/mocks/handlers";

Cypress.Commands.add("interceptRequest", (type: "error" | "serverMessage") => {
  cy.window().then((window: any) => {
    const { worker } = window.msw;
    worker.use(
      http.get(FINANCIAL_INSTRUMENTS_URL, () => {
        return type === "error" ? HttpResponse.error() : mswServerErrorResponse;
      })
    );
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      interceptRequest(type: "error" | "serverMessage"): void;
    }
  }
}

export {};

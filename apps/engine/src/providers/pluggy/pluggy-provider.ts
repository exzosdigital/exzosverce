import type { Provider } from "../interface";
import type {
  DeleteAccountsRequest,
  GetAccountBalanceRequest,
  GetAccountsRequest,
  GetInstitutionsRequest,
  GetTransactionsRequest,
  ProviderParams,
} from "../types";
import { PluggyApi } from "./pluggy-api";
import {
  transformAccount,
  transformAccountBalance,
  transformInstitution,
  transformTransaction,
} from "./transform";

export class PluggyProvider implements Provider {
  #api: PluggyApi;

  constructor(params: Omit<ProviderParams, "provider">) {
    this.#api = new PluggyApi(params);
  }

  async getTransactions({ accountId }: GetTransactionsRequest) {
    if (!accountId) {
      throw Error("accessToken or accountId is missing");
    }

    const response = await this.#api.getTransactions({
      accountId,
    });

    return (response ?? []).map((transaction) =>
      transformTransaction({
        transaction,
      }),
    );
  }

  async getHealthCheck() {
    return this.#api.getHealthCheck();
  }

  async getAccounts({ itemId }: GetAccountsRequest) {
    if (!itemId) {
      throw Error("accessToken or institutionId is missing");
    }

    const response = await this.#api.getAccounts({
      itemId,
    });

    return (response ?? []).map(transformAccount);
  }

  async getAccountBalance({ accountId }: GetAccountBalanceRequest) {
    if (!accountId) {
      throw Error("Missing params");
    }

    const response = await this.#api.getAccountBalance({
      accountId,
    });

    return transformAccountBalance(response);
  }

  async getInstitutions({ countryCode }: GetInstitutionsRequest) {
    const response = await this.#api.getInstitutions({
      countryCode,
    });

    return response.map(transformInstitution);
  }

  async deleteAccounts({ itemId }: DeleteAccountsRequest) {
    if (!itemId) {
      throw Error("accessToken is missing");
    }

    await this.#api.deleteAccounts({
      itemId,
    });
  }
}

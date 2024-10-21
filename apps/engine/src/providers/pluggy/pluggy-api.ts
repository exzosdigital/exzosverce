import { PLUGGY_COUNTRIES } from "@/utils/countries";
import { ProviderError } from "@/utils/error";

import type { GetInstitutionsRequest, ProviderParams } from "../types";
import type {
  DisconnectAccountRequest,
  GetAccountBalanceRequest,
  GetAccountBalanceResponse,
  GetAccountsRequest,
  GetAccountsResponse,
  GetStatusResponse,
  GetTransactionsRequest,
  GetTransactionsResponse,
} from "./types";
import { isError } from "./utils";

import { PluggyClient } from "pluggy-sdk";

export class PluggyApi {
  #client: PluggyClient;
  #clientId: string;
  #clientSecret: string;

  #countryCodes = PLUGGY_COUNTRIES;

  constructor(params: Omit<ProviderParams, "provider">) {
    this.#clientId = params.envs.PLUGGY_CLIENT_ID;
    this.#clientSecret = params.envs.PLUGGY_SECRET;

    const configuration = {
      clientId: this.#clientId,
      clientSecret: this.#clientSecret,
    };

    this.#client = new PluggyClient(configuration);
  }

  async getHealthCheck() {
    try {
      const response = await fetch(
        "https://status.pluggy.ai/api/v2/status.json",
      );

      const data = (await response.json()) as GetStatusResponse;

      return (
        data.status.indicator === "none" ||
        data.status.indicator === "maintenance"
      );
    } catch {
      return false;
    }
  }

  async getAccountBalance({
    accountId,
  }: GetAccountBalanceRequest): Promise<GetAccountBalanceResponse | undefined> {
    try {
      const account = await this.#client.fetchAccount(accountId);

      return account.balance;
    } catch (error) {
      const parsedError = isError(error);

      if (parsedError) {
        throw new ProviderError(parsedError);
      }
    }
  }

  async getAccounts({
    itemId,
  }: GetAccountsRequest): Promise<GetAccountsResponse | undefined> {
    try {
      const accounts = await this.#client.fetchAccounts(itemId);

      return accounts.results;
    } catch (error) {
      const parsedError = isError(error);

      if (parsedError) {
        throw new ProviderError(parsedError);
      }
    }
  }

  async getTransactions({
    accountId,
  }: GetTransactionsRequest): Promise<GetTransactionsResponse | undefined> {
    try {
      const transactions = await this.#client.fetchTransactions(accountId);

      return transactions.results;
    } catch (error) {
      const parsedError = isError(error);

      if (parsedError) {
        throw new ProviderError(parsedError);
      }
    }
  }

  async deleteAccounts({ itemId }: DisconnectAccountRequest) {
    await this.#client.deleteItem(itemId);
  }

  async getInstitutions(params?: GetInstitutionsRequest) {
    const countryCode = params?.countryCode
      ? [params.countryCode]
      : this.#countryCodes;

    const institutions = this.#client.fetchConnectors({
      countries: countryCode,
    });

    return institutions;
  }
}

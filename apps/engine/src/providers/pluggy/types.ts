import type {
  Account as AccountGetResponse,
  Connector as Institution,
  PageResponse,
  Transaction,
} from "pluggy-sdk";

type TransactionsGetResponse = PageResponse<Transaction>;

export type GetStatusResponse = {
  page: {
    id: string;
    name: string;
    url: string;
    time_zone: string;
    updated_at: string;
  };
  status: {
    indicator: string;
    description: string;
  };
};

export type DisconnectAccountRequest = {
  itemId: string;
};

export type GetAccountsRequest = {
  itemId: string;
};

type AccountWithInstitution = AccountGetResponse & {
  institution: Institution;
};

export type GetAccountsResponse = AccountWithInstitution[];

export type GetAccountBalanceRequest = {
  accountId: string;
};

export type GetAccountBalanceResponse = Pick<
  AccountGetResponse,
  "balance" | "currencyCode"
>;

export type GetTransactionsRequest = {
  accountId: string;
};

export type GetTransactionsResponse = TransactionsGetResponse["results"];

export type TransformTransactionPayload = {
  transaction: Transaction;
};

export type TransformAccountPayload = AccountWithInstitution;

export type TransformAccountBalancePayload = Pick<
  AccountGetResponse,
  "balance" | "currencyCode"
>;

export type TransformInstitutionPayload = Institution;

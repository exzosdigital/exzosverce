import type {
  Account as AccountGetResponse,
  PageResponse,
  Transaction,
} from "pluggy-sdk";

type TransactionsGetResponse = PageResponse<Transaction>;
type AccountsGetResponse = PageResponse<AccountGetResponse>;

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

export type GetAccountsResponse = AccountsGetResponse["results"];

export type GetAccountBalanceRequest = {
  accountId: string;
};

export type GetAccountBalanceResponse = AccountGetResponse["balance"];

export type GetTransactionsRequest = {
  accountId: string;
};

export type GetTransactionsResponse = TransactionsGetResponse["results"];

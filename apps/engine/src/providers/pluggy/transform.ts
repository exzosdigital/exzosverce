import { Providers } from "@/common/schema";
import { getType } from "@/utils/account";
import { getLogoURL } from "@/utils/logo";
import { capitalCase } from "change-case";
import type { Transaction } from "pluggy-sdk";
import type {
  Account as BaseAccount,
  Balance as BaseBalance,
  Institution as BaseInstitution,
  Transaction as BaseTransaction,
} from "../types";
import type {
  TransformAccountBalancePayload,
  TransformAccountPayload,
  TransformInstitutionPayload,
  TransformTransactionPayload,
} from "./types";

const formatAmout = (amount: number) => {
  // Positive values when money moves out of the account; negative values when money moves in.
  // For example, debit card purchases are positive; credit card payments, direct deposits, and refunds are negative.
  return +(amount * -1);
};

export const transformTransaction = ({
  transaction,
}: TransformTransactionPayload): BaseTransaction => {
  const amount = formatAmout(
    transaction.amountInAccountCurrency ?? transaction.amount,
  );

  return {
    id: transaction.id,
    date: transaction.date.toISOString(),
    name: transaction.paymentData?.payer?.name ?? "unknown",
    description: transaction.description,
    currency_rate: null,
    currency_source: null,
    method: transaction.type,
    amount,
    currency: transaction.currencyCode,
    category: transaction.category,
    balance: null,
    status: transaction.status ? "pending" : "posted",
  };
};

export const transformAccount = ({
  id,
  name,
  balance,
  currencyCode,
  type,
  institution,
}: TransformAccountPayload): BaseAccount => {
  return {
    id,
    name,
    currency: currencyCode,
    type: getType(type.toLowerCase()),
    enrollment_id: null,
    balance: transformAccountBalance({ balance, currencyCode }),
    institution: transformInstitution(institution),
  };
};

export const transformAccountBalance = (
  balance?: TransformAccountBalancePayload,
): BaseBalance => ({
  currency: balance?.currencyCode ?? "BRL",
  amount: balance?.balance ?? 0,
});

export const transformInstitution = (
  institution: TransformInstitutionPayload,
): BaseInstitution => ({
  id: institution.id.toString(),
  name: institution.name,
  logo: institution.imageUrl,
  provider: Providers.Enum.pluggy,
});

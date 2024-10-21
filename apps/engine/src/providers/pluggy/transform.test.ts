import { expect, test } from "bun:test";
import {
  transformAccount,
  transformAccountBalance,
  transformTransaction,
} from "./transform";

test("Transform transaction", () => {
  expect(
    transformTransaction({
      transaction: {
        id: "6ec156fe-e8ac-4d9a-a4b3-7770529ab01c",
        description: "TED Example",
        descriptionRaw: null,
        currencyCode: "BRL",
        amount: 1500,
        date: new Date("2020-10-14T00:00:00.000Z"),
        balance: 3500,
        category: "Transfers",
        categoryId: "05000000",
        accountId: "03cc0eff-4ec5-495c-adb3-1ef9611624fc",
        providerCode: "123456",
        type: "CREDIT",
        status: undefined,
        paymentData: {
          payer: {
            name: "Tiago Rodrigues Santos",
            branchNumber: "090",
            accountNumber: "1234-5",
            routingNumber: "001",
            documentNumber: {
              type: "CPF",
              value: "882.937.076-23",
            },
          },
          reason: "Taxa de serviço",
          receiver: {
            name: "Pluggy",
            branchNumber: "999",
            accountNumber: "9876-1",
            routingNumber: "002",
            documentNumber: {
              type: "CNPJ",
              value: "08.050.608/0001-32",
            },
          },
          paymentMethod: "TED",
          referenceNumber: "123456789",
        },
        merchant: undefined,
        amountInAccountCurrency: null,
        creditCardMetadata: null,
      },
    }),
  ).toMatchSnapshot();
});

test("Transform bank account", () => {
  expect(
    transformAccount({
      id: "a658c848-e475-457b-8565-d1fffba127c4",
      type: "BANK",
      subtype: "CHECKING_ACCOUNT",
      number: "0001/12345-0",
      name: "Conta Corrente",
      marketingName: "GOLD Conta Corrente",
      balance: 120950,
      itemId: "a0922d6f-2007-4169-a181-b961500608db",
      taxNumber: "416.799.495-00",
      owner: "John Doe",
      currencyCode: "BRL",
      bankData: {
        transferNumber: "0001/12345-0",
        closingBalance: 120950,
        automaticallyInvestedBalance: null,
      },
      creditData: null,
      institution: {
        id: 601,
        name: "Itaú",
        primaryColor: "EC7000",
        institutionUrl: "https://www.itau.com.br",
        country: "BR",
        type: "PERSONAL_BANK",
        credentials: [
          {
            validation: "^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$",
            validationMessage: "CPF deve ter 11 números.",
            label: "CPF",
            name: "cpf",
            type: "number",
            placeholder: "",
            optional: false,
          },
        ],
        imageUrl: "https://cdn.pluggy.ai/assets/connector-icons/201.svg",
        hasMFA: false,
        oauth: true,
        health: {
          status: "ONLINE",
          stage: null,
        },
        products: [
          "ACCOUNTS",
          "TRANSACTIONS",
          "IDENTITY",
          "CREDIT_CARDS",
          "PAYMENT_DATA",
          "LOANS",
          "INVESTMENTS",
        ],
        createdAt: new Date("2023-09-01T18:05:09.145Z"),
        isSandbox: false,
        isOpenFinance: true,

        supportsPaymentInitiation: true,
        supportsScheduledPayments: true,
        supportsSmartTransfers: true,
      },
    }),
  ).toMatchSnapshot();
});

test("Transform credit account", () => {
  expect(
    transformAccount({
      id: "a658c848-e475-457b-8565-d1fffba127c4",
      type: "CREDIT",
      subtype: "CREDIT_CARD",
      number: "xxxx8670",
      name: "Mastercard Black",
      marketingName: "PLUGGY UNICLASS MASTERCARD BLACK",
      balance: 120950,
      itemId: "a0922d6f-2007-4169-a181-b961500608db",
      taxNumber: "416.799.495-00",
      owner: "John Doe",
      currencyCode: "BRL",
      creditData: {
        level: "BLACK",
        brand: "MASTERCARD",
        balanceCloseDate: new Date("2022-01-03"),
        balanceDueDate: new Date("2022-01-03"),
        availableCreditLimit: 200000,
        balanceForeignCurrency: 0,
        minimumPayment: 16190,
        creditLimit: 300000,
      },
      bankData: null,
      institution: {
        id: 601,
        name: "Itaú",
        primaryColor: "EC7000",
        institutionUrl: "https://www.itau.com.br",
        country: "BR",
        type: "PERSONAL_BANK",
        credentials: [
          {
            validation: "^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$",
            validationMessage: "CPF deve ter 11 números.",
            label: "CPF",
            name: "cpf",
            type: "number",
            placeholder: "",
            optional: false,
          },
        ],
        imageUrl: "https://cdn.pluggy.ai/assets/connector-icons/201.svg",
        hasMFA: false,
        oauth: true,
        health: {
          status: "ONLINE",
          stage: null,
        },
        products: [
          "ACCOUNTS",
          "TRANSACTIONS",
          "IDENTITY",
          "CREDIT_CARDS",
          "PAYMENT_DATA",
          "LOANS",
          "INVESTMENTS",
        ],
        createdAt: new Date("2023-09-01T18:05:09.145Z"),
        isSandbox: false,
        isOpenFinance: true,

        supportsPaymentInitiation: true,
        supportsScheduledPayments: true,
        supportsSmartTransfers: true,
      },
    }),
  ).toMatchSnapshot();
});

test("Transform account balance", () => {
  expect(
    transformAccountBalance({
      balance: 2000,
      currencyCode: "BRL",
    }),
  ).toMatchSnapshot();
});

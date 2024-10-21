export type AccountType =
  | "depository"
  | "credit"
  | "other_asset"
  | "loan"
  | "other_liability";

export function getType(type: string): AccountType {
  switch (type) {
    case "depository":
    case "bank": // pluggy
      return "depository";
    case "credit":
      return "credit";
    default:
      return "other_asset";
  }
}

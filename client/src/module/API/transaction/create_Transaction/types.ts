
export interface Transaction_model {
  type_trns: "deduction" | "addition";
  value_trns: number;
  name_event: string;
  create_time: string;
}

export interface Transaction_model {
  id?: string;
  type_trns: "deduction" | "addition";
  value_trns: number;
  name_event: string;
  create_time: string;
}
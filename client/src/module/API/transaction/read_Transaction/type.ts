export interface Transaction_model {
    create_time: string;
    type_trns: "deduction" | "addition";
    value_trns: string
}
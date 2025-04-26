import { Transaction_model } from "./module/API";

export interface MainContextType {
    mainData: Array<Transaction_model> | undefined;
    setMainData: React.Dispatch<React.SetStateAction<Array<Transaction_model>>>;
}

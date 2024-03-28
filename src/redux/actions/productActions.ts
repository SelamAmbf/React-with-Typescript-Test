import { ActionType } from "../constant/action-types";
interface  addProducts {
        type :ActionType.ADD,
        payload: any
}
interface  updateProducts {
        type :ActionType.UPDATE,
        payload: any
}
export type Action = addProducts | updateProducts ;
import { ActionType } from "../constant/action-types";
// interface  addProducts {
//         type :ActionType.ADD,
//         payload: insertDatabase,
// }
// interface  updateProducts {
//         type :ActionType.UPDATE,
//         payload: any
// }
// export type Action = addProducts | updateProducts ;


export const insertDatabase =(insertDatabase: any) => ({
        type :ActionType.ADD,
        payload: insertDatabase,
})
import axios from "axios"
import { STORE_STATE } from "../actions/actionStore"
import { appUrl } from "../../AppURL";
export const storeApi = (url: string = appUrl + "/") => {
    return{
   create: ( newStore: STORE_STATE) =>
   axios.post(url + "/", newStore)
};
console.log("sucessfully");
}
import axios from "axios"
import { STORE_STATE } from "../actions/actionStore"
import { appUrl } from "../../AppURL";

// let baseURL = "http://localhost:8000/"

// export default axios.create({
//     baseURL
// });
export const storeApi = (url: string = appUrl + "Stores") => {
    return{
   create: ( newStore: STORE_STATE) =>
   axios.post(url, newStore)
};
console.log("sucessfully");
}
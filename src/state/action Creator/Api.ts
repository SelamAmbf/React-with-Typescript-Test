import axios from "axios"
import { STORE_STATE } from "../actions/actionStore"
import { appUrl } from "../../AppURL";
export const storeApi = (url: string = appUrl + "/") => {
    return{
   create: ( newStore: STORE_STATE) =>
    axios.post(url + "/store", newStore),

   fetchAll: (request: any) =>
    axios.get(url + "/store"),

   fetchById: (id: number) =>
    axios.get(url + id),

    update: (id: number, updatedRecord: STORE_STATE) =>
      axios.put(url + "/" + id, updatedRecord),
    delete: (id: number) =>
      axios.delete(url + "/" + id),
};


};

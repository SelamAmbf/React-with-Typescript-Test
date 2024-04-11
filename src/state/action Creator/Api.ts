import axios from "axios"
import { STORE_STATE} from "../actions/actionStore"
import { PRODUCT_STATE } from "../actions/actionProduct";
import { appUrl } from "../../AppURL";
import { collectionQueryBuilder } from "../../shared/collection-query/collection-query-builder";
export const storeApi = (url: string = appUrl + "store") => {
    return{
   create: ( newStore: STORE_STATE) =>
    axios.post(url , newStore),

   fetchAll: (request: any) =>
    axios.get(url, {
      params: collectionQueryBuilder(request),
    }),

   fetchById: (id: number) =>
    axios.get(url + "/" + id),
    
    update: (id: number, updatedRecord: STORE_STATE) =>
      axios.put(url + "/" + id, updatedRecord),
    delete: (id: number) =>
      axios.delete(url + "/" + id),
};
};
export const productApi = (url: string = appUrl + "product") => {
  return{
 create: ( newStore: PRODUCT_STATE) =>
  axios.post(url , newStore),

 fetchAll: (request: any) =>
  axios.get(url, {
    params: collectionQueryBuilder(request),
  }),

 fetchById: (id: number) =>
  axios.get(url + "/" + id),
  
  update: (id: number, updatedRecord: PRODUCT_STATE) =>
    axios.put(url + "/" + id, updatedRecord),
  delete: (id: number) =>
    axios.delete(url + "/" + id),
};
};

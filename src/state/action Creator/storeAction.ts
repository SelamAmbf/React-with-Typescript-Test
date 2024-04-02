import Api from "./Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { stores } from "../actions/productActions";
const BASE_URL = 'http://localhost:8000'; // Assuming your JSON server is running on port 8000
// export const addStore = createAsyncThunk("addEmployee", async (stores: stores) => {
//     try {
//         const response = await Api.post("store", stores)
//         return response.data
//     } catch (error) { 
//         console.log(error)
//     }
// })
export const getStore = () => Api.get(`/stores`);
export const addStore = (store: any) => Api.post(`/stores`, store);
export const updateStore = (store: { id: any; }) => Api.put(`${BASE_URL}/stores/${store.id}`, store);
export const deleteStore = (id: any) => Api.delete(`${BASE_URL}/stores/${id}`);
export const searchStore = (storeId: any) => Api.get(`${BASE_URL}/products?storeId=${storeId}`);

export const addProduct = (product: any) => Api.post(`${BASE_URL}/products`, product);
export const searchProducts = (storeId: any) => Api.get(`${BASE_URL}/products?storeId=${storeId}`);
export const getProducts= () => Api.get(`${BASE_URL}/products`);
export const updateProducts = (product: { id: any; }) => Api.put(`${BASE_URL}/products/${product.id}`, product);
export const deleteProducts = (id: any) => Api.delete(`${BASE_URL}/products/${id}`); 
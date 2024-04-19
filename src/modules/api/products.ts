import { axios } from "@/modules/api/axios";
import { API_ROUTE } from "@/modules/consts";

export const getAllProducts = async (page?: number, filter?: string) => {
  try {
    let res = null;
    const skip = page && page !== 1 ?  page * 10 : 0
    if (filter) {
      res = await axios.get(`${API_ROUTE.CATEGORY}/${filter}?limit=10&skip=${skip}`);
    } else {
      res = await axios.get(`${API_ROUTE.PRODUCTS}?limit=10&skip=${skip}`);
    }
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getProductsCategories = async () => {
  try {
    const res = await axios.get(`${API_ROUTE.CATEGORIES}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const searchProducts = async (query:string) => {
  try {
    const res = await axios.get(`${API_ROUTE.SEARCH}?q=${query}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

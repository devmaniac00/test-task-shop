import baseAxios from "axios";

export const axios = baseAxios.create({
  baseURL: "https://dummyjson.com/",
});

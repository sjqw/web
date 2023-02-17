import { defineStore } from "pinia";
import { Names } from "./storeName";

export const useRsultStore = defineStore(Names.Result, {
  state: () => ({
    paginations: <API.Paginations>{
      total: 100,
      pageSize: 10,
      pageNo: 1,
    },
    allData: <API.PageData>{
      List: [1, 1],
      TotalCount: 0,
      PageSize: 10,
      CurrPage: 1,
    },
  }),
  actions: {},
  getters: {},
});

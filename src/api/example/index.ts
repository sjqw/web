import myAxios from "../axios";
// import type { QueryApiParams, QueryGroupParams } from "@/views/result/type";
const nameSpace = "result";
const queryApi = (params: any) => {
  return myAxios(
    {
      method: "get",
      url: "/api/rules/search",
      params,
    },
    {
      loading: true,
    },
    { text: "努力加载中..." }
  );
};

const groupApi = (params: any) => {
  return myAxios(
    {
      method: "get",
      url: "/api/rules/group",
      params,
    },
    {
      loading: true,
    },
    { text: "努力加载中..." }
  );
};
export default { [nameSpace]: { queryApi, groupApi } };

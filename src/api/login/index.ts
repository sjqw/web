import myAxios from "../axios";
import type { Form } from "@/components/core/login.vue";
// import type { ParamsType } from "@/components/core/changePwd.vue";
const nameSpace = "login";
const defaultUrl = "/iwaf-manage/ui-api";
const getCodeApi = (params: any) => {
  return myAxios({
    method: "post",
    url: defaultUrl ? defaultUrl : "",
    data: params,
  });
};

const loginApi = (data: Form) => {
  return myAxios(
    {
      method: "post",
      url: defaultUrl ? defaultUrl : "",
      data,
    },
    {
      loading: true,
    },
    { text: "登录中..." }
  );
};
const editPwdApi = (data: any) => {
  return myAxios(
    {
      method: "post",
      url: defaultUrl ? defaultUrl : "",
      data,
    },
    {
      loading: true,
    },
    { text: "修改中..." }
  );
};
const logoutApi = (data: { action: string }) => {
  return myAxios(
    {
      method: "post",
      url: defaultUrl ? defaultUrl : "",
      data,
    },
    {
      loading: true,
    },
    { text: "退出登录中..." }
  );
};
export default { [nameSpace]: { getCodeApi, loginApi, editPwdApi, logoutApi } };

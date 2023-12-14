import Layout from "@/layout/index.vue";
import type { Menu, RouteType } from "./type";
const modules = import.meta.glob("../views/**/*.vue");
const router: RouteType[] = [];
export const menuDatas: Array<Menu> = [
  /* {
    path: "home",
    isRoute: true,
    name: "home",
    meta: {
      icon: "home.svg",
      menuName: "概览",
      transition: "animate__fadeIn",
      breadArr: [{ path: "/home", breadcrumbName: "概览" }],
    },
  }, */
  {
    path: "config",
    isRoute: false,
    name: "config",
    redirect: "/config/certificate",
    meta: {
      icon: "icon-jichupeizhi",
      menuName: "基础配置",
      transition: "animate__fadeIn",
    },
    children: [
      {
        path: "config/certificate",
        name: "certificate",
        isRoute: true,
        meta: {
          icon: "icon-_zhengshu",
          menuName: "证书管理",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "基础配置" },
            { path: "/config/certificate", breadcrumbName: "证书管理" },
          ],
        },
      },
      {
        path: "config/application",
        isRoute: true,
        name: "application",
        meta: {
          icon: "icon-yingyongguanli",
          menuName: "应用管理",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "基础配置" },
            { path: "/config/application", breadcrumbName: "应用管理" },
          ],
        },
      },
    ],
  },
  {
    path: "defense",
    isRoute: false,
    name: "defense",
    meta: {
      icon: "icon-dunpai",
      menuName: "防御规则",
      transition: "animate__fadeIn",
    },
    children: [
      {
        path: "defense/wafManage",
        isRoute: true,
        name: "wafManage",
        meta: {
          icon: "icon-yunWAF",
          menuName: "WAF规则",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "防御规则" },
            { path: "/defense/wafManage", breadcrumbName: "WAF规则" },
          ],
        },
      },
      {
        path: "defense/ccDefense",
        isRoute: true,
        name: "ccDefense",
        meta: {
          icon: "icon-dunpai_shield",
          menuName: "防御配置",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "防御规则" },
            { path: "/defense/ccDefense", breadcrumbName: "防御配置" },
          ],
        },
      },
      {
        path: "defense/IpPolicy",
        isRoute: true,
        name: "IpPolicy",
        meta: {
          icon: "icon-heibaimingdanguanli",
          menuName: "黑白名单",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "防御规则" },
            { path: "/defense/IpPolicy", breadcrumbName: "黑白名单" },
          ],
        },
      },
    ],
  },
  {
    path: "securityAudit",
    isRoute: false,
    name: "securityAudit",
    meta: {
      icon: "icon-shenjirizhi",
      menuName: "日志审计",
      transition: "animate__fadeIn",
    },
    children: [
      {
        path: "securityAudit/wafLog",
        isRoute: true,
        isMenu: true,
        name: "wafLog",
        meta: {
          icon: "icon-rizhi",
          menuName: "攻击日志",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "日志审计" },
            { path: "/securityAudit/wafLog", breadcrumbName: "攻击日志" },
          ],
        },
        /*  children: [
          {
            path: "securityAudit/wafLog/detail",
            isRoute: true,
            name: "wafLogDetail",
            meta: {
              icon: "",
              menuName: "",
              transition: "animate__fadeIn",
              breadArr: [
                { path: "", breadcrumbName: "日志审计" },
                { path: "/securityAudit/wafLog", breadcrumbName: "攻击日志" },
                {
                  path: "/securityAudit/wafLog/detail",
                  breadcrumbName: "攻击日志详情",
                },
              ],
            },
          },
        ], */
      },
      {
        path: "securityAudit/ccLog",
        isRoute: true,
        name: "ccLog",
        meta: {
          icon: "icon-rizhi",
          menuName: "封禁日志",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "安全审计" },
            { path: "/securityAudit/ccLog", breadcrumbName: "封禁日志" },
          ],
        },
      },
      {
        path: "securityAudit/mountLog",
        isRoute: true,
        name: "mountLog",
        meta: {
          icon: "icon-rizhi",
          menuName: "挂马日志",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "安全审计" },
            { path: "/securityAudit/mountLog", breadcrumbName: "挂马日志" },
          ],
        },
      },
    ],
  },
  {
    path: "system",
    isRoute: false,
    name: "system",
    meta: {
      icon: "icon-xitongshezhi",
      menuName: "系统设置",
      transition: "animate__fadeIn",
    },
    children: [
      {
        path: "system/user",
        isRoute: true,
        name: "user",
        meta: {
          icon: "icon-yonghuguanli",
          menuName: "用户管理",
          transition: "animate__fadeIn",
          breadArr: [
            { path: "", breadcrumbName: "系统设置" },
            { path: "/system/user", breadcrumbName: "用户管理" },
          ],
        },
      },
    ],
  },
];
function menuToroute(menuDatas: Menu[]): void {
  for (const item of menuDatas) {
    if (item.isRoute) {
      delete item["isRoute"];
      item["component"] = modules[`../views/${item.path}/index.vue`]; //modules[`../views/${item.path}/index.vue`] //
      router.push(item);
      if (item.children && item.children.length) {
        menuToroute(item.children);
      }
    } else {
      if (item.children && item.children.length) {
        menuToroute(item.children);
      }
    }
  }
}

menuToroute(menuDatas);
export const routes: any[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/config/certificate",
    children: [...router],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/core/login.vue"),
  },
  /* {
    path: "/changePwd/:id",
    name: "changePwd",
    component: () => import("@/components/core/changePwd.vue"),
  }, */
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("@/components/core/notFound.vue"),
  },
];

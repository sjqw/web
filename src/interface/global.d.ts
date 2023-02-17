declare namespace API {
  type Res = {
    code: number;
    data: any;
    msg: string;
  };
  interface PageData {
    TotalCount: number;
    PageSize: number;
    TotalPage?: number;
    CurrPage: number;
    List?: any[];
  }
  type Paginations = { total: number; pageSize: number; pageNo: number };
}

type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P];
};
type NewPop = PartialOptional<API.PageData, "List" | "CurrPage">;

type Ed = Readonly<API.Res>;

type Pk = Pick<API.PageData, "TotalCount" | "PageSize">;

type EG1 = Record<keyof API.Res, number>;

type Ec = Exclude<"a" | "b" | "c", "c" | "b">;

type Eg = Extract<API.Res, Pk>;

type OM = Omit<API.PageData, keyof Pk>;

type ETG = Parameters<(arg1: string, arg2: number) => void>;

type Eg1 = Uppercase<"abcd">;

type Eg2 = Lowercase<"ABCD">;

type Eg3 = Capitalize<"abcd">;

type Eg4 = Uncapitalize<"ABCD">;

declare module "*.js";

interface BreadArrType {
  path: string;
  breadcrumbName: string;
}
interface MenuMeta {
  icon: string;
  menuName: string;
  transition?: string;
  breadArr?: BreadArrType[];
}
type RouteCop = {
  component?: () => Promise<any>;
};
export interface Menu {
  path: string;
  name?: string;
  isRoute?: boolean;
  isMenu?: boolean;
  meta: MenuMeta;
  redirect?: string;
  children?: Array<Menu>;
}

export type RouteType = Omit<Menu, "isRoute"> & RouteCop;

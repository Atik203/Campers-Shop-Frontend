import { ReactNode } from "react";

export interface TRouteItem {
  path: string;
  element: ReactNode;
}

export interface TUserPath {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
}

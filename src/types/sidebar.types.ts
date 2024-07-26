import { ReactNode } from "react";

export interface TSidebarItem {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
  icon?: ReactNode;
}

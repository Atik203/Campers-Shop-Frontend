import { adminPaths } from "@/routes/admin.routes";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Layout, Menu, MenuProps } from "antd";
import { useState } from "react";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const Sidebar = () => {
  // @ts-expect-error - SidebarItems type is not defined
  const sidebarItems = sidebarItemsGenerator(adminPaths, "dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={50}
      theme="light"
      className="sider-style"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
    >
      <div
        className="flex items-center justify-center ml-2 my-4"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ArrowRightStartOnRectangleIcon className="w-8 h-8" title="Open" />
        ) : (
          <ArrowLeftEndOnRectangleIcon className="w-8 h-8" title="Close" />
        )}
      </div>

      <Menu
        theme="light"
        mode="inline"
        className="sider-menu-style"
        defaultSelectedKeys={["1"]}
        items={sidebarItems as MenuProps["items"]}
      />
    </Sider>
  );
};

export default Sidebar;

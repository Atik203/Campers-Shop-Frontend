export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "COMPONENT_NAME",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: "COMPONENT_NAME",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "COMPONENT_NAME",
      },
    ],
  },
];

import { Home } from "@/pages/home";

interface iRoute {
  name: string;
  path: string;
  element: React.ReactNode;
}
export const routes: iRoute[] = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
];

export default routes;

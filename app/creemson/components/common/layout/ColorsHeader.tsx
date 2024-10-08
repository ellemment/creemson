import { Link , useLocation } from "@remix-run/react";
import { Header, type HeaderProps } from "./Header";

export const ColorsHeader = (props: HeaderProps) => {
  const location = useLocation();

  return (
    <Header gitHubLink="https://github.com/radix-ui/colors" {...props}>
      <Link
        to="/colors/docs"
        className={`text-gray-500 text-sm ${
          location.pathname.includes("/colors/docs") ? "text-gray-900" : ""
        }`}
      >
        Documentation
      </Link>
      <Link
        to="/colors/custom"
        className={`text-gray-500 text-sm ${
          location.pathname.includes("/colors/custom") ? "text-gray-900" : ""
        }`}
      >
        Custom palette
      </Link>
    </Header>
  );
};
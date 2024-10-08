import { Link , useLocation } from "@remix-run/react";
import { Header, type HeaderProps } from '#app/creemson/components/common/layout/Header.tsx';

export const ColorsHeader = (props: HeaderProps) => {
	const location = useLocation();
  
	return (
	  <Header gitHubLink="https://github.com/radix-ui/colors" {...props}>
		<Link
		  to="/colors/docs"
		  className={`text-gray-600 text-sm ${
			location.pathname.includes("/colors/docs") ? "font-bold" : ""
		  }`}
		>
		  Documentation
		</Link>
		<Link
		  to="/colors/custom"
		  className={`text-gray-600 text-sm ${
			location.pathname.includes("/colors/custom") ? "font-bold" : ""
		  }`}
		>
		  Custom palette
		</Link>
	  </Header>
	);
  };
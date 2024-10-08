import { Link } from "@radix-ui/themes";
import { useLocation, Link as RemixLink } from "@remix-run/react";
import React from "react";
import { Header, type HeaderProps } from '#app/creemson/components/common/layout/Header';

export const PrimitivesHeader = (props: HeaderProps) => {
	const location = useLocation();

	return (
		<Header gitHubLink="https://github.com/radix-ui/primitives" {...props}>
			<Link
				size="2"
				color="gray"
				asChild
				highContrast={location.pathname.includes("/primitives/docs")}
			>
				<RemixLink to="/primitives/docs">Documentation</RemixLink>
			</Link>
			<Link
				size="2"
				color="gray"
				asChild
				highContrast={location.pathname.includes("/primitives/case-studies")}
			>
				<RemixLink to="/primitives/case-studies">Case studies</RemixLink>
			</Link>
		</Header>
	);
};
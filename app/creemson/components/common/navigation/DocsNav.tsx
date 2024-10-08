import { Text, Heading, Box, Badge, Flex } from "@radix-ui/themes";
import { Link, useLocation } from "@remix-run/react";
import React from "react";
import scrollIntoView from "scroll-into-view-if-needed";
import { useCurrentPageSlug } from '#app/creemson/hooks/useCurrentPageSlug';
import { classNames } from '#app/creemson/utils/classNames';
import styles from "~/styles/modules/DocsNav.module.css";

interface DocsNavProps {
	routes: {
		label?: string;
		pages: {
			title: string;
			slug: string;
			icon?: React.ReactNode;
			preview?: boolean;
			deprecated?: boolean;
		}[];
	}[];
}

export const DocsNav = ({ routes }: DocsNavProps) => {
	const currentPageSlug = useCurrentPageSlug();

	return (
		<Box>
			{routes.map((section, i) => (
				<Box key={section.label ?? i} mb="4">
					{section.label && (
						<Box py="2" px="3">
							<Heading as="h4" size={{ initial: "3", md: "2" }}>
								{section.label}
							</Heading>
						</Box>
					)}

					{section.pages.map((page) => (
						<DocsNavItem
							key={page.slug}
							to={`/${page.slug}`}
							active={currentPageSlug === page.slug}
						>
							<Flex gap="2" align="center">
								{page.icon}
								<Text size={{ initial: "3", md: "2" }}>{page.title}</Text>
							</Flex>

							{page.preview && (
								<Badge ml="2" color="gray" radius="full" variant="surface">
									Preview
								</Badge>
							)}

							{page.deprecated && (
								<Badge ml="2" color="gray" radius="full" variant="surface">
									Deprecated
								</Badge>
							)}
						</DocsNavItem>
					))}
				</Box>
			))}
		</Box>
	);
};

interface DocsNavItemProps {
	children: React.ReactNode;
	active?: boolean;
	disabled?: boolean;
	to: string;
	className?: string;
}

const DocsNavItem = ({
	active,
	disabled,
	to,
	children,
	...props
}: DocsNavItemProps) => {
	const className = classNames(styles.DocsNavItem, active && styles.active);
	const isExternal = to.startsWith("http");
	const ref = React.useRef<HTMLAnchorElement>(null);

	React.useEffect(() => {
		// Scroll active links into view when in a Scroll Area
		if (ref.current && active) {
			const container = document.querySelector(
				"[data-radix-scroll-area-viewport]"
			);

			if (!container) {
				return;
			}

			scrollIntoView(ref.current, {
				block: "nearest",
				scrollMode: "if-needed",
				boundary: (parent) => Boolean(container.contains(parent)),
				behavior: (actions) => {
					actions.forEach(({ el, top }) => {
						const dir = el.scrollTop < top ? 1 : -1;
						el.scrollTop = top + 80 * dir;
					});
				},
			});
		}
	}, [active]);

	if (disabled) {
		return <span ref={ref} className={className} {...props}>{children}</span>;
	}

	if (isExternal) {
		return (
			<a
				ref={ref}
				className={className}
				href={to}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				{children}
			</a>
		);
	}

	return (
		<Link ref={ref} to={to} className={className} {...props}>
			{children}
		</Link>
	);
};
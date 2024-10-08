import { GitHubLogoIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  AccessibleIcon,
  Flex,
  IconButton,
  Link,
  Theme,
  Tooltip,
} from "@radix-ui/themes";
import { Link as RemixLink, useLocation } from "@remix-run/react";
import * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { useMobileMenuContext } from '#app/creemson/components/common/layout/MobileMenu.tsx';
import { RadixLogo, RadixLogoIcon } from '#app/creemson/components/common/misc/RadixLogo.tsx';
import { BoxLink } from '#app/creemson/components/common/ui/BoxLink.tsx';
import { ThemeToggle } from '#app/creemson/components/themes/ThemeToggle.tsx';
import styles from '#app/creemson/styles/modules/Header.module.css';
import { classNames } from '#app/creemson/utils/classNames.ts';

export interface HeaderProps {
	children?: React.ReactNode;
	gitHubLink?: string;
	ghost?: boolean;
  }
  
  type ScrollState = "at-top" | "scrolling-up" | "scrolling-down";
  
  export const Header = ({ children, gitHubLink, ghost }: HeaderProps) => {
	const mobileMenu = useMobileMenuContext();
	const location = useLocation();
  
	const [scrollState, setScrollState] = React.useState<ScrollState>("at-top");
  
	React.useEffect(() => {
	  let previousScrollY = window.scrollY;
  
	  const handleScroll = () => {
		const direction =
		  previousScrollY < window.scrollY ? "scrolling-down" : "scrolling-up";
		const state = window.scrollY < 30 ? "at-top" : direction;
		previousScrollY = window.scrollY;
		setScrollState(state);
	  };
  
	  if (ghost) {
		addEventListener("scroll", handleScroll, { passive: true });
	  } else {
		removeEventListener("scroll", handleScroll);
	  }
  
	  handleScroll();
	  return () => removeEventListener("scroll", handleScroll);
	}, [ghost]);
  
	return (
	  <Theme asChild className="radix-themes-custom-fonts">
		<div
		  data-scroll-state={scrollState}
		  data-mobile-menu-open={mobileMenu.open}
		  className={classNames(styles.HeaderRoot, ghost ? styles.ghost : "")}
		>
		  <div className={styles.HeaderInner}>
			<div
			  className={RemoveScroll.classNames.fullWidth}
			  style={{
				position: "absolute",
				height: "inherit",
				top: 0,
				left: 0,
				right: 0,
			  }}
			>
			  <Flex
				display={{ sm: "none" }}
				align="center"
				position="absolute"
				top="0"
				bottom="0"
				left="0"
				pl="4"
			  >
				{mobileMenu.open ? (
				  <RemixLink to="/">
					<BoxLink>
					  <AccessibleIcon label="Radix Homepage">
						<RadixLogoIcon />
					  </AccessibleIcon>
					</BoxLink>
				  </RemixLink>
				) : (
				  <RadixByWorkOSLogoLink />
				)}
			  </Flex>
  
			  <Flex
				display={{ initial: "none", sm: "flex" }}
				align="center"
				position="absolute"
				top="0"
				bottom="0"
				left="0"
				pl="4"
			  >
				<RadixByWorkOSLogoLink />
			  </Flex>
  
			  <div className={styles.HeaderProductLinksContainer}>
				<HeaderProductLink
				  to="/"
				  active={
					location.pathname === "/" ||
					location.pathname.startsWith("/themes")
				  }
				>
				  Themes
				</HeaderProductLink>
				<HeaderProductLink
				  to="/primitives"
				  active={location.pathname.startsWith("/primitives")}
				>
				  Primitives
				</HeaderProductLink>
				<HeaderProductLink
				  to="/icons"
				  active={location.pathname.startsWith("/icons")}
				>
				  Icons
				</HeaderProductLink>
				<HeaderProductLink
				  to="/colors"
				  active={location.pathname.startsWith("/colors")}
				>
				  Colors
				</HeaderProductLink>
			  </div>
  
			  <Flex
				display={{ initial: "none", md: "flex" }}
				align="center"
				gap="5"
				position="absolute"
				top="0"
				bottom="0"
				right="0"
				pr="4"
			  >
				{children}
  
				<Link
				  size="2"
				  color="gray"
				  href="/blog"
				  highContrast={location.pathname.includes("/blog")}
				>
				  Blog
				</Link>
  
				{gitHubLink && (
				  <Tooltip
					className="radix-themes-custom-fonts"
					content="View GitHub"
				  >
					<IconButton asChild size="3" variant="ghost" color="gray">
					  <a
						href={gitHubLink}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="View GitHub"
					  >
						<GitHubLogoIcon width="16" height="16" />
					  </a>
					</IconButton>
				  </Tooltip>
				)}
  
				<ThemeToggle />
			  </Flex>
  
			  <Flex
				display={{ md: "none" }}
				align="center"
				gap="4"
				position="absolute"
				top="0"
				bottom="0"
				right="0"
				pr="4"
			  >
				<div className={styles.HeaderThemeToggleContainer}>
				  <ThemeToggle />
				</div>
  
				<Tooltip
				  className="radix-themes-custom-fonts"
				  content="Navigation"
				>
				  <IconButton
					size="3"
					variant="ghost"
					color="gray"
					data-state={mobileMenu.open ? "open" : "closed"}
					onClick={() => mobileMenu.setOpen((open) => !open)}
					className={styles.MobileMenuButton}
				  >
					<HamburgerMenuIcon width="16" height="16" />
				  </IconButton>
				</Tooltip>
			  </Flex>
			</div>
		  </div>
		</div>
	  </Theme>
	);
  };
  
  const HeaderProductLink = ({
	active,
	children,
	to = "",
	...props
  }: React.ComponentPropsWithoutRef<typeof RemixLink> & { active?: boolean }) => (
	<RemixLink
	  to={to}
	  data-state={active ? "active" : "inactive"}
	  className={styles.HeaderProductLink}
	  {...props}
	>
	  <span className={styles.HeaderProductLinkInner}>{children}</span>
	  <span className={styles.HeaderProductLinkInnerHidden}>{children}</span>
	</RemixLink>
  );
  
  const RadixByWorkOSLogoLink = () => (
	<Flex align="center" gap="3">
	  <RemixLink to="/">
		<BoxLink>
		  <AccessibleIcon label="Radix Homepage">
			<RadixLogo />
		  </AccessibleIcon>
		</BoxLink>
	  </RemixLink>
  
	  <div
		style={{
		  background: "currentcolor",
		  opacity: 0.15,
		  width: 1,
		  height: 24,
		}}
	  />
  
	  <BoxLink href="https://workos.com" target="_blank" rel="noopener noreferrer">
		<AccessibleIcon label="Made by WorkOS">
		  <svg
			width="85"
			height="24"
			viewBox="0 0 85 24"
			fill="currentcolor"
			xmlns="http://www.w3.org/2000/svg"
		  >
			{/* SVG path data remains the same */}
		  </svg>
		</AccessibleIcon>
	  </BoxLink>
	</Flex>
  );
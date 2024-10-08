import { Box, Flex } from "@radix-ui/themes";
import * as React from "react";
import { MobileMenuProvider } from '#app/creemson/components/common/layout/MobileMenu.tsx';
import { SideNav } from '#app/creemson/components/common/layout/SideNav.tsx';
import { DocsNav } from '#app/creemson/components/common/navigation/DocsNav.tsx';
import { DocsPageWrapper } from '#app/creemson/components/docs/DocsPageWrapper.tsx';
import { DocsPagination } from '#app/creemson/components/docs/DocsPagination.tsx';
import { ThemesHeader } from '#app/creemson/components/themes/ThemesHeader.tsx';
import { allThemesRoutes, themesRoutes } from '#app/creemson/utils/routes/themesRoutes.ts';
import { EditPageLink } from "../common/misc/EditPageLink";
import { ThemesMobileMenu } from "./ThemesMobileMenu";

export function ThemesDocsPage({ children }: { children: React.ReactNode }) {
	return (
		<MobileMenuProvider>
			<ThemesHeader />
			<ThemesMobileMenu />

			<Flex>
				<SideNav>
					<Box pt="4" px="3" pb="9">
						<DocsNav routes={themesRoutes} />
					</Box>
				</SideNav>

				<DocsPageWrapper>
					<Box data-algolia-page-scope>{children}</Box>
					<DocsPagination allRoutes={allThemesRoutes} />
					<EditPageLink />
				</DocsPageWrapper>
			</Flex>
		</MobileMenuProvider>
	);
}

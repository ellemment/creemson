import { Box, Flex } from "@radix-ui/themes";
import * as React from "react";
import { ColorsHeader } from '#app/creemson/components/common/layout/ColorsHeader.tsx';
import { MobileMenuProvider } from '#app/creemson/components/common/layout/MobileMenu';
import { SideNav } from '#app/creemson/components/common/layout/SideNav.tsx';
import { EditPageLink } from "#app/creemson/components/common/misc/EditPageLink";
import { ColorsMobileMenu } from "#app/creemson/components/common/navigation/ColorsMobileMenu";
import { DocsNav } from '#app/creemson/components/common/navigation/DocsNav.tsx';
import { DocsPageWrapper } from '#app/creemson/components/docs/DocsPageWrapper.tsx';
import { DocsPagination } from '#app/creemson/components/docs/DocsPagination.tsx';
import { allColorsRoutes, colorsRoutes } from '#app/creemson/utils/routes/colorsRoutes.ts';

export function ColorsDocsPage({ children }: { children: React.ReactNode }) {
	return (
		<MobileMenuProvider>
			<ColorsHeader />
			<ColorsMobileMenu />

			<Flex>
				<SideNav>
					<Box pt="4" px="3" pb="9">
						<DocsNav routes={colorsRoutes} />
					</Box>
				</SideNav>

				<DocsPageWrapper>
					<Box data-algolia-page-scope>{children}</Box>
					<DocsPagination allRoutes={allColorsRoutes} />
					<EditPageLink />
				</DocsPageWrapper>
			</Flex>
		</MobileMenuProvider>
	);
}

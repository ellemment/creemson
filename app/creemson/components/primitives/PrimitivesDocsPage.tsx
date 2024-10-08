import { Box, Flex, ScrollArea } from "@radix-ui/themes";
import { MobileMenuProvider } from '#app/creemson/components/common/layout/MobileMenu.tsx';
import { SideNav } from '#app/creemson/components/common/layout/SideNav.tsx';
import { DocsNav } from '#app/creemson/components/common/navigation/DocsNav.tsx';
import { DocsPageWrapper } from '#app/creemson/components/docs/DocsPageWrapper.tsx';
import { DocsPagination } from '#app/creemson/components/docs/DocsPagination.tsx';
import { PrimitivesHeader } from '#app/creemson/components/primitives/PrimitivesHeader.tsx';
import { PrimitivesSearchDesktop } from '#app/creemson/components/primitives/PrimitivesSearchDesktop.tsx';
import { allPrimitivesRoutes, primitivesRoutes } from '#app/creemson/utils/routes/primitivesRoutes.ts';
import { EditPageLink } from "../common/misc/EditPageLink";
import { PrimitivesMobileMenu } from "./PrimitivesMobileMenu";

export function PrimitivesDocsPage({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<MobileMenuProvider>
			<PrimitivesHeader />
			<PrimitivesMobileMenu />

			<Flex>
				<SideNav>
					<Box pt="4" px="3" pb="9">
						<Box mb="4">
							<PrimitivesSearchDesktop />
						</Box>

						<DocsNav routes={primitivesRoutes} />
					</Box>
				</SideNav>

				<DocsPageWrapper>
					<Box data-algolia-page-scope>{children}</Box>
					<DocsPagination allRoutes={allPrimitivesRoutes} />
					<EditPageLink />
				</DocsPageWrapper>
			</Flex>
		</MobileMenuProvider>
	);
}

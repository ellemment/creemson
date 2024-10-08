import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Box, ScrollArea } from "@radix-ui/themes";
import * as React from "react";
import { MobileMenu } from '#app/creemson/components/common/layout/MobileMenu.tsx';
import { DocsNav } from '#app/creemson/components/common/navigation/DocsNav.tsx';
import { PrimitivesHeader } from '#app/creemson/components/primitives/PrimitivesHeader';
import { PrimitivesSearchMobile } from '#app/creemson/components/primitives/PrimitivesSearchMobile.tsx';
import { primitivesRoutes } from '#app/creemson/utils/routes/primitivesRoutes.ts';

export const PrimitivesMobileMenu = () => {
	const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);

	return (
		<MobileMenu>
			<PrimitivesHeader />
			<ScrollArea scrollbars="vertical">
				<Box pt="4" px="3" pb="9" style={{ maxWidth: "100vw" }}>
					<Box mb="4">
						<PrimitivesSearchMobile
							onSearchShow={() => setMobileSearchOpen(true)}
							onSearchHide={() => setMobileSearchOpen(false)}
						/>
					</Box>

					{!mobileSearchOpen && (
						<DocsNav
							routes={[
								{
									pages: [
										{
											title: "Homepage",
											slug: "primitives",
										},
										{
											title: "Case studies",
											slug: "primitives/case-studies",
										},
										{
											title: "Blog",
											slug: "blog",
										},
									],
								},
								...primitivesRoutes,
								{
									label: "Resources",
									pages: [
										{
											title: "GitHub",
											slug: "https://github.com/radix-ui/primitives",
											icon: <GitHubLogoIcon />,
										},
									],
								},
							]}
						/>
					)}
				</Box>
			</ScrollArea>
		</MobileMenu>
	);
};

"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Box, ScrollArea } from "@radix-ui/themes";
import { MobileMenu } from '#app/creemson/components/common/layout/MobileMenu.tsx';
import { DocsNav } from '#app/creemson/components/common/navigation/DocsNav.tsx';
import { ThemesHeader } from '#app/creemson/components/themes/ThemesHeader.tsx';
import { themesRoutes } from '#app/creemson/utils/routes/themesRoutes.ts';

export const ThemesMobileMenu = () => (
	<MobileMenu>
		<ThemesHeader />
		<ScrollArea>
			<Box pt="4" px="3" pb="9">
				<DocsNav
					routes={[
						{
							pages: [
								{
									title: "Homepage",
									slug: "",
								},
								{
									title: "Playground",
									slug: "themes/playground",
								},
								{
									title: "Blog",
									slug: "blog",
								},
							],
						},
						...themesRoutes,
						{
							label: "Resources",
							pages: [
								{
									title: "GitHub",
									slug: "https://github.com/radix-ui/themes",
									icon: <GitHubLogoIcon />,
								},
							],
						},
					]}
				/>
			</Box>
		</ScrollArea>
	</MobileMenu>
);

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Box, ScrollArea } from "@radix-ui/themes";
import { ColorsHeader } from "#app/creemson/components/common/layout/ColorsHeader";
import { MobileMenu } from "#app/creemson/components/common/layout/MobileMenu";
import { DocsNav } from "#app/creemson/components/common/navigation/DocsNav";
import { colorsRoutes } from "#app/creemson/utils/routes/colorsRoutes.ts";

export const ColorsMobileMenu = () => (
	<MobileMenu>
		<ColorsHeader />
		<ScrollArea>
			<Box pt="4" px="3" pb="9">
				<DocsNav
					routes={[
						{
							pages: [
								{
									title: "Homepage",
									slug: "colors",
								},
								{
									title: "Blog",
									slug: "blog",
								},
							],
						},
						...colorsRoutes,
						{
							label: "Resources",
							pages: [
								{
									title: "GitHub",
									slug: "https://github.com/radix-ui/colors",
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

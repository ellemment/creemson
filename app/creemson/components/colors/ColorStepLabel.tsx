import { Flex, Text } from "@radix-ui/themes";
import * as React from "react";

export const ColorStepLabel = ({
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof Flex>) => (
	<Flex justify="center" mb="3" {...props}>
		<Text size="1" color="gray">
			{children}
		</Text>
	</Flex>
);

import { Text } from "@radix-ui/themes";
import React from "react";
import styles from '#app/creemson/styles/modules/HeroQuote.module.css';

type TextProps = Omit<React.ComponentProps<typeof Text>, "as">;

export const HeroQuote = ({ children, ...props }: TextProps) => {
	return (
		<Text {...props} size="5" color="gray" asChild className={styles.HeroQuote}>
			<blockquote>{(children as any).props?.children ?? children}</blockquote>
		</Text>
	);
};

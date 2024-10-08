import { ExternalLinkIcon, Link2Icon } from "@radix-ui/react-icons";
import {
  Blockquote,
  Box,
  Flex,
  Code,
  Em,
  Heading,
  Kbd,
  Link,
  Separator,
  Strong,
  Tabs,
  Text,
} from "@radix-ui/themes";
import * as themesComponents from "@radix-ui/themes";
import { Link as RemixLink } from "@remix-run/react";
import React from "react";
import { DataAttributesTable } from "#app/creemson/components/common/layout/DataAttributesTable";
import { HeroCodeBlock } from "#app/creemson/components/common/layout/HeroCodeBlock";
import { PackageRelease, PRLink } from "#app/creemson/components/common/misc/releaseHelpers";
import { ColorScale, ColorScaleGroup } from "#app/creemson/components/common/misc/Scale";
import { CodeBlock } from '#app/creemson/components/common/ui/CodeBlock';
import { HeroContainer } from '#app/creemson/components/common/ui/HeroContainer';
import { HeroQuote } from '#app/creemson/components/common/ui/HeroQuote';
import { Highlights } from '#app/creemson/components/common/ui/Highlights';
import { KeyboardTable } from '#app/creemson/components/common/ui/KeyboardTable';
import { PropsTable } from '#app/creemson/components/common/ui/PropsTable';
import { CssVariablesTable } from '#app/creemson/components/themes/CssVariablesTable';
import styles from '#app/creemson/styles/modules/MDXComponents.module.css';
import { type Frontmatter } from "#app/creemson/types/frontmatter";
import { classNames } from '#app/creemson/utils/classNames';

export const components = {
  ...themesComponents,
  ColorScale,
  ColorScaleGroup,
  Tabs,
  HeroCodeBlock,
  h1: (props: any) => (
    <Heading asChild size="8" mb="2">
      <h1 {...props} style={{ scrollMarginTop: "var(--space-9)" }} />
    </Heading>
  ),
  Description: ({ children, ...props }: any) => {
    const childText =
      typeof children === "string" ? children : children.props.children;
    return (
      <Text
        as="p"
        size="4"
        mt="2"
        mb="7"
        color="gray"
        children={childText}
        {...props}
      />
    );
  },
  h2: ({ children, id, ...props }: any) => (
    <Heading
      size="6"
      mt="8"
      mb="3"
      asChild
      {...props}
      id={id}
      style={{ scrollMarginTop: "var(--space-9)" }}
      data-heading
    >
      <h2>
        <LinkHeading id={id}>{children}</LinkHeading>
      </h2>
    </Heading>
  ),
  h3: ({ children, id, ...props }: any) => (
    <Heading
      size="4"
      mt="7"
      mb="2"
      asChild
      {...props}
      id={id}
      style={{ scrollMarginTop: "var(--space-9)" }}
      data-heading
    >
      <h3>
        <LinkHeading id={id}>{children}</LinkHeading>
      </h3>
    </Heading>
  ),
  h4: ({ children, ...props }: any) => (
    <Heading asChild size="4" mt="6" mb="3" {...props}>
      <h4 children={children} style={{ scrollMarginTop: "var(--space-9)" }} />
    </Heading>
  ),
  p: (props: any) => <Text mb="4" as="p" size="3" {...props} />,
  a: ({ href = "", children, ...props }: any) => {
    if (href.startsWith("http")) {
      return (
        <Flex asChild display="inline-flex" align="center" gap="1">
          <Link {...props} href={href} target="_blank" rel="noopener">
            {children}
            <ExternalLinkIcon
              style={{ marginTop: 2, marginLeft: -1, marginRight: -1 }}
            />
          </Link>
        </Flex>
      );
    }
    return (
      <Link asChild {...props}>
        <RemixLink to={href}>{children}</RemixLink>
      </Link>
    );
  },
  hr: (props: any) => (
    <Separator size="2" {...props} my="8" style={{ marginInline: "auto" }} />
  ),
  ul: (props: any) => <ul {...props} className={styles.List} />,
  ol: ({ children, ...props }: any) => (
    <Box {...props} mb="3" pl="4" asChild>
      <ol>{children}</ol>
    </Box>
  ),
  li: (props: any) => (
    <li className={styles.ListItem}>
      <Text {...props} />
    </li>
  ),
  em: Em,
  strong: Strong,
  img: ({ style, ...props }: any) => (
    <Box my="6">
      <img
        {...props}
        style={{ maxWidth: "100%", verticalAlign: "middle", ...style }}
      />
    </Box>
  ),
  blockquote: Blockquote,
  pre: ({ children }: any) => (
    <CodeBlock.Root my="5">
      {children.props.live && (
        <CodeBlock.LivePreview
          code={childrenText(children) ?? ""}
          scroll={children.props.scroll}
        />
      )}
      <CodeBlock.Content>
        <CodeBlock.Pre>{children}</CodeBlock.Pre>
        <CodeBlock.CopyButton />
      </CodeBlock.Content>
    </CodeBlock.Root>
  ),
  code: ({ className, line, live, style, ...props }: any) => {
    const isInlineCode = !className;
    return isInlineCode ? (
      <Code
        className={className}
        {...props}
        style={{ whiteSpace: "break-spaces" }}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
  CodeBlock,
  RemixLink,
  Note: ({ children, ...props }: any) => (
    <Box className={styles.Note} asChild my="2" {...props}>
      <aside children={children} />
    </Box>
  ),
  Highlights,
  Kbd: Kbd,
  Code,
  CssVariablesTable: (props: any) => (
    <Box mt="2">
      <CssVariablesTable {...props} />
    </Box>
  ),
  DataAttributesTable: (props: any) => <DataAttributesTable {...props} />,
  PropsTable: (props: any) => (
    <Box my="4">
      <PropsTable {...props} />
    </Box>
  ),
  KeyboardTable: (props: any) => (
    <Box mb="5">
      <KeyboardTable {...props} />
    </Box>
  ),
  PackageRelease,
  PRLink,
  HeroContainer,
  HeroQuote,
};

const LinkHeading = ({
  id,
  children,
  className,
  ...props
}: {
  id: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof Link>) => (
  <Link
    asChild
    weight="bold"
    highContrast
    color="gray"
    underline="hover"
    {...props}
  >
    <a
      id={id}
      href={`#${id}`}
      className={classNames(className, styles.LinkHeading)}
    >
      {children}
      <Link2Icon aria-hidden />
    </a>
  </Link>
);

export const FrontmatterContext = React.createContext<Frontmatter>({} as any);

export function MDXProvider(props: {
  frontmatter: Frontmatter;
  children: React.ReactNode;
}) {
  const { frontmatter, children } = props;
  return (
    <FrontmatterContext.Provider value={frontmatter}>
      {children}
    </FrontmatterContext.Provider>
  );
}

export const childrenText = (children?: React.ReactNode): string => {
	if (isReactElement(children)) {
	  return childrenText(children.props?.children);
	}
  
	if (Array.isArray(children)) {
	  return children.map((child) => {
		if (React.isValidElement(child) || typeof child === 'string') {
		  return childrenText(child);
		}
		return '';
	  }).join("");
	}
  
	if (typeof children === "string") {
	  return children;
	}
  
	return "";
  };
  
  const isReactElement = (
	element: unknown
  ): element is React.ReactElement =>
	React.isValidElement(element) && Boolean((element as React.ReactElement).props.children);